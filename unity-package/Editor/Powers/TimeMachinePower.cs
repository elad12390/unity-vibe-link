using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEditor;
using UnityEngine;
using VibeLink.Protocol;

namespace VibeLink.Editor.Powers
{
    /// <summary>
    /// Power 4: The Time Machine - Test Running  
    /// Runs Play Mode tests and captures logs
    /// </summary>
    public class TimeMachinePower : IVibeLinkPower
    {
        private bool _playModeRunning = false;
        private float _playModeTimer = 0;
        private float _playModeDuration = 0;
        private List<string> _playModeLogs = new List<string>();

        public void Initialize()
        {
            // No initialization needed
        }

        public async Task<VibeLinkResponse> Execute(VibeLinkMessage message)
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
    }
}
