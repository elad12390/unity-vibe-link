using UnityEditor;
using UnityEngine;

namespace VibeLink.Editor
{
    public class VibeLinkTrigger : AssetPostprocessor
    {
        private static void OnPostprocessAllAssets(
            string[] importedAssets,
            string[] deletedAssets,
            string[] movedAssets,
            string[] movedFromAssetPaths)
        {
            foreach (string asset in importedAssets)
            {
                if (asset.Contains("StartVibeLinkNow"))
                {
                    Debug.LogWarning("[VibeLink Trigger] DETECTED TRIGGER FILE! Starting VibeLinkHost...");
                    EditorApplication.delayCall += () =>
                    {
                        try
                        {
                            VibeLinkHost.ShowWindow();
                            Debug.LogWarning("[VibeLink Trigger] VibeLinkHost started!");
                            
                            // Delete trigger file
                            AssetDatabase.DeleteAsset(asset);
                        }
                        catch (System.Exception ex)
                        {
                            Debug.LogError($"[VibeLink Trigger] Failed: {ex.Message}");
                        }
                    };
                    break;
                }
            }
        }
    }
}
