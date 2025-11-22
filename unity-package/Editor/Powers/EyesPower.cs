using System;
using System.IO;
using System.Threading.Tasks;
using UnityEditor;
using UnityEngine;
using VibeLink.Protocol;

namespace VibeLink.Editor.Powers
{
    /// <summary>
    /// Power 1: The Eyes - Visual Verification
    /// Captures screenshots of Game View or Scene View
    /// </summary>
    public class EyesPower : IVibeLinkPower
    {
        private const string SCREENSHOT_PATH = ".agent_view.png";

        public void Initialize()
        {
            // No initialization needed
        }

        public async Task<VibeLinkResponse> Execute(VibeLinkMessage message)
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

        private Task<byte[]> CaptureGameView(int width, int height)
        {
            return ExecuteOnMainThread(() =>
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

        private Task<byte[]> CaptureSceneView(int width, int height)
        {
            return ExecuteOnMainThread(() =>
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
