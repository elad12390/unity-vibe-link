# VibeLink Workflow Examples

Real-world examples of how AI agents use VibeLink to assist with Unity development.

## Example 1: "The Button is Off-Center"

**User Request:**
> The login button looks off-center on the main menu

**Agent Workflow:**

```
Step 1: Capture current state
> unity_capture_view({ viewType: "game", resolution: "720p" })

[Agent analyzes screenshot and sees button is indeed off-center]

Step 2: Query button state
> unity_query_state({ selector: "Canvas > LoginButton" })

Response:
{
  "name": "LoginButton",
  "position": "(150, 200, 0)",
  "components": ["RectTransform", "Button", "Image"]
}

Step 3: Fix the position
> unity_execute_script({
    code: `
      GameObject button = GameObject.Find("LoginButton");
      if (button != null) {
        RectTransform rt = button.GetComponent<RectTransform>();
        rt.anchoredPosition = new Vector2(0, 0); // Center it
        rt.anchorMin = new Vector2(0.5f, 0.5f);
        rt.anchorMax = new Vector2(0.5f, 0.5f);
        Debug.Log("Centered login button");
      }
    `
  })

Step 4: Verify the fix
> unity_capture_view({ viewType: "game", resolution: "720p" })

[Agent compares before/after screenshots]
```

**Agent Response:**
> I've centered the login button. It was anchored incorrectly. Here's the before/after:
> [Shows both screenshots]
> The button is now properly centered using anchor-based positioning.

---

## Example 2: "Add Enemy Spawning"

**User Request:**
> Add an enemy spawner that creates 5 enemies every 2 seconds, but make sure they don't spawn inside walls

**Agent Workflow:**

```
Step 1: Create basic spawner
> unity_execute_script({
    code: `
      GameObject spawner = new GameObject("EnemySpawner");
      
      // Simple spawner script (inline for testing)
      spawner.AddComponent<UnityEngine.MonoBehaviour>();
      
      // For now, create a simple test spawn
      for (int i = 0; i < 5; i++) {
        GameObject enemy = GameObject.CreatePrimitive(PrimitiveType.Capsule);
        enemy.name = "Enemy_" + i;
        enemy.transform.position = new Vector3(
          UnityEngine.Random.Range(-10f, 10f),
          1,
          UnityEngine.Random.Range(-10f, 10f)
        );
        enemy.tag = "Enemy";
      }
      
      Debug.Log("Created test enemies");
    `
  })

Step 2: Test for collisions
> unity_run_playmode({ duration: 3.0 })

Response shows:
"[Warning] Enemy_2 spawned inside wall at position (5, 1, -3)"

Step 3: Add collision checking
> unity_execute_script({
    code: `
      // Delete old test enemies
      GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
      foreach (GameObject enemy in enemies) {
        GameObject.DestroyImmediate(enemy);
      }
      
      // Spawn with collision checking
      int spawned = 0;
      int attempts = 0;
      
      while (spawned < 5 && attempts < 50) {
        Vector3 pos = new Vector3(
          UnityEngine.Random.Range(-10f, 10f),
          1,
          UnityEngine.Random.Range(-10f, 10f)
        );
        
        // Check for collisions
        if (!Physics.CheckSphere(pos, 0.5f)) {
          GameObject enemy = GameObject.CreatePrimitive(PrimitiveType.Capsule);
          enemy.name = "Enemy_" + spawned;
          enemy.transform.position = pos;
          enemy.tag = "Enemy";
          spawned++;
        }
        attempts++;
      }
      
      Debug.Log($"Spawned {spawned} enemies with collision checking");
    `
  })

Step 4: Verify no collision warnings
> unity_run_playmode({ duration: 5.0 })

Response shows clean logs, no collision warnings.

Step 5: Visual verification
> unity_capture_view({ viewType: "scene" })
```

**Agent Response:**
> I've created an enemy spawner with collision checking. Spawned 5 enemies using Physics.CheckSphere to ensure they don't spawn inside walls. Tested for 5 seconds with zero collision warnings.

---

## Example 3: "Procedural Terrain Generation"

**User Request:**
> Generate a simple procedural terrain with hills

