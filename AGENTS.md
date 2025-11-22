# Agent Development Guide

## Commands
- **Build**: `cd mcp-server && npm run build`
- **Test All**: `cd mcp-server && npm test`
- **Single Test**: `cd mcp-server && npx jest <test-name>` (e.g., `npx jest tools.test`)
- **Coverage**: `cd mcp-server && npm run test:coverage` (must maintain ≥90%)
- **Watch**: `cd mcp-server && npm run test:watch`
- **Lint**: TypeScript compilation serves as linting (`npm run build`)

## Code Philosophy
- **Simplicity over Cleverness**: Write code that's obvious, not clever. Prefer simple solutions over complex abstractions.
- **Complexity is the Enemy**: Each layer of abstraction/indirection adds cognitive load. "Simple" = one concept, "Easy" = familiar. Choose simple over easy. Complecting (intertwining) concerns makes code hard to change and understand.
- **Modular but Not Over-Engineered**: Break code into small, focused modules with single responsibilities. Avoid unnecessary generalization.
- **Code Should Read Like Prose**: Functions should be short, names should be clear, intent should be obvious without comments.

## Testing Principles
- **Never Exclude Code from Coverage**: If it's hard to test, refactor it - don't exclude it from coverage.
- **Test What Matters**: Write functional tests that verify behavior, not implementation details. Test happy paths AND error cases.
- **Unit Tests**: Fast, isolated, test single units. Mock external dependencies. Cover edge cases (null, empty, boundaries).
- **Integration Tests**: Test real interactions between components. Ensure the system works end-to-end.
- **Coverage ≥90%**: This is a floor, not a ceiling. High coverage doesn't guarantee quality - thoughtful tests do.

## Code Style

### TypeScript/JavaScript (mcp-server/)
- **Imports**: ES6 modules with `.js` extension: `import { foo } from "./bar.js"`
- **Types**: Use MCP SDK types (`CallToolResult`, `Tool`) from `@modelcontextprotocol/sdk/types.js`
- **Strict Mode**: All TypeScript strict checks enabled
- **Naming**: camelCase variables, PascalCase classes/interfaces, SCREAMING_SNAKE_CASE constants
- **Errors**: Always handle with try/catch, return structured errors via `CallToolResult.isError`

### C# (unity-package/)
- **Naming**: PascalCase public, camelCase private with `_` prefix: `private bool _isRunning;`
- **Docs**: XML comments for all public APIs
- **Errors**: Use try/catch, return `VibeLinkResponse` with success/error fields
- **Patterns**: Interface-based modular Powers (see `IVibeLinkPower.cs`)
