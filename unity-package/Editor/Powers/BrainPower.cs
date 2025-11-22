using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnityEditor;
using UnityEngine;
using VibeLink.Protocol;

namespace VibeLink.Editor.Powers
{
    /// <summary>
    /// Power 3: The Brain - State Querying
    /// Queries GameObject state using selector syntax
    /// </summary>
    public class BrainPower : IVibeLinkPower
    {
        public void Initialize()
        {
            // No initialization needed
        }

        public async Task<VibeLinkResponse> Execute(VibeLinkMessage message)
        {
            try
            {
                QueryStatePayload payload = JsonUtility.FromJson<QueryStatePayload>(message.payload);
                
                // Must execute on main thread for GameObject operations
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

                for (int i = 1; i < parts.Length; i++)
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

        private Task<T> ExecuteOnMainThread<T>(Func<T> action)
        {
            var tcs = new TaskCompletionSource<T>();
            bool executed = false;

            // Use EditorApplication.update instead of delayCall
            // It's more reliable for async contexts
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
