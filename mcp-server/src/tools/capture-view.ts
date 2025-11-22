/**
 * Power 1: The Eyes - Visual Verification
 */

import { UnityTool, ToolDefinition, ToolHandler } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const definition: ToolDefinition = {
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
};

const handler: ToolHandler = {
  async execute(client: VibeLinkClient, args: any): Promise<CallToolResult> {
    const result = await client.sendCommand("unity_capture_view", args);
    
    return {
      content: [
        {
          type: "text",
          text: `Screenshot saved to: ${result}`,
        },
        {
          type: "image",
          data: await client.readImageAsBase64(result),
          mimeType: "image/png",
        },
      ],
    };
  },
};

export const captureViewTool: UnityTool = {
  definition,
  handler,
};
