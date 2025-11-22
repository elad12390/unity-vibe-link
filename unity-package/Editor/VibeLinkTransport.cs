using System;
using System.IO;
using System.IO.Pipes;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;

namespace VibeLink.Transport
{
    /// <summary>
    /// Named Pipe transport layer for low-latency communication with MCP server
    /// Uses .NET Standard 2.1 pipes (Unity 2021.3+)
    /// </summary>
    public class VibeLinkTransport : IDisposable
    {
        private const string PIPE_NAME = "vibelink_unity_pipe";
        private NamedPipeServerStream _pipeServer;
        private StreamReader _reader;
        private StreamWriter _writer;
        private CancellationTokenSource _cts;
        private Task _listenTask;
        private bool _isRunning;

        public event Action<string> OnMessageReceived;
        public event Action<Exception> OnError;
        public event Action OnClientConnected;
        public event Action OnClientDisconnected;

        public bool IsConnected => _pipeServer?.IsConnected ?? false;

        public async Task StartAsync()
        {
            if (_isRunning)
            {
                Debug.LogWarning("[VibeLink] Transport already running");
                return;
            }

            _isRunning = true;
            _cts = new CancellationTokenSource();

            try
            {
                // Create named pipe server
                _pipeServer = new NamedPipeServerStream(
                    PIPE_NAME,
                    PipeDirection.InOut,
                    1, // Max 1 connection
                    PipeTransmissionMode.Message,
                    PipeOptions.Asynchronous
                );

                Debug.Log($"[VibeLink] Waiting for MCP client connection on pipe: {PIPE_NAME}");

                // Wait for client connection
                await _pipeServer.WaitForConnectionAsync(_cts.Token);

                Debug.Log("[VibeLink] MCP client connected!");

                // Initialize readers/writers
                _reader = new StreamReader(_pipeServer, Encoding.UTF8);
                _writer = new StreamWriter(_pipeServer, Encoding.UTF8) { AutoFlush = true };

                OnClientConnected?.Invoke();

                // Start listening for messages
                _listenTask = Task.Run(ListenLoop, _cts.Token);
            }
            catch (Exception ex)
            {
                Debug.LogError($"[VibeLink] Failed to start transport: {ex.Message}");
                OnError?.Invoke(ex);
                _isRunning = false;
            }
        }

        private async Task ListenLoop()
        {
            try
            {
                while (_isRunning && !_cts.Token.IsCancellationRequested)
                {
                    if (_pipeServer.IsConnected)
                    {
                        string message = await _reader.ReadLineAsync();
                        if (!string.IsNullOrEmpty(message))
                        {
                            OnMessageReceived?.Invoke(message);
                        }
                    }
                    else
                    {
                        Debug.LogWarning("[VibeLink] Client disconnected");
                        OnClientDisconnected?.Invoke();
                        break;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_isRunning) // Only log if we didn't intentionally stop
                {
                    Debug.LogError($"[VibeLink] Listen loop error: {ex.Message}");
                    OnError?.Invoke(ex);
                }
            }
        }

        public async Task SendMessageAsync(string message)
        {
            if (!IsConnected)
            {
                Debug.LogWarning("[VibeLink] Cannot send message - not connected");
                return;
            }

            try
            {
                await _writer.WriteLineAsync(message);
            }
            catch (Exception ex)
            {
                Debug.LogError($"[VibeLink] Failed to send message: {ex.Message}");
                OnError?.Invoke(ex);
            }
        }

        public void Stop()
        {
            if (!_isRunning) return;

            _isRunning = false;
            _cts?.Cancel();

            _reader?.Dispose();
            _writer?.Dispose();
            _pipeServer?.Dispose();

            Debug.Log("[VibeLink] Transport stopped");
        }

        public void Dispose()
        {
            Stop();
            _cts?.Dispose();
        }
    }
}
