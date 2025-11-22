using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using VibeLink.Protocol;

namespace VibeLink.Editor
{
    /// <summary>
    /// Executes VibeLink commands (The "Powers")
    /// </summary>
    public class VibeLinkExecutor
    {
        private const string SCREENSHOT_PATH = ".agent_view.png";
        private const string SCRATCHPAD_PATH = "Assets/_AgentScratchpad";

        public VibeLinkExecutor()
        {
            // Ensure scratchpad folder exists
            if (!AssetDatabase.IsValidFolder(SCRATCHPAD_PATH))
            {
                Directory.CreateDirectory(SCRATCHPAD_PATH);
                AssetDatabase.Refresh();
            }
        }

        #region Power 1: The Eyes (Visual Verification)

        public async Task<VibeLinkResponse> CaptureView(VibeLinkMessage message)
        {
            try
            {
                CaptureViewPayload payload = JsonUtility.FromJson<CaptureViewPayload>(message.payload);
                
                // Parse resolution
                int width = 1280;
                int height = 720;
                if (payload.resolution == "1080p")
                {
                    width = 1920;
                    height = 1080;
                }

                byte[] imageData = null;

                if (payload.viewType == "game")
                {
                    imageData = await CaptureGameView(width, height);
                }
                else if (payload.viewType == "scene")
                {
                    imageData = await CaptureSceneView(width, height);
                }
                else
                {
                    return new VibeLinkResponse(message.id, false, null, $"Invalid view type: {payload.viewType}");
                }

                // Save to file
                File.WriteAllBytes(SCREENSHOT_PATH, imageData);

                return new VibeLinkResponse(message.id, true, SCREENSHOT_PATH);
            }
            catch (Exception ex)
            {
                return new VibeLinkResponse(message.id, false, null, $"Capture failed: {ex.Message}");
            }
        }

        private async Task<byte[]> CaptureGameView(int width, int height)
        {
            return await Task.Run(() =>
            {
                Camera camera = Camera.main;
                if (camera == null)
                {
                    camera = GameObject.FindObjectOfType<Camera>();
                }

                if (camera == null)
                {
                    throw new Exception("No camera found in scene");
                }

                RenderTexture rt = new RenderTexture(width, height, 24);
                RenderTexture currentRT = camera.targetTexture;
                
                camera.targetTexture = rt;
                camera.Render();

                RenderTexture.active = rt;
                Texture2D screenshot = new Texture2D(width, height, TextureFormat.RGB24, false);
                screenshot.ReadPixels(new Rect(0, 0, width, height), 0, 0);
                screenshot.Apply();

                camera.targetTexture = currentRT;
                RenderTexture.active = null;
                rt.Release();

                return screenshot.EncodeToPNG();
            });
        }

        private async Task<byte[]> CaptureSceneView(int width, int height)
        {
            return await Task.Run(() =>
            {
                SceneView sceneView = SceneView.lastActiveSceneView;
                if (sceneView == null)
                {
                    throw new Exception("No active Scene View found");
                }

                Camera camera = sceneView.camera;
                RenderTexture rt = new RenderTexture(width, height, 24);
                RenderTexture currentRT = camera.targetTexture;

                camera.targetTexture = rt;
                camera.Render();

                RenderTexture.active = rt;
                Texture2D screenshot = new Texture2D(width, height, TextureFormat.RGB24, false);
                screenshot.ReadPixels(new Rect(0, 0, width, height), 0, 0);
                screenshot.Apply();

                camera.targetTexture = currentRT;
                RenderTexture.active = null;
                rt.Release();

                return screenshot.EncodeToPNG();
            });
        }

        #endregion

        #region Power 2: The Hands (Direct Manipulation)

        public async Task<VibeLinkResponse> ExecuteScript(VibeLinkMessage message)
        {
            try
            {
                ExecuteScriptPayload payload = JsonUtility.FromJson<ExecuteScriptPayload>(message.payload);
                
                // Execute on main thread
                string result = await ExecuteOnMainThread(() =>
                {
                    try
                    {
                        // Use Unity's internal script compilation and execution
                        // For safety, we'll use reflection to run code in editor context
                        return ExecuteCodeSafely(payload.code);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Script execution error: {ex.Message}\n{ex.StackTrace}");
                    }
                });

                return new VibeLinkResponse(message.id, true, result);
            }
            catch (Exception ex)
            {
                return new VibeLinkResponse(message.id, false, null, ex.Message);
            }
        }

        private string ExecuteCodeSafely(string code)
        {
            // For MVP: Use Unity's ExecuteMenuItem or create a temporary EditorWindow
            // Full implementation would use Roslyn or Mono.CSharp for dynamic compilation
            
            // Simple approach: Create a temporary script file, compile it, and run it
            string tempScriptPath = Path.Combine(SCRATCHPAD_PATH, $"AgentScript_{Guid.NewGuid()}.cs");
            
            string wrappedCode = @"
using UnityEngine;
using UnityEditor;
using System;

public static class AgentExecutor
{
    public static string Run()
    {
        try
        {
" + code + @"
            return ""Execution completed successfully"";
        }
        catch (Exception ex)
        {
            return $""Error: {ex.Message}"";
        }
    }
}
";
            
            File.WriteAllText(tempScriptPath, wrappedCode);
            AssetDatabase.Refresh();
            
            // Wait for compilation
            System.Threading.Thread.Sleep(1000);
            
            // Note: Full implementation needs Roslyn compilation
            // For now, return a message indicating the script was staged
            return $"Script staged at {tempScriptPath}. Full dynamic execution requires Roslyn integration.";
        }

