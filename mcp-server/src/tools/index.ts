/**
 * All VibeLink Unity Tools
 */

import { UnityTool } from "./types.js";
import { captureViewTool } from "./capture-view.js";
import { executeScriptTool } from "./execute-script.js";
import { queryStateTool } from "./query-state.js";
import { runPlaymodeTool } from "./run-playmode.js";
import { pingTool } from "./ping.js";

export * from "./types.js";

export const ALL_TOOLS: UnityTool[] = [
  captureViewTool,
  executeScriptTool,
  queryStateTool,
  runPlaymodeTool,
  pingTool,
];

export function getToolByName(name: string): UnityTool | undefined {
  return ALL_TOOLS.find((tool) => tool.definition.name === name);
}
