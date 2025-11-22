/**
 * Power 2: The Hands - Direct Manipulation
 */

import { UnityTool, ToolDefinition, ToolHandler } from "./types.js";
import { VibeLinkClient } from "../vibelink-client.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const definition: ToolDefinition = {
  name: "unity_execute_script",
  description:
    "✋ CREATE and MODIFY things in Unity! Execute C# code directly in the Editor - no files needed. Use this to: create GameObjects (GameObject.CreatePrimitive), add components (AddComponent), modify properties (transform.position = ...), change materials, spawn enemies, adjust UI, etc. You have FULL access to UnityEngine and UnityEditor APIs. Example: To add an enemy, use GameObject.CreatePrimitive(PrimitiveType.Cube), name it 'Enemy', set position, add Rigidbody, etc.",
  inputSchema: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "C# code to execute. Use UnityEngine and UnityEditor APIs. Example: 'var enemy = GameObject.CreatePrimitive(PrimitiveType.Sphere); enemy.name = \"Enemy\"; enemy.transform.position = new Vector3(5, 1, 0);'",
      },
      timeout: {
        type: "number",
        description: "Execution timeout in seconds (default 5)",
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
