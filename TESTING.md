# VibeLink Testing Guide

Comprehensive testing documentation for VibeLink contributors and developers.

## Test Coverage Goals

We aim for **90%+ code coverage** across all components:

- ✅ Node.js MCP Server: 90%+
- ✅ Unity C# Package: 90%+
- ✅ Integration Tests: All critical paths

## Running Tests

### Quick Start

```bash
# Run all automated tests
./run-tests.sh

# Run only Node.js tests
cd mcp-server
npm test

# Run with coverage
npm run test:coverage

# Watch mode (for development)
npm run test:watch
```

### Unity Tests

Unity tests must be run within the Unity Editor:

1. Open Unity with VibeLink package installed
2. Go to `Window → General → Test Runner`
3. Select **EditMode** tab
4. Click **Run All**

## Test Structure

### Node.js Tests (`mcp-server/src/__tests__/`)

```
__tests__/
├── vibelink-client.test.ts    # Unit tests for client
├── integration.test.ts         # Integration tests
└── test-utils.ts               # Test helpers
```

**Coverage Areas:**
- ✅ Connection management (connect, disconnect, reconnect)
- ✅ Message sending/receiving
- ✅ Error handling (timeouts, malformed data)
- ✅ Concurrent operations
- ✅ Platform-specific pipe paths
- ✅ Real pipe communication

### Unity Tests (`unity-package/Tests/Editor/`)

```
Tests/Editor/
├── VibeLinkMessageTests.cs     # Protocol message tests
├── VibeLinkExecutorTests.cs    # Executor functionality
└── VibeLink.Tests.asmdef       # Test assembly definition
```

**Coverage Areas:**
- ✅ Message serialization/deserialization
- ✅ Query state functionality
- ✅ Script execution
- ✅ Screenshot capture
- ✅ GameObject manipulation
- ✅ End-to-end workflows

## Writing New Tests

### Node.js Unit Test Template

```typescript
import { VibeLinkClient } from '../vibelink-client.js';

describe('MyFeature', () => {
  let client: VibeLinkClient;

  beforeEach(() => {
    client = new VibeLinkClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should do something', async () => {
    // Arrange
    // ... setup

    // Act
    // ... perform action

    // Assert
    // ... verify results
  });
});
```

### Unity Test Template

```csharp
using NUnit.Framework;
using VibeLink.Editor;

namespace VibeLink.Tests
{
    [TestFixture]
    public class MyFeatureTests
    {
        [SetUp]
        public void Setup()
        {
            // Setup code
        }

        [TearDown]
        public void Teardown()
        {
            // Cleanup code
        }

        [Test]
        public void MyFeature_DoesWhat_ExpectedOutcome()
        {
            // Arrange
            
            // Act
            
            // Assert
            Assert.IsTrue(condition);
        }
    }
}
```

## Test Categories

### 1. Unit Tests

**Purpose:** Test individual components in isolation

**Examples:**
- Message serialization
- ID generation
- Error response formatting

**Best Practices:**
- Mock external dependencies
- Test one thing per test
- Fast execution (< 100ms each)

### 2. Integration Tests

**Purpose:** Test component interactions

**Examples:**
- Real pipe communication
- Multiple concurrent commands
- Connection lifecycle

**Best Practices:**
- Use real infrastructure when possible
- Test realistic scenarios
- Clean up resources properly

### 3. End-to-End Tests

**Purpose:** Test complete workflows

**Examples:**
- Agent creates object → queries it → verifies
- Capture → Modify → Capture workflow

**Best Practices:**
- Test from user perspective
- Cover critical user journeys
- May be slower (acceptable)

## Coverage Reports

### Viewing Coverage

After running tests with coverage:

```bash
# Generate coverage report
npm run test:coverage

# Open in browser
open mcp-server/coverage/lcov-report/index.html
```

### Coverage Thresholds

Configured in `jest.config.js`:

```javascript
coverageThreshold: {
  global: {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90,
  },
}
```

### What Counts as Coverage?

- ✅ **Lines:** Every line executed
- ✅ **Branches:** All if/else paths
- ✅ **Functions:** Every function called
- ✅ **Statements:** Every statement executed

## Common Testing Patterns

### Testing Async Operations

```typescript
test('async operation succeeds', async () => {
  const result = await client.sendCommand('test', {});
  expect(result).toBe('expected');
});
```

