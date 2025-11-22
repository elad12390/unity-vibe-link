/**
 * Power 3: The Brain - State Querying
 */

import { UnityTool, ToolDefinition, ToolHandler, ToolResponse } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";

const definition: ToolDefinition = {
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
};

const handler: ToolHandler = {
  async execute(client: VibeLinkClient, args: any): Promise<ToolResponse> {
    const result = await client.sendCommand("unity_query_state", args);
    
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
