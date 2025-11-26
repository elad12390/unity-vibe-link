using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
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
            Vector3 pos = obj.transform.position;
            Vector3 rot = obj.transform.rotation.eulerAngles;
            Vector3 scale = obj.transform.localScale;

            string[] components = obj.GetComponents<Component>()
                .Where(c => c != null)
                .Select(c => c.GetType().Name)
                .ToArray();

            // Manual JSON building - temporary until Protobuf is set up
            var sb = new StringBuilder();
            sb.Append("{");
            sb.AppendFormat("\"name\":{0},", JsonString(obj.name));
            sb.AppendFormat("\"active\":{0},", obj.activeSelf ? "true" : "false");
            sb.AppendFormat("\"tag\":{0},", JsonString(obj.tag));
            sb.AppendFormat("\"layer\":{0},", JsonString(LayerMask.LayerToName(obj.layer)));
            sb.AppendFormat(CultureInfo.InvariantCulture, "\"position\":{{\"x\":{0},\"y\":{1},\"z\":{2}}},", pos.x, pos.y, pos.z);
            sb.AppendFormat(CultureInfo.InvariantCulture, "\"rotation\":{{\"x\":{0},\"y\":{1},\"z\":{2}}},", rot.x, rot.y, rot.z);
            sb.AppendFormat(CultureInfo.InvariantCulture, "\"scale\":{{\"x\":{0},\"y\":{1},\"z\":{2}}},", scale.x, scale.y, scale.z);
            sb.Append("\"components\":[");
            sb.Append(string.Join(",", components.Select(c => JsonString(c))));
            sb.Append("]}");

            return sb.ToString();
        }

        private string JsonString(string s)
        {
            if (s == null) return "null";
            return "\"" + s.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\n", "\\n").Replace("\r", "\\r").Replace("\t", "\\t") + "\"";
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
