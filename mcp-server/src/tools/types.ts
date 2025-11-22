/**
 * Common types for VibeLink MCP Tools
 */

import { VibeLinkClient } from "../vibelink-client.js";
import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";

export type ToolDefinition = Tool;

export interface ToolHandler {
  execute(client: VibeLinkClient, args: any): Promise<CallToolResult>;
}

export interface UnityTool {
  definition: ToolDefinition;
  handler: ToolHandler;
}
