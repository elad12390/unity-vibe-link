using System;
using UnityEditor;
using UnityEngine;

namespace VibeLink.Editor
{
    /// <summary>
    /// Auto-starts VibeLink on Unity load (for development)
    /// </summary>
    public static class VibeLinkAutoStart
    {
        [InitializeOnLoadMethod]
        private static void AutoStart()
        {
            Debug.LogWarning("[VibeLink AutoStart] InitializeOnLoadMethod triggered!");
            
            EditorApplication.delayCall += () =>
            {
                try
                {
                    Debug.LogWarning("[VibeLink AutoStart] Starting VibeLink Host...");
                    VibeLinkHost.ShowWindow();
                    Debug.LogWarning("[VibeLink AutoStart] VibeLink Host started!");
                }
                catch (Exception ex)
                {
                    Debug.LogError($"[VibeLink AutoStart] Failed: {ex.Message}\n{ex.StackTrace}");
                }
            };
        }
    }
}
