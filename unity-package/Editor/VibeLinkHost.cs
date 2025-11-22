using System;
using System.Threading.Tasks;
using UnityEditor;
using UnityEngine;
using VibeLink.Transport;
using VibeLink.Protocol;
using VibeLink.Powers;

namespace VibeLink.Editor
{
    /// <summary>
    /// The main EditorWindow that hosts the VibeLink bridge
    /// Runs on startup and manages communication with AI agents
    /// </summary>
    [InitializeOnLoad]
    public class VibeLinkHost : EditorWindow
    {
        private static VibeLinkHost _instance;
        private VibeLinkTransport _transport;
        private VibeLinkExecutor _executor;
        private bool _isRunning;

        // Initialize on Unity load
        static VibeLinkHost()
        {
            EditorApplication.delayCall += InitializeOnLoad;
        }

        private static void InitializeOnLoad()
        {
            // Auto-start if enabled in settings
            if (VibeLinkSettings.AutoStart)
            {
                GetOrCreateInstance();
                _instance.StartHost();
            }
        }

        [MenuItem("Tools/VibeLink/Start Host")]
        public static void ShowWindow()
        {
            GetOrCreateInstance();
            _instance.StartHost();
        }

        [MenuItem("Tools/VibeLink/Stop Host")]
        public static void StopHost()
        {
            if (_instance != null)
            {
                _instance.Stop();
            }
        }

        private static VibeLinkHost GetOrCreateInstance()
        {
            if (_instance == null)
            {
                _instance = GetWindow<VibeLinkHost>("VibeLink Host");
                _instance.minSize = new Vector2(300, 200);
            }
            return _instance;
        }

        private void OnEnable()
        {
            _instance = this;
            
            // Initialize all Powers
            var eyesPower = new EyesPower();
            var handsPower = new HandsPower();
            var brainPower = new BrainPower();
            var timeMachinePower = new TimeMachinePower();
            
            // Create executor with modular Powers
            _executor = new VibeLinkExecutor(eyesPower, handsPower, brainPower, timeMachinePower);
        }

        private void OnDisable()
        {
            Stop();
        }

        private async void StartHost()
        {
            if (_isRunning)
            {
                Debug.LogWarning("[VibeLink] Host already running");
                return;
            }

            Debug.Log("[VibeLink] Starting host...");
            _isRunning = true;

            // Initialize transport
            _transport = new VibeLinkTransport();
            _transport.OnMessageReceived += HandleMessage;
            _transport.OnClientConnected += () => Debug.Log("[VibeLink] Agent connected!");
            _transport.OnClientDisconnected += () => Debug.LogWarning("[VibeLink] Agent disconnected");
            _transport.OnError += (ex) => Debug.LogError($"[VibeLink] Transport error: {ex.Message}");

            await _transport.StartAsync();
            Repaint();
        }

        private void Stop()
        {
            if (!_isRunning) return;

            Debug.Log("[VibeLink] Stopping host...");
            _isRunning = false;

            _transport?.Dispose();
            _transport = null;
            Repaint();
        }

        private async void HandleMessage(string messageJson)
        {
            try
            {
                VibeLinkMessage message = VibeLinkMessage.FromJson(messageJson);
                Debug.Log($"[VibeLink] Received command: {message.command}");

                VibeLinkResponse response;

                // Handle ping separately, delegate all Powers to executor
                if (message.command == "ping")
                {
                    response = new VibeLinkResponse(message.id, true, "pong");
                }
                else
                {
                    response = await _executor.Execute(message);
                }

                // Send response back
                await _transport.SendMessageAsync(response.ToJson());
            }
            catch (Exception ex)
            {
                Debug.LogError($"[VibeLink] Error handling message: {ex.Message}\n{ex.StackTrace}");
            }
        }

        private void OnGUI()
        {
            GUILayout.Label("VibeLink Host", EditorStyles.boldLabel);
            GUILayout.Space(10);

            GUILayout.Label($"Status: {(_isRunning ? "Running" : "Stopped")}", EditorStyles.label);
            GUILayout.Label($"Connected: {(_transport?.IsConnected ?? false ? "Yes" : "No")}", EditorStyles.label);

            GUILayout.Space(20);

            if (_isRunning)
            {
                if (GUILayout.Button("Stop Host"))
                {
                    Stop();
                }
            }
            else
            {
                if (GUILayout.Button("Start Host"))
                {
                    StartHost();
                }
            }

            GUILayout.Space(10);

            if (GUILayout.Button("Open Settings"))
            {
                VibeLinkSettingsProvider.OpenSettings();
            }
        }
    }

    /// <summary>
    /// Simple settings for VibeLink
    /// </summary>
    public static class VibeLinkSettings
    {
        private const string AUTO_START_KEY = "VibeLink_AutoStart";

        public static bool AutoStart
        {
            get => EditorPrefs.GetBool(AUTO_START_KEY, false);
            set => EditorPrefs.SetBool(AUTO_START_KEY, value);
        }
    }

    /// <summary>
    /// Settings provider for Unity's Project Settings
    /// </summary>
    public class VibeLinkSettingsProvider : SettingsProvider
    {
        public VibeLinkSettingsProvider(string path, SettingsScope scope = SettingsScope.User)
            : base(path, scope) { }

        public override void OnGUI(string searchContext)
        {
            VibeLinkSettings.AutoStart = EditorGUILayout.Toggle("Auto-start on Unity load", VibeLinkSettings.AutoStart);
        }

        [SettingsProvider]
        public static SettingsProvider CreateProvider()
        {
            return new VibeLinkSettingsProvider("Preferences/VibeLink", SettingsScope.User);
        }

        public static void OpenSettings()
        {
            SettingsService.OpenUserPreferences("Preferences/VibeLink");
        }
    }
}
