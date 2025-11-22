import net from "net";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

interface VibeLinkMessage {
  id: string;
  type: string;
  command: string;
  payload: string;
  timestamp: number;
}

interface VibeLinkResponse {
  id: string;
  type: string;
  success: boolean;
  result?: string;
  error?: string;
  timestamp: number;
}

export class VibeLinkClient {
  private static readonly PIPE_NAME = "vibelink_unity_pipe";
  private static readonly CONNECTION_TIMEOUT = 10000; // 10 seconds
  private static readonly RESPONSE_TIMEOUT = 30000; // 30 seconds

  private socket: net.Socket | null = null;
  private connected: boolean = false;
  private pendingResponses: Map<string, {
    resolve: (value: any) => void;
    reject: (error: Error) => void;
    timeout: NodeJS.Timeout;
  }> = new Map();

  private buffer: string = "";

  constructor() {}

  public isConnected(): boolean {
    return this.connected;
  }

  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    return new Promise((resolve, reject) => {
      const pipePath = this.getPipePath();
      
      console.error(`[VibeLink Client] Connecting to Unity at: ${pipePath}`);

      this.socket = net.createConnection(pipePath);

      const timeout = setTimeout(() => {
        this.socket?.destroy();
        reject(new Error("Connection timeout - is Unity Editor running with VibeLink enabled?"));
      }, VibeLinkClient.CONNECTION_TIMEOUT);

      this.socket.on("connect", () => {
        clearTimeout(timeout);
        this.connected = true;
        console.error("[VibeLink Client] Connected to Unity!");
        resolve();
      });

      this.socket.on("data", (data) => {
        this.handleData(data);
      });

      this.socket.on("error", (error) => {
        clearTimeout(timeout);
        console.error("[VibeLink Client] Socket error:", error);
        this.connected = false;
        reject(error);
      });

      this.socket.on("close", () => {
        console.error("[VibeLink Client] Connection closed");
        this.connected = false;
        
        // Reject all pending responses
        for (const [id, pending] of this.pendingResponses.entries()) {
          clearTimeout(pending.timeout);
          pending.reject(new Error("Connection closed"));
        }
        this.pendingResponses.clear();
      });
    });
  }

  public async disconnect(): Promise<void> {
    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
      this.connected = false;
    }
  }

  public async sendCommand(command: string, payload: any): Promise<any> {
    if (!this.connected) {
      throw new Error("Not connected to Unity - call connect() first");
    }

    const message: VibeLinkMessage = {
      id: this.generateId(),
      type: "request",
      command,
      payload: JSON.stringify(payload),
      timestamp: Date.now(),
    };

    return new Promise((resolve, reject) => {
      // Set up response handler with timeout
      const timeout = setTimeout(() => {
        this.pendingResponses.delete(message.id);
        reject(new Error(`Command timeout: ${command}`));
      }, VibeLinkClient.RESPONSE_TIMEOUT);

      this.pendingResponses.set(message.id, { resolve, reject, timeout });

      // Send message
      const messageJson = JSON.stringify(message) + "\n";
      this.socket!.write(messageJson);
    });
  }

  public async readImageAsBase64(imagePath: string): Promise<string> {
    try {
      const data = await fs.readFile(imagePath);
      return data.toString("base64");
    } catch (error) {
      throw new Error(`Failed to read image: ${error}`);
    }
  }

  private handleData(data: Buffer): void {
    this.buffer += data.toString();

    // Process complete messages (newline-delimited)
    let newlineIndex: number;
    while ((newlineIndex = this.buffer.indexOf("\n")) !== -1) {
      const messageJson = this.buffer.substring(0, newlineIndex);
      this.buffer = this.buffer.substring(newlineIndex + 1);

      try {
        const response: VibeLinkResponse = JSON.parse(messageJson);
        this.handleResponse(response);
      } catch (error) {
        console.error("[VibeLink Client] Failed to parse response:", error);
      }
    }
  }

  private handleResponse(response: VibeLinkResponse): void {
    const pending = this.pendingResponses.get(response.id);
    if (!pending) {
      console.error(`[VibeLink Client] Received response for unknown request: ${response.id}`);
      return;
    }

    clearTimeout(pending.timeout);
    this.pendingResponses.delete(response.id);

    if (response.success) {
      pending.resolve(response.result);
    } else {
      pending.reject(new Error(response.error || "Unknown error"));
    }
  }

  private getPipePath(): string {
    if (process.platform === "win32") {
      return `\\\\.\\pipe\\${VibeLinkClient.PIPE_NAME}`;
    } else {
      // Unix domain socket - .NET Core creates pipes with CoreFxPipe_ prefix in tmpdir
      return path.join(os.tmpdir(), `CoreFxPipe_${VibeLinkClient.PIPE_NAME}`);
    }
  }

  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}
