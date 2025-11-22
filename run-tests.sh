#!/bin/bash

# VibeLink Test Runner
# Runs all tests and generates coverage reports

set -e

echo "================================"
echo "  VibeLink Test Suite"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Track overall success
OVERALL_SUCCESS=true

# Step 1: Install dependencies if needed
echo -e "${BLUE}[1/4]${NC} Checking dependencies..."
cd "$SCRIPT_DIR/mcp-server"
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Step 2: Build TypeScript
echo -e "${BLUE}[2/4]${NC} Building TypeScript..."
npm run build

# Step 3: Run Node.js unit tests
echo ""
echo -e "${BLUE}[3/4]${NC} Running Node.js unit tests..."
echo "========================================"

if npm test; then
    echo -e "${GREEN}✓ Node.js tests passed${NC}"
else
    echo -e "${RED}✗ Node.js tests failed${NC}"
    OVERALL_SUCCESS=false
fi

# Step 4: Run with coverage
echo ""
echo -e "${BLUE}[4/4]${NC} Running coverage analysis..."
echo "========================================"

if npm run test:coverage; then
    echo -e "${GREEN}✓ Coverage report generated${NC}"
    echo ""
    echo "Coverage report available at: mcp-server/coverage/lcov-report/index.html"
else
    echo -e "${YELLOW}⚠ Coverage generation failed${NC}"
fi

# Unity tests information
echo ""
echo "========================================"
echo -e "${BLUE}Unity Tests${NC}"
echo "========================================"
echo ""
echo "To run Unity tests:"
echo "  1. Open your Unity project with VibeLink package installed"
echo "  2. Go to Window → General → Test Runner"
echo "  3. Select 'EditMode' tab"
echo "  4. Click 'Run All'"
echo ""
echo "Unity tests cannot be run from command line in this alpha version."
echo "Full CLI test runner coming in beta release."
echo ""

# Summary
echo "========================================"
echo -e "${BLUE}Test Summary${NC}"
echo "========================================"
echo ""

if [ "$OVERALL_SUCCESS" = true ]; then
    echo -e "${GREEN}✓ All automated tests passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "  - Review coverage report"
    echo "  - Run Unity tests manually"
    echo "  - Test integration with actual Unity project"
    exit 0
else
    echo -e "${RED}✗ Some tests failed${NC}"
    echo ""
    echo "Please review the output above and fix failing tests."
    exit 1
fi
