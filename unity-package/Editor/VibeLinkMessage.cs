using System;
using UnityEngine;

namespace VibeLink.Protocol
{
    [Serializable]
    public class VibeLinkMessage
    {
        public string id;
        public string type;
        public string command;
        public string payload;
        public long timestamp;

        public VibeLinkMessage(string command, string payload)
        {
            this.id = Guid.NewGuid().ToString();
            this.type = "request";
            this.command = command;
            this.payload = payload;
            this.timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        public string ToJson()
        {
            return JsonUtility.ToJson(this);
        }

        public static VibeLinkMessage FromJson(string json)
        {
            return JsonUtility.FromJson<VibeLinkMessage>(json);
        }
    }

    [Serializable]
    public class VibeLinkResponse
    {
        public string id;
        public string type = "response";
        public bool success;
        public string result;
        public string error;
        public long timestamp;

        public VibeLinkResponse(string requestId, bool success, string result = null, string error = null)
        {
            this.id = requestId;
            this.success = success;
            this.result = result;
            this.error = error;
            this.timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        public string ToJson()
        {
            return JsonUtility.ToJson(this);
        }
    }

    // Payload types for specific commands
    [Serializable]
    public class CaptureViewPayload
    {
        public string viewType; // "game" or "scene"
        public string resolution; // "720p", "1080p", etc.
    }

    [Serializable]
    public class ExecuteScriptPayload
    {
        public string code;
        public float timeout = 5.0f;
    }

    [Serializable]
    public class QueryStatePayload
    {
        public string selector;
    }

    [Serializable]
    public class RunPlayModePayload
    {
        public float duration;
    }
}
