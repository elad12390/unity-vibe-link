#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { VibeLinkClient } from "./vibelink-client.js";

const VIBELINK_VERSION = "1.0.0-alpha";

class VibeLinkMCPServer {
  private server: Server;
  private vibeLinkClient: VibeLinkClient;

  constructor() {
    this.server = new Server(
      {
        name: "vibelink-unity",
        version: VIBELINK_VERSION,
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.vibeLinkClient = new VibeLinkClient();
    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[VibeLink MCP] Error:", error);
    };

    process.on("SIGINT", async () => {
      await this.vibeLinkClient.disconnect();
      process.exit(0);
    });
  }

  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "unity_capture_view",
          description:
            "Capture a screenshot of Unity's Game View or Scene View. Returns path to saved image.",
          inputSchema: {
            type: "object",
            properties: {
              viewType: {
                type: "string",
                enum: ["game", "scene"],
                description: "Which view to capture",
                default: "game",
              },
              resolution: {
                type: "string",
                enum: ["720p", "1080p"],
                description: "Screenshot resolution",
                default: "720p",
              },
            },
            required: ["viewType"],
          },
        },
        {
          name: "unity_execute_script",
          description:
            "Execute C# code directly in Unity Editor. Code runs in Editor context with full API access.",
          inputSchema: {
            type: "object",
            properties: {
              code: {
                type: "string",
                description: "C# code to execute",
              },
              timeout: {
                type: "number",
                description: "Execution timeout in seconds",
                default: 5.0,
              },
            },
            required: ["code"],
          },
        },
        {
          name: "unity_query_state",
          description:
            "Query the state of GameObjects in the Unity scene using a selector syntax.",
          inputSchema: {
            type: "object",
            properties: {
              selector: {
                type: "string",
                description:
                  "GameObject selector (e.g., 'Player', '*', 'Player > Graphic')",
              },
            },
            required: ["selector"],
          },
        },
        {
          name: "unity_run_playmode",
          description:
            "Enter Play Mode for a specified duration and capture all logs/errors.",
          inputSchema: {
            type: "object",
            properties: {
              duration: {
                type: "number",
                description: "How long to run in seconds",
                default: 5.0,
              },
            },
            required: ["duration"],
          },
        },
        {
          name: "unity_ping",
          description: "Check if Unity Editor is connected and responsive.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Ensure connected to Unity
        if (!this.vibeLinkClient.isConnected()) {
          await this.vibeLinkClient.connect();
        }

        let result: any;

        switch (name) {
          case "unity_capture_view":
            result = await this.vibeLinkClient.sendCommand(
              "unity_capture_view",
              args
            );
            return {
              content: [
                {
                  type: "text",
                  text: `Screenshot saved to: ${result}`,
                },
                {
                  type: "image",
                  data: await this.vibeLinkClient.readImageAsBase64(result),
                  mimeType: "image/png",
                },
              ],
            };

          case "unity_execute_script":
            result = await this.vibeLinkClient.sendCommand(
              "unity_execute_script",
              args
            );
            return {
              content: [
                {
                  type: "text",
                  text: `Execution result:\n${result}`,
                },
              ],
            };

          case "unity_query_state":
            result = await this.vibeLinkClient.sendCommand(
              "unity_query_state",
              args
            );
            return {
              content: [
                {
                  type: "text",
                  text: `Query result:\n${JSON.stringify(JSON.parse(result), null, 2)}`,
                },
              ],
            };

          case "unity_run_playmode":
            result = await this.vibeLinkClient.sendCommand(
              "unity_run_playmode",
              args
            );
            return {
              content: [
                {
                  type: "text",
                  text: `PlayMode logs:\n${result}`,
                },
              ],
            };

          case "unity_ping":
            result = await this.vibeLinkClient.sendCommand("ping", {});
            return {
              content: [
                {
                  type: "text",
                  text: `Unity is ${result === "pong" ? "connected" : "not responding"}`,
                },
              ],
            };

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("[VibeLink MCP] Server running on stdio");
  }
}

// Start the server
const server = new VibeLinkMCPServer();
server.run().catch((error) => {
  console.error("[VibeLink MCP] Fatal error:", error);
  process.exit(1);
});
