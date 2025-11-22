# Agent Development Guide

## Commands
- **Build**: `cd mcp-server && npm run build`
- **Test All**: `cd mcp-server && npm test`
- **Single Test**: `cd mcp-server && npx jest <test-name>` (e.g., `npx jest tools.test`)
- **Coverage**: `cd mcp-server && npm run test:coverage` (must maintain ≥90%)
- **Watch**: `cd mcp-server && npm run test:watch`
- **Lint**: TypeScript compilation serves as linting (`npm run build`)

## Code Style

### TypeScript/JavaScript (mcp-server/)
- **Imports**: ES6 modules with `.js` extension: `import { foo } from "./bar.js"`
- **Types**: Use MCP SDK types (`CallToolResult`, `Tool`) from `@modelcontextprotocol/sdk/types.js`
- **Strict Mode**: All TypeScript strict checks enabled
- **Naming**: camelCase variables, PascalCase classes/interfaces, SCREAMING_SNAKE_CASE constants
- **Errors**: Always handle with try/catch, return structured errors via `CallToolResult.isError`
- **Coverage**: Never exclude code from coverage - write tests instead

### C# (unity-package/)
- **Naming**: PascalCase public, camelCase private with `_` prefix: `private bool _isRunning;`
- **Docs**: XML comments for all public APIs
- **Errors**: Use try/catch, return `VibeLinkResponse` with success/error fields
- **Patterns**: Interface-based modular Powers (see `IVibeLinkPower.cs`)
