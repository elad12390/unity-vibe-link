# VibeLink Troubleshooting Guide

Common issues and solutions for VibeLink setup and operation.

## Installation Issues

### "Connection timeout - is Unity Editor running?"

**Problem:** MCP server can't connect to Unity Editor

**Solutions:**
1. Ensure Unity Editor is open
2. Start VibeLink Host in Unity: `Tools → VibeLink → Start Host`
3. Check VibeLink window shows "Status: Running"
4. Verify no firewall blocking the named pipe
5. On macOS, check `/tmp/vibelink_unity_pipe` exists when Unity is running
6. On Windows, check `\\.\\pipe\\vibelink_unity_pipe` is accessible

**Debug steps:**
```bash
# macOS/Linux - Check if pipe exists
ls -la /tmp/vibelink_unity_pipe

# Windows - Check with PowerShell
Get-ChildItem \\.\pipe\ | Where-Object { $_.Name -eq "vibelink_unity_pipe" }
```

---

### "Package not found in Unity"

**Problem:** Unity doesn't recognize the VibeLink package

**Solutions:**
1. Ensure package is in `Packages/com.vibelink.unity/` (not in Assets!)
2. Check `package.json` exists in package root
3. Restart Unity Editor
4. Open Package Manager and check "Packages: In Project"
5. Check Unity version is 2021.3 or later

**Manual install:**
```bash
cd YourUnityProject/Packages
git clone <repo-url> com.vibelink.unity
# Or copy the unity-package folder manually
```

---

### "npm install fails"

**Problem:** MCP server dependencies won't install

**Solutions:**
1. Check Node.js version: `node --version` (need 18+)
2. Update npm: `npm install -g npm@latest`
3. Clear npm cache: `npm cache clean --force`
4. Delete `node_modules` and retry: `rm -rf node_modules && npm install`

---

## Runtime Issues

### "unity_execute_script returns 'Script staged' message"

**Problem:** Dynamic compilation not fully implemented yet

**Current Status:** Alpha version uses simplified script execution

**Workaround:**
- For complex scripts, create actual `.cs` files in `Assets/_AgentScratchpad/`
- For simple operations (creating objects, modifying properties), the inline execution works

**Future:** Full Roslyn integration coming in beta release

---

### "unity_query_state returns empty array"

**Problem:** Selector isn't finding any GameObjects

**Solutions:**
1. Check GameObject name is exact (case-sensitive)
2. GameObject must be in the currently loaded scene
3. Don't include spaces unless the actual name has spaces
4. Try `"*"` to list all objects and find the correct name

**Examples:**
```javascript
// ❌ Wrong - case mismatch
unity_query_state({ selector: "player" }) // GameObject is named "Player"

// ✅ Correct
unity_query_state({ selector: "Player" })

// ✅ Find all objects first
unity_query_state({ selector: "*" })
```

---

### "unity_capture_view returns black screen"

**Problem:** Screenshot is all black

**Solutions:**
1. Ensure a Camera exists in the scene
2. For Game View: Camera must have "Main Camera" tag
3. Check camera isn't pointing at nothing
4. Try Scene View capture instead: `viewType: "scene"`
5. Ensure Unity Editor window is visible (not minimized)

**Debug script:**
```csharp
unity_execute_script({
  code: `
    Camera cam = Camera.main;
    if (cam == null) {
      Debug.LogError("No main camera found!");
    } else {
      Debug.Log("Camera found at: " + cam.transform.position);
      Debug.Log("Camera looking at: " + cam.transform.forward);
    }
  `
})
```

---

### "unity_run_playmode hangs forever"

**Problem:** Play mode doesn't exit after duration

**Solutions:**
1. Manually exit play mode in Unity
2. Restart VibeLink Host
3. Check Unity console for script errors preventing play mode exit
4. Ensure no `EditorApplication.isPaused` is stuck

**Prevention:**
- Keep playmode durations short (5-10 seconds)
- Don't enter playmode while already in playmode

---

### "Changes don't persist after exiting playmode"

**Problem:** Modifications made during playmode are lost

**This is expected Unity behavior:**
- All changes during playmode are temporary
- Use `unity_execute_script` in **Edit Mode** (not during playmode)
- Or save changes to prefabs/ScriptableObjects during playmode

