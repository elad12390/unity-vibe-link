/**
 * Utility tool for connectivity testing
 */

import { UnityTool, ToolDefinition, ToolHandler, ToolResponse } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";

const definition: ToolDefinition = {
  name: "unity_ping",
  description: "Check if Unity Editor is connected and responsive.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

const handler: ToolHandler = {
  async execute(client: VibeLinkClient, args: any): Promise<ToolResponse> {
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
