/**
 * Power 4: The Time Machine - Test Running
 */

import { UnityTool, ToolDefinition, ToolHandler } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const definition: ToolDefinition = {
  name: "unity_run_playmode",
  description:
    "⏱️ TEST the game! Enter Play Mode to see if things work at runtime. Captures ALL logs and errors during playback. Use this to: test if game runs without errors, verify physics/collisions work, check if scripts execute correctly, test new enemies/gameplay. Returns all Debug.Log, warnings, and errors that occurred.",
  inputSchema: {
    type: "object",
    properties: {
      duration: {
        type: "number",
        description: "How long to run the game in seconds (3-10 seconds is usually enough for basic testing)",
        default: 5.0,
      },
    },
    required: ["duration"],
  },
};

const handler: ToolHandler = {
  async execute(client: VibeLinkClient, args: any): Promise<CallToolResult> {
    const result = await client.sendCommand("unity_run_playmode", args);
    
    return {
      content: [
        {
          type: "text",
          text: `PlayMode logs:\n${result}`,
        },
      ],
    };
  },
};

export const runPlaymodeTool: UnityTool = {
  definition,
  handler,
};
