#!/bin/bash

# VibeLink Installation Script
# This script helps you set up VibeLink for your Unity project

set -e

echo "================================"
echo "  VibeLink Installation"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Step 1: Install MCP Server dependencies
echo -e "${BLUE}[1/4]${NC} Installing MCP server dependencies..."
cd "$SCRIPT_DIR/mcp-server"
npm install

# Step 2: Build MCP Server
echo -e "${BLUE}[2/4]${NC} Building MCP server..."
npm run build

# Step 3: Get Unity project path
echo -e "${BLUE}[3/4]${NC} Setting up Unity package..."
echo ""
read -p "Enter the path to your Unity project (or press Enter to skip): " UNITY_PROJECT_PATH

if [ ! -z "$UNITY_PROJECT_PATH" ]; then
    # Check if path exists
    if [ ! -d "$UNITY_PROJECT_PATH" ]; then
        echo -e "${RED}Error:${NC} Unity project path does not exist: $UNITY_PROJECT_PATH"
        echo "You can manually copy the unity-package folder to your project's Packages directory later."
    else
        # Check if Packages directory exists
        PACKAGES_DIR="$UNITY_PROJECT_PATH/Packages"
        if [ ! -d "$PACKAGES_DIR" ]; then
            mkdir -p "$PACKAGES_DIR"
        fi

        # Copy Unity package
        DEST_PATH="$PACKAGES_DIR/com.vibelink.unity"
        
        if [ -d "$DEST_PATH" ]; then
            read -p "Package already exists. Overwrite? (y/n): " OVERWRITE
            if [ "$OVERWRITE" != "y" ]; then
                echo "Skipping Unity package installation."
            else
                rm -rf "$DEST_PATH"
                cp -r "$SCRIPT_DIR/unity-package" "$DEST_PATH"
                echo -e "${GREEN}✓${NC} Unity package installed to: $DEST_PATH"
            fi
        else
            cp -r "$SCRIPT_DIR/unity-package" "$DEST_PATH"
            echo -e "${GREEN}✓${NC} Unity package installed to: $DEST_PATH"
        fi
    fi
else
    echo "Skipping Unity package installation."
    echo "To install later, copy the 'unity-package' folder to your Unity project's 'Packages' directory."
fi

# Step 4: Configure MCP
echo ""
echo -e "${BLUE}[4/4]${NC} MCP Configuration"
echo ""
echo "To use VibeLink with your AI agent, add this to your MCP config:"
echo ""
echo -e "${GREEN}{"
echo '  "mcpServers": {'
echo '    "vibelink-unity": {'
echo '      "command": "node",'
echo "      \"args\": [\"$SCRIPT_DIR/mcp-server/build/index.js\"]"
echo '    }'
echo '  }'
echo -e "}${NC}"
echo ""
echo "Common MCP config locations:"
echo "  - OpenCode: ~/.config/opencode/mcp.json"
echo "  - Claude Desktop: ~/Library/Application Support/Claude/claude_desktop_config.json"
echo ""

# Final instructions
echo ""
echo -e "${GREEN}Installation complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Open your Unity project"
echo "  2. Go to Tools → VibeLink → Start Host"
echo "  3. Start your AI agent with MCP configured"
echo "  4. Try: 'unity_ping' to test the connection"
echo ""
echo "Documentation:"
echo "  - README.md - Full documentation"
echo "  - VIBELINK.md - Agent instructions"
echo ""
