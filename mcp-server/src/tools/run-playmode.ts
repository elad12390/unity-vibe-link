/**
 * Power 4: The Time Machine - Test Running
 */

import { UnityTool, ToolDefinition, ToolHandler, ToolResponse } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";

const definition: ToolDefinition = {
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
};

const handler: ToolHandler = {
  async execute(client: VibeLinkClient, args: any): Promise<ToolResponse> {
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
