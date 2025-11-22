# vibelink-mcp-server

MCP Server for VibeLink - Unity Agentic Bridge

Enable AI agents (Claude Code, OpenCode, Cursor, etc.) to interact with Unity Editor through the Model Context Protocol.

## Installation

```bash
npm install -g vibelink-mcp-server
```

## Usage

### As a Global Command

```bash
vibelink-mcp
```

### In MCP Configuration

Add to your MCP config file (e.g., `~/.config/opencode/mcp.json`):

```json
{
  "mcpServers": {
    "vibelink-unity": {
      "command": "npx",
      "args": ["vibelink-mcp-server"]
    }
  }
}
```

Or with global installation:

```json
{
  "mcpServers": {
    "vibelink-unity": {
      "command": "vibelink-mcp"
    }
  }
}
```

## Prerequisites

- Unity 2021.3+ with VibeLink package installed
- Node.js 18+
- Unity Editor running with VibeLink Host started

## Available Tools

The server exposes these tools to AI agents:

- `unity_capture_view` - Capture screenshots of Game/Scene view
- `unity_execute_script` - Execute C# code in Unity Editor
- `unity_query_state` - Query GameObject state
- `unity_run_playmode` - Run automated Play Mode tests
- `unity_ping` - Check Unity connection

## Unity Package Installation

Install the Unity package from the main repository:

```bash
git clone https://github.com/elad12390/unity-vibe-link.git
```

Copy `unity-package` to your Unity project's `Packages` directory, or use Unity Package Manager.

## Documentation

Full documentation available at: https://github.com/elad12390/unity-vibe-link

## License

MIT
