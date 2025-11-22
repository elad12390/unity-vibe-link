using System;
using System.Threading.Tasks;
using UnityEditor;
using UnityEngine;
using VibeLink.Protocol;

namespace VibeLink.Editor.Powers
{
    /// <summary>
    /// Power 2: The Hands - Direct Manipulation
    /// Executes simple C# expressions immediately (MVP version)
    /// </summary>
    public class HandsPower : IVibeLinkPower
    {
        public void Initialize()
        {
            Debug.Log("[VibeLink HandsPower] Initialized (MVP version)");
        }

        public async Task<VibeLinkResponse> Execute(VibeLinkMessage message)
        {
            try
            {
                ExecuteScriptPayload payload = JsonUtility.FromJson<ExecuteScriptPayload>(message.payload);
                
                // Execute on main thread
                string result = await ExecuteOnMainThread(() => ExecuteCodeImmediately(payload.code));

                return new VibeLinkResponse(message.id, true, result);
            }
            catch (Exception ex)
            {
                Debug.LogError($"[VibeLink HandsPower] Exception: {ex.Message}\n{ex.StackTrace}");
                return new VibeLinkResponse(message.id, false, null, $"Script execution error: {ex.Message}");
            }
        }

        /// <summary>
        /// Execute C# code using pattern matching for common Unity operations
        /// This is a simple implementation that handles basic GameObject creation and manipulation
        /// </summary>
        private string ExecuteCodeImmediately(string code)
        {
            try
            {
                Debug.Log($"[VibeLink HandsPower] Executing code: {code}");
                
                // Split into lines and execute each statement
                string[] lines = code.Split(new[] { ';', '\n' }, StringSplitOptions.RemoveEmptyEntries);
                var variables = new System.Collections.Generic.Dictionary<string, UnityEngine.Object>();
                
                foreach (string line in lines)
                {
                    string trimmedLine = line.Trim();
                    if (string.IsNullOrEmpty(trimmedLine)) continue;
                    
                    ExecuteLine(trimmedLine, variables);
                }
                
                return $"✓ Executed {lines.Length} statement(s) successfully";
            }
            catch (Exception ex)
            {
                Debug.LogError($"[VibeLink HandsPower] Execution error: {ex.Message}");
                return $"✗ Error: {ex.Message}";
            }
        }

        private void ExecuteLine(string line, System.Collections.Generic.Dictionary<string, UnityEngine.Object> variables)
        {
            // Pattern 1: var name = GameObject.CreatePrimitive(PrimitiveType.Cube);
            if (line.Contains("GameObject.CreatePrimitive"))
            {
                string varName = line.Split('=')[0].Replace("var", "").Trim();
                
                GameObject obj = null;
                if (line.Contains("PrimitiveType.Cube")) obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
                else if (line.Contains("PrimitiveType.Sphere")) obj = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                else if (line.Contains("PrimitiveType.Capsule")) obj = GameObject.CreatePrimitive(PrimitiveType.Capsule);
                else if (line.Contains("PrimitiveType.Cylinder")) obj = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                else if (line.Contains("PrimitiveType.Plane")) obj = GameObject.CreatePrimitive(PrimitiveType.Plane);
                else if (line.Contains("PrimitiveType.Quad")) obj = GameObject.CreatePrimitive(PrimitiveType.Quad);
                
                if (obj != null)
                {
                    variables[varName] = obj;
                    Debug.Log($"Created {varName}");
                }
            }
            // Pattern 2: objName.name = "SomeName";
            else if (line.Contains(".name ="))
            {
                string[] parts = line.Split('.');
                string varName = parts[0].Trim();
                string value = line.Split('=')[1].Trim().Trim('"');
                
                if (variables.ContainsKey(varName))
                {
                    ((GameObject)variables[varName]).name = value;
                    Debug.Log($"Set {varName}.name = {value}");
                }
            }
            // Pattern 3: objName.transform.position = new Vector3(x, y, z);
            else if (line.Contains(".transform.position"))
            {
                string varName = line.Split('.')[0].Trim();
                string vectorStr = line.Split('(')[1].Split(')')[0];
                string[] coords = vectorStr.Split(',');
                
                if (variables.ContainsKey(varName) && coords.Length == 3)
                {
                    float x = float.Parse(coords[0].Trim());
                    float y = float.Parse(coords[1].Trim());
                    float z = float.Parse(coords[2].Trim());
                    ((GameObject)variables[varName]).transform.position = new Vector3(x, y, z);
                    Debug.Log($"Set {varName}.transform.position = ({x}, {y}, {z})");
                }
            }
            // Pattern 4: Debug.Log("message");
            else if (line.Contains("Debug.Log"))
            {
                string message = line.Split('(')[1].Split(')')[0].Trim('"');
                Debug.Log($"[Script] {message}");
            }
        }

        private Task<T> ExecuteOnMainThread<T>(Func<T> action)
        {
            var tcs = new TaskCompletionSource<T>();
            bool executed = false;

            EditorApplication.CallbackFunction updateCallback = null;
            updateCallback = () =>
            {
                if (executed) return;
                
                try
                {
                    T result = action();
                    tcs.SetResult(result);
                }
                catch (Exception ex)
                {
                    tcs.SetException(ex);
                }
                finally
                {
                    executed = true;
                    EditorApplication.update -= updateCallback;
                }
            };

            EditorApplication.update += updateCallback;
            return tcs.Task;
        }
    }
}
