# Contributing to VibeLink

Thank you for your interest in contributing to VibeLink! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, constructive, and professional. We're building tools to make game development better for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug is already reported in [Issues](https://github.com/vibelink/unity-vibe-link/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Unity version, Node.js version, OS
   - Error logs from both Unity console and terminal

### Suggesting Features

1. Check [Issues](https://github.com/vibelink/unity-vibe-link/issues) for existing suggestions
2. Create a new issue with:
   - Clear description of the feature
   - Use case / why it's needed
   - Proposed implementation (if you have ideas)

### Contributing Code

#### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/vibelink/unity-vibe-link.git
cd unity-vibe-link

# Install MCP server dependencies
cd mcp-server
npm install

# Build TypeScript
npm run build

# Run tests
npm test
```

#### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write code following existing patterns
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   # Run all tests
   ./run-tests.sh
   
   # Ensure coverage stays ≥90%
   cd mcp-server && npm run test:coverage
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation only
   - `test:` Adding tests
   - `refactor:` Code refactoring
   - `perf:` Performance improvement
   - `chore:` Maintenance tasks

6. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow existing code style
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Maximum line length: 100 characters

**Example:**
```typescript
/**
 * Sends a command to Unity Editor
 * @param command - The command name
 * @param payload - Command payload data
 * @returns Promise resolving to command result
 */
public async sendCommand(command: string, payload: any): Promise<any> {
  // Implementation
}
```

### C# (Unity)

- Follow Unity C# conventions
- Use PascalCase for public members
- Use camelCase for private members
- Prefix private fields with underscore: `_fieldName`
- Add XML documentation for public APIs

**Example:**
```csharp
/// <summary>
/// Executes a C# script in the Unity Editor
/// </summary>
/// <param name="message">The message containing script code</param>
/// <returns>Response indicating success or failure</returns>
public async Task<VibeLinkResponse> ExecuteScript(VibeLinkMessage message)
{
    // Implementation
}
```

## Testing Requirements

### All Changes Must Include Tests

- **New features:** Add unit tests + integration tests
- **Bug fixes:** Add regression test
- **Refactoring:** Ensure existing tests still pass

### Test Coverage

- Maintain ≥90% code coverage
- Test happy paths AND error cases
- Test edge cases (null, empty, boundary values)

### Running Tests

```bash
# All tests
./run-tests.sh

# Node.js only
cd mcp-server && npm test

# With coverage
npm run test:coverage

# Watch mode (for development)
npm run test:watch

# Unity tests - use Unity Test Runner UI
```

## Pull Request Process

### Before Submitting

- [ ] All tests pass
- [ ] Coverage ≥90%
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console warnings/errors
- [ ] Commit messages follow convention

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests pass locally
- [ ] Coverage ≥90%
```

### Review Process

1. Automated tests will run via GitHub Actions
2. Maintainers will review your code
3. Address feedback and update PR
4. Once approved, maintainers will merge

## Project Structure

```
unity-vibe-link/
├── mcp-server/              # Node.js MCP server
│   ├── src/
│   │   ├── __tests__/      # Tests
│   │   ├── index.ts        # Main server
│   │   └── vibelink-client.ts
│   └── package.json
│
├── unity-package/           # Unity package
│   ├── Editor/             # Editor scripts
│   │   ├── VibeLinkHost.cs
│   │   ├── VibeLinkExecutor.cs
│   │   └── VibeLinkTransport.cs
│   ├── Runtime/            # Runtime scripts
│   └── Tests/              # Unity tests
│
├── docs/                   # Documentation
├── examples/               # Example configs
└── README.md
```

## Areas for Contribution

### High Priority
- [ ] Full Roslyn dynamic compilation
- [ ] Advanced CSS-like selectors
- [ ] Watchdog timer for script execution
- [ ] Performance profiling tools
- [ ] Asset modification tracking

### Medium Priority
- [ ] Better error messages
- [ ] More example workflows
- [ ] Video tutorials
- [ ] Unity package manager support

### Good First Issues
- [ ] Improve documentation
- [ ] Add more tests
- [ ] Fix typos
- [ ] Add code comments

Look for issues tagged `good first issue` or `help wanted`.

## Getting Help

- **Questions:** Open a [Discussion](https://github.com/vibelink/unity-vibe-link/discussions)
- **Bugs:** Open an [Issue](https://github.com/vibelink/unity-vibe-link/issues)
- **Chat:** (Coming soon - Discord/Slack)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in documentation

Thank you for helping make VibeLink better! 🚀
