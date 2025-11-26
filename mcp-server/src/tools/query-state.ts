/**
 * Power 3: The Brain - State Querying
 */

import { UnityTool, ToolDefinition, ToolHandler } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const definition: ToolDefinition = {
  name: "unity_query_state",
  description:
    "🔍 CHECK what exists in the scene! Query GameObjects to see what's already there, their positions, components, active state, etc. Use this BEFORE making changes to understand the current scene. Returns JSON with name, position, rotation, scale, components, active state, tag, layer. Essential when user asks about existing objects or before modifying them.",
  inputSchema: {
    type: "object",
    properties: {
      selector: {
        type: "string",
        description:
          "GameObject selector: exact name like 'Player' or 'Enemy', '*' for all objects, 'Parent > Child' for hierarchy. Example: 'Player' finds the Player object, '*' lists everything.",
      },
    },
    required: ["selector"],
  },
};

const handler: ToolHandler = {
  async execute(client: VibeLinkClient, args: any): Promise<CallToolResult> {
    const result = await client.sendCommand("unity_query_state", args);
    
    // Debug: log raw result
    console.error(`[query-state] Raw result from Unity: ${result?.substring(0, 500)}`);
    
    return {
      content: [
        {
          type: "text",
          text: `Query result:\n${JSON.stringify(JSON.parse(result), null, 2)}`,
        },
      ],
    };
  },
};

export const queryStateTool: UnityTool = {
  definition,
  handler,
};
