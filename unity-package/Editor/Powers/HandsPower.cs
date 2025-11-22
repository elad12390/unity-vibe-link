using System;
using System.IO;
using System.Threading.Tasks;
using UnityEditor;
using VibeLink.Protocol;

namespace VibeLink.Editor.Powers
{
    /// <summary>
    /// Power 2: The Hands - Direct Manipulation
    /// Executes C# scripts in the Unity Editor
    /// </summary>
    public class HandsPower : IVibeLinkPower
    {
        private const string SCRATCHPAD_PATH = "Assets/_AgentScratchpad";

        public void Initialize()
        {
            // Ensure scratchpad folder exists
            if (!AssetDatabase.IsValidFolder(SCRATCHPAD_PATH))
            {
                Directory.CreateDirectory(SCRATCHPAD_PATH);
                AssetDatabase.Refresh();
            }
        }

        public async Task<VibeLinkResponse> Execute(VibeLinkMessage message)
        {
            try
            {
                ExecuteScriptPayload payload = JsonUtility.FromJson<ExecuteScriptPayload>(message.payload);
                
                // Execute on main thread
                string result = await ExecuteOnMainThread(() =>
                {
                    try
                    {
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
            // For MVP: Create a temporary script file
            // Full implementation would use Roslyn for dynamic compilation
            
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
    }
}
