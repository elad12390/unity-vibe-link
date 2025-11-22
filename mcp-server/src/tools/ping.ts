/**
 * Utility tool for connectivity testing
 */

import { UnityTool, ToolDefinition, ToolHandler } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const definition: ToolDefinition = {
  name: "unity_ping",
  description: "🔗 Check if Unity Editor is connected and responding. Use this if other Unity tools fail or to verify connection before starting work.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

const handler: ToolHandler = {
  async execute(client: VibeLinkClient, args: any): Promise<CallToolResult> {
    const result = await client.sendCommand("ping", {});
    
    return {
      content: [
        {
          type: "text",
          text: `Unity is ${result === "pong" ? "connected" : "not responding"}`,
        },
      ],
    };
  },
};

export const pingTool: UnityTool = {
  definition,
  handler,
};
