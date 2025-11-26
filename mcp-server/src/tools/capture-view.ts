/**
 * Power 1: The Eyes - Visual Verification
 */

import { UnityTool, ToolDefinition, ToolHandler } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const definition: ToolDefinition = {
  name: "unity_capture_view",
  description:
    "📸 SEE what's in Unity right now! Capture a screenshot of the Game View (what the player sees) or Scene View (editor view). Use this BEFORE making changes to see the current state, and AFTER to verify your changes worked. Essential for visual tasks like UI layout, object positioning, materials, lighting, etc.",
  inputSchema: {
    type: "object",
    properties: {
      viewType: {
        type: "string",
        enum: ["game", "scene"],
        description: "Which view to capture: 'game' = player's view (use for gameplay/UI), 'scene' = editor view (use for object placement)",
        default: "game",
      },
      resolution: {
        type: "string",
        enum: ["720p", "1080p"],
        description: "Screenshot resolution (720p is faster, 1080p for details)",
        default: "720p",
      },
    },
    required: ["viewType"],
  },
};

const handler: ToolHandler = {
  async execute(client: VibeLinkClient, args: any): Promise<CallToolResult> {
    const result = await client.sendCommand("unity_capture_view", args);
    
    // Debug: log the path we received
    console.error(`[capture-view] Unity returned path: ${result}`);
    
    try {
      const imageData = await client.readImageAsBase64(result);
      return {
        content: [
          {
            type: "text",
            text: `Screenshot saved to: ${result}`,
          },
          {
            type: "image",
            data: imageData,
            mimeType: "image/png",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: Unity returned path "${result}" but failed to read: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
};

export const captureViewTool: UnityTool = {
  definition,
  handler,
};
