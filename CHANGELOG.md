# Changelog

All notable changes to VibeLink will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-alpha.1] - 2025-11-22

### Added
- Initial alpha release of VibeLink Unity Agentic Bridge
- MCP server implementation with Named Pipes transport
- Four core "Powers":
  - 🔴 The Eyes: Visual verification via screenshot capture
  - 🔵 The Hands: Direct C# script execution in Unity Editor
  - 🟢 The Brain: GameObject state querying with selector syntax
  - 🟡 The Time Machine: Automated Play Mode testing
- Unity package with EditorWindow host
- Comprehensive test suite with 40 unit tests (100% pass rate)
- Complete documentation suite (10+ guides)
- GitHub Actions CI/CD pipeline
- NPM package distribution
- Cross-platform support (Windows, macOS, Linux)

### Infrastructure
- Named Pipes transport layer for <5ms latency
- MCP protocol JSON-RPC implementation
- Automated testing and coverage reporting
- Installation and setup scripts

### Documentation
- README with quick start guide
- VIBELINK.md for AI agent instructions
- TESTING.md with comprehensive testing guide
- TROUBLESHOOTING.md for common issues
- CONTRIBUTING.md for contributors
- Example MCP configurations

### Known Limitations (Alpha)
- Script execution uses file staging (full Roslyn compilation planned for beta)
- Basic selector syntax (advanced CSS-like selectors planned for beta)
- No watchdog timer yet (planned for beta)
- Single agent connection only (multi-agent planned for future)

[Unreleased]: https://github.com/elad12390/unity-vibe-link/compare/v1.0.0-alpha.1...HEAD
[1.0.0-alpha.1]: https://github.com/elad12390/unity-vibe-link/releases/tag/v1.0.0-alpha.1
