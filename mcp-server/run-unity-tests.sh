#!/bin/bash

# Unity Integration Test Runner
# This script runs integration tests that require Unity to be running

set -e

echo "╔══════════════════════════════════════════════════╗"
echo "║   Unity VibeLink Integration Test Runner        ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Check if Unity is running by looking for the pipe
if [ "$(uname)" == "Darwin" ]; then
    PIPE_PATH="$(find "$(dirname "$(mktemp -u)")" -name "CoreFxPipe_vibelink_unity_pipe" 2>/dev/null | head -1)"
else
    PIPE_PATH="/tmp/vibelink_unity_pipe"
fi

if [ -e "$PIPE_PATH" ]; then
    echo "✓ Found Unity VibeLink pipe at: $PIPE_PATH"
    echo "✓ Unity appears to be running with VibeLink Host"
    echo ""
    echo "Running integration tests..."
    echo ""
    UNITY_RUNNING=true npx jest --testPathPattern=unity-integration
else
    echo "✗ Unity VibeLink pipe not found"
    echo ""
    echo "To run these tests:"
    echo "  1. Open Unity Editor"
    echo "  2. Go to: Tools → VibeLink → Start Host"
    echo "  3. Verify the VibeLink window shows 'Status: Running'"
    echo "  4. Run this script again"
    echo ""
    echo "Running tests in skip mode (they won't actually test Unity)..."
    echo ""
    UNITY_RUNNING=false npx jest --testPathPattern=unity-integration
fi
