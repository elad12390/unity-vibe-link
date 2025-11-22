# Documentation Index

Quick reference to all VibeLink documentation.

## 🚀 Getting Started
- **[README.md](./README.md)** - Project overview and quick start
- **[CURRENT_STATUS.md](./CURRENT_STATUS.md)** - Latest status, test results, and known issues

## 📖 Development Guides
- **[AGENTS.md](./AGENTS.md)** - Development guidelines and code philosophy
- **[TESTING.md](./TESTING.md)** - Testing strategy and test suite
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions

## 📋 Reference
- **[VIBELINK.md](./VIBELINK.md)** - Detailed protocol documentation
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

## 🔧 Project Management  
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Feature completion tracking
- **[PROJECT_TREE.md](./PROJECT_TREE.md)** - Project structure overview
- **[PUBLISHING.md](./PUBLISHING.md)** - Package publishing guide
- **[TEST_SUMMARY.md](./TEST_SUMMARY.md)** - Test coverage summary

## 🧪 Testing
- **[test-after-restart.sh](./test-after-restart.sh)** - Integration test script
- **[mcp-server/src/__tests__/](./mcp-server/src/__tests__)** - Jest test suite

## 📦 Package Structure
```
unity-vibe-link/
├── mcp-server/          # Node.js MCP server
│   ├── src/             # TypeScript source
│   └── __tests__/       # Integration tests
└── unity-package/       # Unity package source
    └── Editor/          # Unity Editor scripts
        └── Powers/      # Modular command handlers
```

## 🎯 Quick Links
- Test after Unity restart: `./test-after-restart.sh`
- Run integration tests: `cd mcp-server && UNITY_RUNNING=true npm run test:unity`
- Check current status: See [CURRENT_STATUS.md](./CURRENT_STATUS.md)
