/**
 * Test utilities and helpers for VibeLink tests
 */

import { EventEmitter } from 'events';
import net from 'net';

/**
 * Creates a mock socket for testing
 */
export function createMockSocket() {
  const mockSocket = Object.assign(new EventEmitter(), {
    write: jest.fn((data, callback?: Function) => {
      if (callback) callback();
      return true;
    }),
    destroy: jest.fn(),
    end: jest.fn(),
    setKeepAlive: jest.fn(),
    setTimeout: jest.fn(),
    ref: jest.fn(),
    unref: jest.fn(),
  });

  return mockSocket;
}

/**
 * Creates a mock Unity server for integration testing
 */
export class MockUnityServer {
  private server: net.Server;
  private socket: net.Socket | null = null;
  private handlers: Map<string, (payload: any) => any> = new Map();

  constructor(private pipePath: string) {
    this.server = net.createServer((socket) => {
      this.socket = socket;
      this.socket.on('data', this.handleData.bind(this));
    });
  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.pipePath, () => {
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.socket) {
        this.socket.destroy();
        this.socket = null;
      }
      this.server.close(() => {
        resolve();
      });
    });
  }

  /**
   * Register a command handler
   */
  onCommand(command: string, handler: (payload: any) => any) {
    this.handlers.set(command, handler);
  }

  /**
   * Send a response back to client
   */
  sendResponse(id: string, success: boolean, result?: any, error?: string) {
    if (!this.socket) return;

    const response = {
      id,
      type: 'response',
      success,
      result,
      error,
      timestamp: Date.now(),
    };

    this.socket.write(JSON.stringify(response) + '\n');
  }

  private handleData(data: Buffer) {
    const message = JSON.parse(data.toString().trim());
    const handler = this.handlers.get(message.command);

    if (handler) {
      try {
        const result = handler(JSON.parse(message.payload));
        this.sendResponse(message.id, true, result);
      } catch (error) {
        this.sendResponse(
          message.id,
          false,
          undefined,
          error instanceof Error ? error.message : 'Unknown error'
        );
      }
    } else {
      this.sendResponse(message.id, false, undefined, `Unknown command: ${message.command}`);
    }
  }
}

/**
 * Wait for a condition to be true
 */
export async function waitFor(
  condition: () => boolean,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();

  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

/**
 * Creates a temporary file path for testing
 */
export function getTempFilePath(filename: string): string {
  return `/tmp/vibelink_test_${filename}`;
}
