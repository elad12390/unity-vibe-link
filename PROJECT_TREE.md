# VibeLink Project Structure

Complete file tree showing all components of the VibeLink Unity Agentic Bridge.

```
unity-vibe-link/
│
├── 📄 Documentation & Guides
│   ├── README.md                   # Main project overview
│   ├── HANDOFF.md                  # Original specification document
│   ├── VIBELINK.md                 # AI agent instructions
│   ├── TESTING.md                  # Testing guide
│   ├── TEST_SUMMARY.md             # Test coverage summary
│   ├── TROUBLESHOOTING.md          # Common issues and fixes
│   ├── CONTRIBUTING.md             # Contribution guidelines
│   ├── PROJECT_STATUS.md           # Current project status
│   ├── PROJECT_TREE.md             # This file
│   └── LICENSE                     # MIT License
│
├── 🛠️ Setup & Automation
│   ├── install.sh                  # Installation script
│   ├── run-tests.sh                # Test runner script
│   └── .gitignore                  # Git ignore rules
│
├── 📦 MCP Server (Node.js/TypeScript)
│   └── mcp-server/
│       ├── package.json            # npm configuration
│       ├── tsconfig.json           # TypeScript config
│       ├── jest.config.js          # Jest test config
│       │
│       ├── src/                    # Source code
│       │   ├── index.ts            # MCP server main entry
│       │   ├── vibelink-client.ts  # Unity client (Named Pipes)
│       │   │
│       │   └── __tests__/          # Test suite
│       │       ├── vibelink-client.test.ts    # Unit tests (38 tests)
│       │       ├── integration.test.ts        # Integration tests (12 tests)
│       │       ├── edge-cases.test.ts         # Edge cases (15 tests)
│       │       └── test-utils.ts              # Test helpers
│       │
│       └── build/                  # Compiled JavaScript (generated)
│           ├── index.js
│           └── vibelink-client.js
│
├── 🎮 Unity Package (C#)
│   └── unity-package/
│       ├── package.json            # Unity package manifest
│       │
│       ├── Editor/                 # Editor-only scripts
│       │   ├── VibeLinkHost.cs            # Main EditorWindow host
│       │   ├── VibeLinkExecutor.cs        # Executes the "Four Powers"
│       │   ├── VibeLinkTransport.cs       # Named Pipes transport
│       │   └── VibeLinkMessage.cs         # Protocol messages
│       │
│       ├── Runtime/                # Runtime scripts (future use)
│       │
│       └── Tests/                  # Unity test suite
│           └── Editor/
│               ├── VibeLink.Tests.asmdef         # Test assembly definition
│               ├── VibeLinkMessageTests.cs       # Protocol tests (12 tests)
│               └── VibeLinkExecutorTests.cs      # Executor tests (8 tests)
│
├── 📚 Examples
│   └── examples/
│       ├── mcp-config-opencode.json       # OpenCode MCP config
│       ├── mcp-config-claude-desktop.json # Claude Desktop config
│       └── workflow-example.md            # Usage examples
│
└── 🔄 CI/CD
    └── .github/
        └── workflows/
            └── test.yml            # GitHub Actions workflow

```

## Component Breakdown

### Documentation (10 files)
- Comprehensive guides for users, developers, and contributors
- AI agent instructions for autonomous operation
- Troubleshooting and testing documentation

### Source Code (7 files)
**Node.js (3 files):**
- MCP server implementation
- Named Pipes client for Unity communication
- Protocol handlers

**Unity C# (4 files):**
- EditorWindow host and UI
- Four Powers executor
- Named Pipes transport layer
- Message protocol

### Tests (6 files)
**Node.js (4 files):**
- 65 total tests
- Unit, integration, and edge case coverage
- Test utilities and mocks

**Unity C# (2 files):**
- 20+ total tests
- NUnit framework
- Protocol and executor tests

### Configuration (6 files)
- Package manifests (npm + Unity)
- TypeScript config
- Jest config
- GitHub Actions workflow

### Scripts (2 files)
- Automated installation
- Test runner

## Stats Summary

| Category | Files | Lines of Code |
|----------|-------|---------------|
| Source Code | 7 | ~2,700 |
| Tests | 6 | ~2,500 |
| Documentation | 10 | ~3,000 |
| Config | 6 | ~200 |
| **Total** | **29** | **~8,400** |

## Key Directories

### `/mcp-server/src/`
The Node.js MCP server that bridges AI agents to Unity.

**Key files:**
- `index.ts` - MCP protocol implementation
- `vibelink-client.ts` - Unity communication via Named Pipes

### `/unity-package/Editor/`
Unity Editor integration package.

**Key files:**
- `VibeLinkHost.cs` - Main EditorWindow and lifecycle
- `VibeLinkExecutor.cs` - Implements the Four Powers
- `VibeLinkTransport.cs` - Low-latency Named Pipe communication

### `/unity-package/Tests/`
Unity test suite using NUnit framework.

**Coverage:**
- Message serialization
- GameObject querying  
- Script execution
- Screenshot capture

### `/__tests__/`
Node.js test suite using Jest framework.

**Coverage:**
- Connection management
- Message exchange
- Error handling
- Edge cases

## File Naming Conventions

### TypeScript
- `kebab-case.ts` for source files
- `kebab-case.test.ts` for test files

### C#
- `PascalCase.cs` for all files
- `PascalCaseTests.cs` for test files

### Documentation
- `UPPERCASE.md` for major docs
- `lowercase-with-dashes.md` for examples

## Generated Files (Not in Repo)

```
mcp-server/
├── node_modules/          # npm dependencies
├── build/                 # Compiled TypeScript
└── coverage/              # Test coverage reports

unity-package/
└── Assets/_AgentScratchpad/  # Agent workspace
```

## Quick Navigation

**Want to...**
- Understand the project? → `README.md`
- Set it up? → `install.sh`
- Test it? → `run-tests.sh`
- Contribute? → `CONTRIBUTING.md`
- Debug issues? → `TROUBLESHOOTING.md`
- Write tests? → `TESTING.md`
- Configure MCP? → `examples/`

**Developing...**
- MCP server? → `mcp-server/src/`
- Unity package? → `unity-package/Editor/`
- Tests? → `__tests__/` or `Tests/`

---

**Total Project Size:** ~8,400 lines of code + documentation  
**Test Coverage:** 90%+  
**Documentation:** Comprehensive  
**Status:** ✅ Alpha Release Ready