### Testing Timeouts

```typescript
test('operation times out', async () => {
  jest.useFakeTimers();
  
  const promise = client.sendCommand('test', {});
  jest.advanceTimersByTime(30000);
  
  await expect(promise).rejects.toThrow('timeout');
  
  jest.useRealTimers();
});
```

### Testing Events

```typescript
test('event is emitted', async () => {
  const handler = jest.fn();
  client.on('event', handler);
  
  await triggerEvent();
  
  expect(handler).toHaveBeenCalled();
});
```

### Testing Unity GameObjects

```csharp
[Test]
public void CreatesGameObject()
{
    // Arrange
    var executor = new VibeLinkExecutor();
    
    // Act
    var obj = new GameObject("Test");
    
    // Assert
    Assert.IsNotNull(GameObject.Find("Test"));
    
    // Cleanup
    Object.DestroyImmediate(obj);
}
```

## Mocking Best Practices

### What to Mock

- ✅ Network connections (in unit tests)
- ✅ File system operations
- ✅ External services
- ✅ Time-dependent operations

### What NOT to Mock

- ❌ The thing you're testing
- ❌ Simple data structures
- ❌ Pure functions
- ❌ In integration tests (use real implementations)

## Debugging Failing Tests

### 1. Run Single Test

```bash
# Node.js
npm test -- -t "test name"

# Unity
# Click individual test in Test Runner
```

### 2. Enable Verbose Output

```bash
npm test -- --verbose
```

### 3. Check Test Isolation

```bash
# Run tests in random order
npm test -- --randomize
```

### 4. Use Debugger

```typescript
test('debugging test', async () => {
  debugger; // Will pause in Node inspector
  const result = await client.sendCommand('test', {});
  expect(result).toBe('expected');
});
```

## Continuous Integration

### GitHub Actions (Coming Soon)

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## Performance Testing

### Benchmarking

```typescript
test('command completes within 100ms', async () => {
  const start = Date.now();
  await client.sendCommand('fast_cmd', {});
  const duration = Date.now() - start;
  
  expect(duration).toBeLessThan(100);
});
```

### Load Testing

```typescript
test('handles 100 concurrent commands', async () => {
  const promises = [];
  for (let i = 0; i < 100; i++) {
    promises.push(client.sendCommand('cmd', {}));
  }
  
  const results = await Promise.all(promises);
  expect(results).toHaveLength(100);
});
```

## Test Data Management

### Fixtures

```typescript
// __tests__/fixtures/sample-message.json
{
  "id": "test-123",
  "command": "unity_ping",
  "payload": "{}"
}
```

```typescript
import sampleMessage from './fixtures/sample-message.json';

test('uses fixture data', () => {
  expect(sampleMessage.id).toBe('test-123');
});
```

## Edge Cases to Test

Always test these scenarios:

- ✅ Empty inputs
- ✅ Null/undefined values
- ✅ Very large inputs
- ✅ Special characters
- ✅ Concurrent operations
- ✅ Error conditions
- ✅ Boundary values (0, -1, MAX_INT)
- ✅ Network failures
- ✅ Timeouts

## Code Coverage Tips

### Increase Coverage

1. **Find uncovered code:**
   ```bash
   npm run test:coverage
   # Open HTML report and look for red/yellow lines
   ```

2. **Add tests for uncovered branches:**
   ```typescript
   // Cover both branches
   test('handles success', () => { /* ... */ });
   test('handles failure', () => { /* ... */ });
   ```

3. **Test error paths:**
   ```typescript
   test('throws on invalid input', () => {
     expect(() => func(null)).toThrow();
   });
   ```

### Don't Game Coverage

- ❌ Don't add meaningless tests just for coverage
- ❌ Don't skip testing edge cases
- ✅ Do write meaningful tests that catch real bugs
- ✅ Do focus on critical paths first

## Contributing Tests

When submitting a PR:

1. ✅ All tests must pass
2. ✅ Coverage must remain ≥90%
3. ✅ New features must include tests
4. ✅ Bug fixes should include regression tests
5. ✅ Follow existing test patterns

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [NUnit Documentation](https://nunit.org/)
- [Unity Test Framework](https://docs.unity3d.com/Packages/com.unity.test-framework@latest)
- [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)

---

**Remember:** Good tests catch bugs before users do. Write tests that give you confidence to ship!
