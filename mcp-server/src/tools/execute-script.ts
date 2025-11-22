/**
 * Power 2: The Hands - Direct Manipulation
 */

import { UnityTool, ToolDefinition, ToolHandler } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const definition: ToolDefinition = {
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
};

const handler: ToolHandler = {
  async execute(client: VibeLinkClient, args: any): Promise<CallToolResult> {
    const result = await client.sendCommand("unity_execute_script", args);
    
    return {
      content: [
        {
          type: "text",
          text: `Execution result:\n${result}`,
        },
      ],
    };
  },
};

export const executeScriptTool: UnityTool = {
  definition,
  handler,
};