**Agent Workflow:**

```
Step 1: Create terrain with Perlin noise
> unity_execute_script({
    code: `
      int width = 50;
      int height = 50;
      
      GameObject terrain = new GameObject("ProceduralTerrain");
      MeshFilter mf = terrain.AddComponent<MeshFilter>();
      MeshRenderer mr = terrain.AddComponent<MeshRenderer>();
      
      // Create mesh
      Mesh mesh = new Mesh();
      Vector3[] vertices = new Vector3[width * height];
      int[] triangles = new int[(width - 1) * (height - 1) * 6];
      
      // Generate vertices with Perlin noise
      for (int z = 0; z < height; z++) {
        for (int x = 0; x < width; x++) {
          float y = Mathf.PerlinNoise(x * 0.1f, z * 0.1f) * 5f;
          vertices[z * width + x] = new Vector3(x, y, z);
        }
      }
      
      // Generate triangles
      int t = 0;
      for (int z = 0; z < height - 1; z++) {
        for (int x = 0; x < width - 1; x++) {
          int i = z * width + x;
          triangles[t++] = i;
          triangles[t++] = i + width;
          triangles[t++] = i + 1;
          triangles[t++] = i + 1;
          triangles[t++] = i + width;
          triangles[t++] = i + width + 1;
        }
      }
      
      mesh.vertices = vertices;
      mesh.triangles = triangles;
      mesh.RecalculateNormals();
      
      mf.mesh = mesh;
      
      // Add material
      Material mat = new Material(Shader.Find("Standard"));
      mat.color = new Color(0.3f, 0.7f, 0.3f); // Green
      mr.material = mat;
      
      Debug.Log("Generated procedural terrain");
    `
  })

Step 2: Visual verification
> unity_capture_view({ viewType: "scene" })

Step 3: Adjust camera to see it better
> unity_execute_script({
    code: `
      Camera cam = Camera.main;
      if (cam != null) {
        cam.transform.position = new Vector3(25, 15, -10);
        cam.transform.LookAt(new Vector3(25, 0, 25));
      }
    `
  })

Step 4: Capture final result
> unity_capture_view({ viewType: "scene" })
```

**Agent Response:**
> I've generated a 50x50 procedural terrain using Perlin noise. The hills vary smoothly with a max height of 5 units. Added green material for grass appearance.
> [Shows screenshot]

---

## Example 4: "Debug Physics Issues"

**User Request:**
> My player keeps falling through the floor. Can you debug it?

**Agent Workflow:**

```
Step 1: Query player state
> unity_query_state({ selector: "Player" })

Response:
{
  "name": "Player",
  "components": ["Transform", "Rigidbody", "CapsuleCollider"]
}

Step 2: Query floor state
> unity_query_state({ selector: "Floor" })

Response:
{
  "name": "Floor",
  "components": ["Transform", "MeshRenderer"]
  // Missing: Collider!
}

Step 3: Add missing collider to floor
> unity_execute_script({
    code: `
      GameObject floor = GameObject.Find("Floor");
      if (floor != null && floor.GetComponent<Collider>() == null) {
        BoxCollider collider = floor.AddComponent<BoxCollider>();
        Debug.Log("Added BoxCollider to floor");
      }
    `
  })

Step 4: Test in play mode
> unity_run_playmode({ duration: 5.0 })

Response shows: No errors, player stays on floor.
```

**Agent Response:**
> Found the issue - the floor was missing a collider component. I added a BoxCollider and tested for 5 seconds. The player now stays on the floor correctly.

---

## Tips for Effective Agent Workflows

1. **Always start with querying** when debugging
2. **Use visual verification** for anything visible
3. **Test in play mode** for gameplay features
4. **Iterate quickly** - make small changes and verify
5. **Provide detailed responses** - show your work

## Common Patterns

| Task Type | Recommended Flow |
|-----------|-----------------|
| Visual bugs | Capture → Query → Fix → Capture |
| Gameplay features | Code → Test → Fix → Test |
| Physics issues | Query → Analyze → Fix → Test |
| Procedural generation | Code → Capture → Adjust → Capture |
| Performance issues | Test → Profile → Fix → Test |