        private async Task<T> ExecuteOnMainThread<T>(Func<T> action)
        {
            T result = default(T);
            Exception exception = null;
            bool completed = false;

            EditorApplication.delayCall += () =>
            {
                try
                {
                    result = action();
                }
                catch (Exception ex)
                {
                    exception = ex;
                }
                finally
                {
                    completed = true;
                }
            };

            // Wait for completion
            while (!completed)
            {
                await Task.Delay(10);
            }

            if (exception != null)
            {
                throw exception;
            }

            return result;
        }

        #endregion

        #region Power 3: The Brain (State Querying)

        public async Task<VibeLinkResponse> QueryState(VibeLinkMessage message)
        {
            try
            {
                QueryStatePayload payload = JsonUtility.FromJson<QueryStatePayload>(message.payload);
                
                string result = await ExecuteOnMainThread(() =>
                {
                    GameObject[] objects = FindObjectsBySelector(payload.selector);
                    
                    if (objects.Length == 0)
                    {
                        return "[]";
                    }

                    List<string> results = new List<string>();
                    foreach (GameObject obj in objects)
                    {
                        results.Add(SerializeGameObject(obj));
                    }

                    return "[" + string.Join(",", results) + "]";
                });

                return new VibeLinkResponse(message.id, true, result);
            }
            catch (Exception ex)
            {
                return new VibeLinkResponse(message.id, false, null, ex.Message);
            }
        }

        private GameObject[] FindObjectsBySelector(string selector)
        {
            // Simple selector implementation
            // Supports: "ObjectName", "*" (all), "ObjectName > ChildName"
            
            if (selector == "*")
            {
                return GameObject.FindObjectsOfType<GameObject>();
            }

            if (selector.Contains(">"))
            {
                // Hierarchical selector
                string[] parts = selector.Split('>').Select(p => p.Trim()).ToArray();
                GameObject parent = GameObject.Find(parts[0]);
                
                if (parent == null) return new GameObject[0];

                for (int i = 1; i < parts.length; i++)
                {
                    Transform child = parent.transform.Find(parts[i]);
                    if (child == null) return new GameObject[0];
                    parent = child.gameObject;
                }

                return new GameObject[] { parent };
            }

            // Simple name search
            GameObject obj = GameObject.Find(selector);
            return obj != null ? new GameObject[] { obj } : new GameObject[0];
        }

        private string SerializeGameObject(GameObject obj)
        {
            var data = new Dictionary<string, object>
            {
                ["name"] = obj.name,
                ["active"] = obj.activeSelf,
                ["tag"] = obj.tag,
                ["layer"] = LayerMask.LayerToName(obj.layer),
                ["position"] = obj.transform.position.ToString(),
                ["rotation"] = obj.transform.rotation.eulerAngles.ToString(),
                ["scale"] = obj.transform.localScale.ToString(),
                ["components"] = obj.GetComponents<Component>().Select(c => c.GetType().Name).ToArray()
            };

            return JsonUtility.ToJson(data);
        }

        #endregion

        #region Power 4: The Time Machine (Test Running)

        private bool _playModeRunning = false;
        private float _playModeTimer = 0;
        private float _playModeDuration = 0;
        private List<string> _playModeLogs = new List<string>();

        public async Task<VibeLinkResponse> RunPlayMode(VibeLinkMessage message)
        {
            try
            {
                RunPlayModePayload payload = JsonUtility.FromJson<RunPlayModePayload>(message.payload);
                
                _playModeDuration = payload.duration;
                _playModeTimer = 0;
                _playModeLogs.Clear();
                _playModeRunning = true;

                // Subscribe to log messages
                Application.logMessageReceived += CaptureLog;

                // Enter play mode
                EditorApplication.EnterPlaymode();

                // Subscribe to update
                EditorApplication.update += UpdatePlayModeTimer;

                // Wait for playmode to complete
                while (_playModeRunning)
                {
                    await Task.Delay(100);
                }

                // Cleanup
                Application.logMessageReceived -= CaptureLog;
                EditorApplication.update -= UpdatePlayModeTimer;

                string logResult = string.Join("\n", _playModeLogs);
                return new VibeLinkResponse(message.id, true, logResult);
            }
            catch (Exception ex)
            {
                return new VibeLinkResponse(message.id, false, null, ex.Message);
            }
        }

        private void UpdatePlayModeTimer()
        {
            if (!_playModeRunning) return;

            _playModeTimer += Time.deltaTime;

            if (_playModeTimer >= _playModeDuration)
            {
                _playModeRunning = false;
                EditorApplication.ExitPlaymode();
            }
        }

        private void CaptureLog(string logString, string stackTrace, LogType type)
        {
            _playModeLogs.Add($"[{type}] {logString}");
            if (type == LogType.Exception || type == LogType.Error)
            {
                _playModeLogs.Add($"  {stackTrace}");
            }
        }

        #endregion
    }
}
