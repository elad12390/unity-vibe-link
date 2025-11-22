/**
 * Tests for modular tool handlers
 */

import { VibeLinkClient } from "../vibelink-client.js";
import { captureViewTool } from "../tools/capture-view.js";
import { executeScriptTool } from "../tools/execute-script.js";
import { queryStateTool } from "../tools/query-state.js";
import { runPlaymodeTool } from "../tools/run-playmode.js";
import { pingTool } from "../tools/ping.js";
import { ALL_TOOLS, getToolByName } from "../tools/index.js";

// Mock VibeLinkClient
jest.mock("../vibelink-client.js");

describe("Tool Definitions", () => {
  it("should have all 5 tools in ALL_TOOLS", () => {
    expect(ALL_TOOLS).toHaveLength(5);
  });

  it("should have correct tool names", () => {
    const names = ALL_TOOLS.map((t) => t.definition.name);
    expect(names).toContain("unity_capture_view");
    expect(names).toContain("unity_execute_script");
    expect(names).toContain("unity_query_state");
    expect(names).toContain("unity_run_playmode");
    expect(names).toContain("unity_ping");
  });

  it("should find tools by name", () => {
    expect(getToolByName("unity_capture_view")).toBe(captureViewTool);
    expect(getToolByName("unity_execute_script")).toBe(executeScriptTool);
    expect(getToolByName("unity_query_state")).toBe(queryStateTool);
    expect(getToolByName("unity_run_playmode")).toBe(runPlaymodeTool);
    expect(getToolByName("unity_ping")).toBe(pingTool);
  });

  it("should return undefined for unknown tool", () => {
    expect(getToolByName("unknown_tool")).toBeUndefined();
  });
});

describe("Capture View Tool", () => {
  let mockClient: jest.Mocked<VibeLinkClient>;

  beforeEach(() => {
    mockClient = {
      sendCommand: jest.fn(),
      readImageAsBase64: jest.fn(),
    } as any;
  });

  it("should have correct definition", () => {
    expect(captureViewTool.definition.name).toBe("unity_capture_view");
    expect(captureViewTool.definition.inputSchema.required).toContain("viewType");
  });

  it("should execute and return screenshot with image data", async () => {
    mockClient.sendCommand.mockResolvedValue("/path/to/screenshot.png");
    mockClient.readImageAsBase64.mockResolvedValue("base64data");

    const result = await captureViewTool.handler.execute(mockClient, {
      viewType: "game",
      resolution: "720p",
    });

    expect(mockClient.sendCommand).toHaveBeenCalledWith("unity_capture_view", {
      viewType: "game",
      resolution: "720p",
    });
    expect(mockClient.readImageAsBase64).toHaveBeenCalledWith("/path/to/screenshot.png");
    expect(result.content).toHaveLength(2);
    expect(result.content[0]).toMatchObject({
      type: "text",
      text: expect.stringContaining("/path/to/screenshot.png"),
    });
    expect(result.content[1]).toMatchObject({
      type: "image",
      data: "base64data",
      mimeType: "image/png",
    });
  });
});

describe("Execute Script Tool", () => {
  let mockClient: jest.Mocked<VibeLinkClient>;

  beforeEach(() => {
    mockClient = {
      sendCommand: jest.fn(),
    } as any;
  });

  it("should have correct definition", () => {
    expect(executeScriptTool.definition.name).toBe("unity_execute_script");
    expect(executeScriptTool.definition.inputSchema.required).toContain("code");
  });

  it("should execute and return script result", async () => {
    mockClient.sendCommand.mockResolvedValue("Script executed successfully");

    const result = await executeScriptTool.handler.execute(mockClient, {
      code: "Debug.Log('Hello');",
    });

    expect(mockClient.sendCommand).toHaveBeenCalledWith("unity_execute_script", {
      code: "Debug.Log('Hello');",
    });
    expect(result.content).toHaveLength(1);
    expect(result.content[0]).toMatchObject({
      type: "text",
      text: expect.stringContaining("Script executed successfully"),
    });
  });
});

describe("Query State Tool", () => {
  let mockClient: jest.Mocked<VibeLinkClient>;

  beforeEach(() => {
    mockClient = {
      sendCommand: jest.fn(),
    } as any;
  });

  it("should have correct definition", () => {
    expect(queryStateTool.definition.name).toBe("unity_query_state");
    expect(queryStateTool.definition.inputSchema.required).toContain("selector");
  });

  it("should execute and return formatted JSON result", async () => {
    const mockResult = JSON.stringify([{ name: "Player", active: true }]);
    mockClient.sendCommand.mockResolvedValue(mockResult);

    const result = await queryStateTool.handler.execute(mockClient, {
      selector: "Player",
    });

    expect(mockClient.sendCommand).toHaveBeenCalledWith("unity_query_state", {
      selector: "Player",
    });
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe("text");
    const textContent = result.content[0];
    if (textContent.type === "text") {
      expect(textContent.text).toContain("Player");
      expect(textContent.text).toContain("active");
    }
  });
});

describe("Run Playmode Tool", () => {
  let mockClient: jest.Mocked<VibeLinkClient>;

  beforeEach(() => {
    mockClient = {
      sendCommand: jest.fn(),
    } as any;
  });

  it("should have correct definition", () => {
    expect(runPlaymodeTool.definition.name).toBe("unity_run_playmode");
    expect(runPlaymodeTool.definition.inputSchema.required).toContain("duration");
  });

  it("should execute and return playmode logs", async () => {
    mockClient.sendCommand.mockResolvedValue("[Log] Game started\n[Log] Game ended");

    const result = await runPlaymodeTool.handler.execute(mockClient, {
      duration: 5.0,
    });

    expect(mockClient.sendCommand).toHaveBeenCalledWith("unity_run_playmode", {
      duration: 5.0,
    });
    expect(result.content).toHaveLength(1);
    expect(result.content[0]).toMatchObject({
      type: "text",
      text: expect.stringContaining("Game started"),
    });
  });
});

describe("Ping Tool", () => {
  let mockClient: jest.Mocked<VibeLinkClient>;

  beforeEach(() => {
    mockClient = {
      sendCommand: jest.fn(),
    } as any;
  });

  it("should have correct definition", () => {
    expect(pingTool.definition.name).toBe("unity_ping");
  });

  it("should return connected when Unity responds with pong", async () => {
    mockClient.sendCommand.mockResolvedValue("pong");

    const result = await pingTool.handler.execute(mockClient, {});

    expect(mockClient.sendCommand).toHaveBeenCalledWith("ping", {});
    expect(result.content).toHaveLength(1);
    expect(result.content[0]).toMatchObject({
      type: "text",
      text: "Unity is connected",
    });
  });

  it("should return not responding when Unity does not respond with pong", async () => {
    mockClient.sendCommand.mockResolvedValue("unexpected");

    const result = await pingTool.handler.execute(mockClient, {});

    const textContent = result.content[0];
    if (textContent.type === "text") {
      expect(textContent.text).toBe("Unity is not responding");
    }
  });
});