**Correct workflow:**
```javascript
// ❌ Wrong - changes lost
unity_run_playmode({ duration: 5 })
// Any changes here are temporary

// ✅ Correct - changes persist
unity_execute_script({ code: "/* make changes */" })
unity_run_playmode({ duration: 5 }) // just for testing
```

---

## Performance Issues

### "Commands take a long time to respond"

**Problem:** Slow response from Unity

**Solutions:**
1. Unity Editor may be compiling - wait for compilation to finish
2. Reduce screenshot resolution: `"720p"` instead of `"1080p"`
3. Close unnecessary Unity windows
4. Simplify complex scenes (temporarily hide heavy objects)
5. Check Unity isn't frozen - look for spinning beach ball / hourglass

---

### "MCP server uses high CPU"

**Problem:** Node.js process consuming resources

**Solutions:**
1. Ensure only one instance is running: `ps aux | grep vibelink`
2. Kill duplicates: `pkill -f vibelink`
3. Restart the MCP server
4. Check for infinite retry loops in logs

---

## Configuration Issues

### "MCP config not recognized by AI agent"

**Problem:** Agent doesn't see VibeLink tools

**Solutions:**

**For OpenCode:**
1. Check config location: `~/.config/opencode/mcp.json`
2. Ensure JSON is valid (use a JSON validator)
3. Restart OpenCode
4. Check absolute paths (no `~` or relative paths)

**For Claude Desktop:**
1. Check config location: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)
2. Restart Claude Desktop completely
3. Check Developer Tools (if available) for MCP errors

**Verify paths are absolute:**
```json
{
  "mcpServers": {
    "vibelink-unity": {
      "command": "node",
      "args": ["/Users/yourname/path/to/unity-vibe-link/mcp-server/build/index.js"]
    }
  }
}
```

---

## Platform-Specific Issues

### macOS: "Permission denied on pipe"

**Solution:**
```bash
# Give Unity process permission
sudo chmod 777 /tmp/vibelink_unity_pipe

# Or run Unity with elevated permissions (not recommended)
```

### Windows: "Access denied to named pipe"

**Solution:**
1. Run Unity as Administrator (right-click → Run as Administrator)
2. Or adjust pipe security in `VibeLinkTransport.cs`:

```csharp
var pipeSecurity = new PipeSecurity();
pipeSecurity.AddAccessRule(new PipeAccessRule(
    new SecurityIdentifier(WellKnownSidType.WorldSid, null),
    PipeAccessRights.FullControl,
    AccessControlType.Allow
));
```

### Linux: "Named pipe not supported"

**Current Status:** Linux support is experimental

**Workaround:** Use Unix Domain Socket (already implemented in code, should work)

---

## Debugging Tips

### Enable Verbose Logging

**Unity side:**
```csharp
// In VibeLinkHost.cs, add detailed logs:
Debug.Log($"[VibeLink] Received: {messageJson}");
Debug.Log($"[VibeLink] Sending: {response.ToJson()}");
```

**MCP server side:**
```typescript
// In vibelink-client.ts
console.error("[VibeLink Client] Sending:", message);
console.error("[VibeLink Client] Received:", response);
```

### Check Connection Status

```javascript
// Test command
unity_ping()

// Should return: "Unity is connected"
```

### Verify Installation

```bash
# Check MCP server is built
ls mcp-server/build/index.js

# Check Unity package structure
ls -R unity-package/
# Should show: Editor/, Runtime/, package.json
```

---

## Getting Help

If you're still stuck:

1. **Check GitHub Issues:** [github.com/vibelink/unity-vibe-link/issues](https://github.com/vibelink/unity-vibe-link/issues)
2. **Enable debug logging** (see above)
3. **Collect information:**
   - Unity version
   - Node.js version
   - OS and version
   - Error messages from both Unity console and terminal
   - Steps to reproduce

4. **Create an issue** with all the above information

---

## Known Limitations (Alpha)

These are not bugs - they're planned for future releases:

- ✅ Basic script execution (complex dynamic compilation coming in beta)
- ✅ Simple selectors (advanced CSS-like syntax coming soon)
- ✅ Single agent connection (multi-agent support planned)
- ❌ Undo/redo not supported (encourage git commits/backups)
- ❌ No watchdog timer yet (infinite loop protection coming soon)
- ❌ No asset modification tracking (planned for beta)

---

**Remember:** VibeLink is in alpha. If something breaks, it's not you - file an issue and help us improve it!
