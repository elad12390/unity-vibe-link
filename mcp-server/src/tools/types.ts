/**
 * Common types for VibeLink MCP Tools
 */

import { VibeLinkClient } from "../vibelink-client.js";

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ToolHandler {
  execute(client: VibeLinkClient, args: any): Promise<ToolResponse>;
}

export interface ToolResponse {
  content: Array<{
    type: "text" | "image";
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}

export interface UnityTool {
  definition: ToolDefinition;
  handler: ToolHandler;
}
