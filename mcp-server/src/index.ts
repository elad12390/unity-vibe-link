#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { VibeLinkClient } from "./vibelink-client.js";
import { ALL_TOOLS, getToolByName } from "./tools/index.js";

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
    // List available tools - dynamically from modular tool definitions
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: ALL_TOOLS.map((tool) => tool.definition),
    }));

    // Handle tool calls - delegate to modular tool handlers
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Ensure connected to Unity
        if (!this.vibeLinkClient.isConnected()) {
          await this.vibeLinkClient.connect();
        }

        // Find and execute the appropriate tool
        const tool = getToolByName(name);
        if (!tool) {
          throw new Error(`Unknown tool: ${name}`);
        }

        return await tool.handler.execute(this.vibeLinkClient, args);
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
