using System;
using System.Collections.Concurrent;
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
    /// Supports multiple concurrent MCP connections
    /// </summary>
    public class VibeLinkTransport : IDisposable
    {
        private const string PIPE_NAME = "vibelink_unity_pipe";
        private const int MAX_CONNECTIONS = 10; // Support up to 10 MCP servers
        
        private class ClientConnection
        {
            public NamedPipeServerStream Pipe;
            public StreamReader Reader;
            public StreamWriter Writer;
            public Task ListenTask;
        }

        private ConcurrentBag<ClientConnection> _clients = new ConcurrentBag<ClientConnection>();
        private CancellationTokenSource _cts;
        private Task _acceptTask;
        private bool _isRunning;
        private int _activeConnections = 0;

        public event Action<string> OnMessageReceived;
        public event Action<Exception> OnError;
        public event Action OnClientConnected;
        public event Action OnClientDisconnected;

        public bool IsConnected => _activeConnections > 0;
        public int ActiveConnections => _activeConnections;

        public async Task StartAsync()
        {
            if (_isRunning)
            {
                Debug.LogWarning("[VibeLink] Transport already running");
                return;
            }

            _isRunning = true;
            _cts = new CancellationTokenSource();

            Debug.Log($"[VibeLink] Server started on pipe: {PIPE_NAME} (supporting up to {MAX_CONNECTIONS} connections)");

            // Start accepting connections in a loop
            _acceptTask = Task.Run(AcceptConnectionsLoop, _cts.Token);
        }

        private async Task AcceptConnectionsLoop()
        {
            while (_isRunning && !_cts.Token.IsCancellationRequested)
            {
                try
                {
                    // Create a new pipe server for this connection
                    var pipeServer = new NamedPipeServerStream(
                        PIPE_NAME,
                        PipeDirection.InOut,
                        MAX_CONNECTIONS,
                        PipeTransmissionMode.Byte, // Use Byte mode for macOS compatibility
                        PipeOptions.Asynchronous
                    );

                    Debug.Log($"[VibeLink] Waiting for MCP client connection... (active: {_activeConnections})");

                    // Wait for client connection
                    await pipeServer.WaitForConnectionAsync(_cts.Token);

                    Interlocked.Increment(ref _activeConnections);
                    Debug.Log($"[VibeLink] MCP client connected! (total connections: {_activeConnections})");

                    // Create client connection object
                    var client = new ClientConnection
                    {
                        Pipe = pipeServer,
                        Reader = new StreamReader(pipeServer, Encoding.UTF8),
                        Writer = new StreamWriter(pipeServer, Encoding.UTF8) { AutoFlush = true }
                    };

                    _clients.Add(client);
                    OnClientConnected?.Invoke();

                    // Handle this client in a separate task
                    client.ListenTask = Task.Run(() => HandleClient(client), _cts.Token);
                }
                catch (Exception ex)
                {
                    if (_isRunning) // Only log if we didn't intentionally stop
                    {
                        Debug.LogError($"[VibeLink] Failed to accept connection: {ex.Message}");
                        OnError?.Invoke(ex);
                    }
                }
            }
        }

        private async Task HandleClient(ClientConnection client)
        {
            try
            {
                // Listen for messages from this client
                while (_isRunning && client.Pipe.IsConnected && !_cts.Token.IsCancellationRequested)
                {
                    string message = await client.Reader.ReadLineAsync();
                    if (!string.IsNullOrEmpty(message))
                    {
                        OnMessageReceived?.Invoke(message);
                    }
                }
            }
            catch (Exception ex)
            {
                if (_isRunning)
                {
                    Debug.LogError($"[VibeLink] Client handler error: {ex.Message}");
                }
            }
            finally
            {
                Interlocked.Decrement(ref _activeConnections);
                Debug.Log($"[VibeLink] Client disconnected (remaining: {_activeConnections})");
                OnClientDisconnected?.Invoke();

                client.Reader?.Dispose();
                client.Writer?.Dispose();
                client.Pipe?.Dispose();
            }
        }

        public async Task SendMessageAsync(string message)
        {
            if (_activeConnections == 0)
            {
                Debug.LogWarning("[VibeLink] Cannot send message - no clients connected");
                return;
            }

            // Broadcast message to ALL connected clients
            foreach (var client in _clients)
            {
                if (client.Pipe?.IsConnected == true)
                {
                    try
                    {
                        await client.Writer.WriteLineAsync(message);
                    }
                    catch (Exception ex)
                    {
                        Debug.LogError($"[VibeLink] Failed to send message to client: {ex.Message}");
                    }
                }
            }
        }

        public void Stop()
        {
            if (!_isRunning) return;

            _isRunning = false;
            _cts?.Cancel();

            // Dispose all client connections
            foreach (var client in _clients)
            {
                client.Reader?.Dispose();
                client.Writer?.Dispose();
                client.Pipe?.Dispose();
            }

            _clients = new ConcurrentBag<ClientConnection>();
            _activeConnections = 0;

            Debug.Log("[VibeLink] Transport stopped");
        }

        public void Dispose()
        {
            Stop();
            _cts?.Dispose();
        }
    }
}
