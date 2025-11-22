Product Handoff: VibeLink (Unity Agentic Bridge)
Version: 1.0 Alpha Spec
Target: Internal Agentic Workflows (Claude Code, Opencode, Cursor)
Goal: Enable "closed-loop" agentic development where the AI can Write, See, and Verify without human intervention.
---
1. Product Overview
VibeLink is a hybrid Unity Package & Local Server that exposes the Unity Editor's internal state and functionality to CLI-based AI agents via the Model Context Protocol (MCP).
Unlike standard "chat with code" plugins, VibeLink gives the agent eyes (Screenshots), hands (Editor Scripting), and proprioception (Console/Compilation Logs).
Core Philosophy
*   Native over Network: Prefer local filesystem watchers and Named Pipes over flaky HTTP servers where possible.
*   Visual Feedback Loop: The agent must see the result of its code to iterate autonomously.
*   Safe Sandboxing: The agent operates in a "scratchpad" mode to prevent irreversible project corruption.
---
2. Technical Architecture
Component A: The Unity Editor Host (C#)
A hidden EditorWindow that runs on startup ([InitializeOnLoad]).
*   Transport Layer: Uses Named Pipes (Windows) or Unix Domain Sockets (Mac/Linux) for <5ms latency communication with the CLI agent. Avoids HTTP overhead.
*   Execution Engine: A dynamic compiler that ingests C# strings, wraps them in a temporary Editor class, compiles them, executes them, and unloads them.
*   Sensors:
    *   Visual: Captures SceneView and GameView RenderTextures directly to a shared memory buffer or temp file (.agent_view.png).
    *   Auditory: Hooks into Application.logMessageReceived to stream the Console directly to the agent's CLI output.
Component B: The MCP Server (Node.js / Python)
The "Driver" that Claude/Opencode connects to.
*   Protocol: Implements the Model Context Protocol (MCP) JSON-RPC spec.
*   Role: Translates MCP tool calls (e.g., unity_get_hierarchy) into VibeLink internal commands sent via the pipe.
---
3. Feature Specification ("The Superpowers")
These are the specific tools the agent will have access to.
🔴 Power 1: The Eyes (Visual Verification)
*   Tool Name: unity_capture_view(viewType: "game" | "scene", resolution: "720p")
*   Internal Logic:
    *   Force-renders the main camera (even in Editor mode) or captures the active Scene View.
    *   Draws Gizmos specifically for the agent (e.g., bounding boxes around UI elements) so it can "read" the layout.
*   Use Case: "The button looks off-center." -> Agent captures view -> Reads pixels -> Adjusts RectTransform -> Captures again.
🔵 Power 2: The Hands (Direct Manipulation)
*   Tool Name: unity_execute_script(code: string)
*   Internal Logic:
    *   Wraps the code in public static void Run() { ... }.
    *   Uses CSharpCompiler to build an in-memory assembly.
    *   Invokes Run.
    *   Catches exceptions and returns the stack trace to the agent.
*   Use Case: "Create 50 cubes in a spiral." The agent doesn't need to create a file; it just runs the generation logic instantly.
🟢 Power 3: The Brain (State Querying)
*   Tool Name: unity_query_state(selector: string)
*   Internal Logic:
    *   Implements a CSS-like selector for GameObjects (e.g., Player > Graphic > *[MeshRenderer]).
    *   Returns a JSON representation of the object's components and public fields.
*   Use Case: Agent checks if Rigidbody.isKinematic is true without grepping the code, verifying the actual scene value.
🟡 Power 4: The Time Machine (Test Running)
*   Tool Name: unity_run_playmode(duration: float)
*   Internal Logic:
    *   Calls EditorApplication.EnterPlaymode().
    *   Hooks Update to run a timer.
    *   Stops play mode after duration.
    *   Aggregates all exceptions thrown during the run.
*   Use Case: "Does the game crash when I start?" Agent runs it for 5 seconds and checks logs.
---
4. Implementation Guide (For the Engineer)
Source 1: The Transport Layer (Named Pipes)
*   Challenge: Unity's Mono runtime used to crash with .NET Named Pipes.
*   Solution: Use the modern System.IO.Pipes available in .NET Standard 2.1 (Unity 2021.3+).
*   Reference: Unity Named Pipes Implementation (https://github.com/Lachee/unity-named-pipes) (Use this as a reference for the C# side).
Source 2: The Screenshot Hook
*   Challenge: Capturing the Game View when it's not "playing."
*   Solution: Use Camera.Render() manually into a RenderTexture.
*   Snippet Logic:
        RenderTexture rt = new RenderTexture(resWidth, resHeight, 24);
    camera.targetTexture = rt;
    camera.Render();
    // Read pixels to Texture2D -> EncodeToPNG()
    
Source 3: The MCP Server Spec
*   Challenge: Creating a valid MCP server.
*   Solution: Use the official Typescript SDK.
*   Reference: Model Context Protocol Spec (https://modelcontextprotocol.io/introduction)
---
5. "Danger Zone" Protocols
*   Infinite Loops: The dynamic script execution must run on a separate thread or have a "watchdog" timer to kill the process if the agent writes while(true).
*   Asset Corruption: The agent should primarily work in a Assets/_AgentScratchpad folder to avoid overwriting core project settings.
---
6. Workflow Example (The "Vibe Check")
1.  User: "The enemy spawn rate feels too slow, and they spawn inside walls."
2.  Agent (VibeLink):
    *   Calls unity_query_state("EnemySpawner") -> Sees spawnInterval = 10.
    *   Calls unity_execute_script("GameObject.Find('EnemySpawner').GetComponent<Spawner>().spawnInterval = 2;").
    *   Calls unity_run_playmode(10) -> Monitors logs.
    *   Detection: Logs show "Collision detected at (0,0,0)".
    *   Fix: Agent edits Spawner.cs to add a Physics.CheckSphere check.
    *   Verify: Runs playmode again. Zero errors.
3.  Agent: "I decreased the interval to 2s and added collision checks. Verified with a 10s playtest."
---
7. Handoff Checklist
*   [ ] Create VibeLink Unity Package (C# Editor Scripts).
*   [ ] Create vibe-link-server (Node.js MCP Server).
*   [ ] Write VibeLink.md documentation for the AI (System Prompt instructions).
*   [ ] internal testing on a "junk" project to verify pipe latency.