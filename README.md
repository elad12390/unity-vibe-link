# VibeLink - Unity Agentic Bridge

**Enable AI agents to see, manipulate, and verify Unity projects autonomously.**

VibeLink is a hybrid Unity Package + MCP Server that gives CLI-based AI agents (Claude Code, Cursor, etc.) direct access to Unity's Editor through the Model Context Protocol.

> **Status**: ✅ **Working!** See [CURRENT_STATUS.md](./CURRENT_STATUS.md) for latest test results and known issues.
> 
> **Quick Test**: After Unity restart, run `./test-after-restart.sh` to verify all features work.

## 🎯 Core Capabilities ("The Superpowers")

### 🔴 Power 1: The Eyes (Visual Verification)
- Capture Game View or Scene View screenshots
- See what the agent creates in real-time
- Visual feedback loop for iterative development

### 🔵 Power 2: The Hands (Direct Manipulation)
- Execute C# code directly in Unity Editor
- No need to create files for quick operations
- Instant iteration and testing

### 🟢 Power 3: The Brain (State Querying)
- Query GameObject state using CSS-like selectors
- Get actual runtime values, not just code
- Verify scene configuration programmatically

### 🟡 Power 4: The Time Machine (Test Running)
- Enter Play Mode for specified duration
- Capture all logs and errors automatically
- Automated regression testing

## 🚀 Quick Start

### Prerequisites
- Unity 2021.3 or later (.NET Standard 2.1 support)
- Node.js 18+ (for MCP server)
- AI agent that supports MCP (Claude Code, Cursor, etc.)

### Installation

#### 1. Install Unity Package

Copy the `unity-package` folder into your Unity project's `Packages` directory:

```bash
cd YourUnityProject/Packages
git clone https://github.com/vibelink/unity-vibe-link.git com.vibelink.unity
```

Or add via Package Manager:
1. Open Unity
2. Window → Package Manager
3. + → Add package from disk
4. Select `unity-package/package.json`

#### 2. Install MCP Server

```bash
cd mcp-server
npm install
npm run build
```

#### 3. Configure Your AI Agent

Add to your MCP config (e.g., `~/.config/opencode/mcp.json` or Claude Desktop config):

```json
{
  "mcpServers": {
    "vibelink-unity": {
      "command": "node",
      "args": ["/path/to/unity-vibe-link/mcp-server/build/index.js"]
    }
  }
}
```

#### 4. Start Unity with VibeLink

1. Open your Unity project
2. Go to `Tools → VibeLink → Start Host`
3. The VibeLink window will show "Connected: Yes" when your agent connects

## 📖 Usage Examples

### Example 1: Visual Verification

**User:** "The button looks off-center"

**Agent:**
```
1. unity_capture_view(viewType: "game")
2. [Analyzes screenshot]
3. unity_query_state(selector: "Button")
4. unity_execute_script(code: "GameObject.Find('Button').GetComponent<RectTransform>().anchoredPosition = Vector2.zero;")
5. unity_capture_view(viewType: "game")
6. [Verifies fix]
```

### Example 2: Procedural Generation

**User:** "Create 50 cubes in a spiral pattern"

**Agent:**
```typescript
unity_execute_script({
  code: `
    for (int i = 0; i < 50; i++) {
      float angle = i * 0.5f;
      float radius = i * 0.2f;
      Vector3 pos = new Vector3(
        Mathf.Cos(angle) * radius,
        i * 0.1f,
        Mathf.Sin(angle) * radius
      );
      GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
      cube.transform.position = pos;
    }
  `
})
```

### Example 3: Automated Testing

**User:** "Does the game crash when I start?"

**Agent:**
```typescript
unity_run_playmode({ duration: 5.0 })
// Returns all logs/errors from 5-second playtest
```

## 🛠️ Available Tools

| Tool | Description | Use Case |
|------|-------------|----------|
| `unity_capture_view` | Screenshot Game/Scene view | Visual verification |
| `unity_execute_script` | Run C# code in Editor | Quick iterations |
| `unity_query_state` | Query GameObject state | State inspection |
| `unity_run_playmode` | Run game with logging | Automated testing |
| `unity_ping` | Check connection | Health check |

## 🔒 Safety Features

### Sandboxing
- All agent-created assets go to `Assets/_AgentScratchpad/`
- Prevents corruption of core project files

### Watchdog (Coming Soon)
- Script execution timeout
- Infinite loop protection
- Resource usage monitoring

## 🏗️ Architecture

```
┌─────────────────┐         Named Pipe          ┌──────────────────┐
│  Unity Editor   │◄───────────────────────────►│   MCP Server     │
│  (C# Package)   │      <5ms latency           │   (Node.js)      │
└─────────────────┘                              └──────────────────┘
        ▲                                                 ▲
        │                                                 │
        │ EditorWindow                           MCP Protocol
        │ Direct API Access                      (JSON-RPC)
        │                                                 │
        ▼                                                 ▼
┌─────────────────┐                              ┌──────────────────┐
│  Unity Scene    │                              │   AI Agent       │
│  GameObjects    │                              │ (Claude/Cursor)  │
└─────────────────┘                              └──────────────────┘
```

## 📝 Development Status

- [x] Core transport layer (Named Pipes)
- [x] Visual capture (Game/Scene views)
- [x] Script execution framework
- [x] State querying with selectors
- [x] Play Mode automation
- [x] MCP server implementation
- [ ] Dynamic C# compilation (Roslyn)
- [ ] Advanced selector syntax
- [ ] Watchdog protection
- [ ] Performance profiling tools
- [ ] Asset modification tracking

## 🤝 Contributing

This is an open-source project! Contributions welcome.

### Development Setup

1. Clone repository
2. Open Unity package in Unity 2021.3+
3. Run `npm install` in `mcp-server/`
4. Make changes and test with your AI agent

## 📄 License

MIT License - See LICENSE file for details

## 🔗 Links

- [Model Context Protocol Spec](https://modelcontextprotocol.io/)
- [Unity Named Pipes Reference](https://github.com/Lachee/unity-named-pipes)
- [Documentation](./docs/)

## ⚠️ Disclaimer

VibeLink is in **alpha**. Use in production projects at your own risk. Always backup your project before enabling agent automation.

---

**Built for the future of AI-assisted game development** 🎮🤖
