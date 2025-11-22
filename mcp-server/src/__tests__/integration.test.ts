import { VibeLinkClient } from '../vibelink-client.js';
import net from 'net';
import { Server as NetServer } from 'net';

/**
 * Integration tests that test actual pipe communication
 * These tests create a real named pipe server to simulate Unity
 */
describe('VibeLinkClient Integration Tests', () => {
  let mockUnityServer: NetServer;
  let serverSocket: net.Socket | null = null;
  const PIPE_NAME = process.platform === 'win32' 
    ? '\\\\.\\pipe\\vibelink_unity_pipe_test'
    : '/tmp/vibelink_unity_pipe_test';

  beforeEach((done) => {
    // Create a mock Unity server
    mockUnityServer = net.createServer((socket) => {
      serverSocket = socket;
    });

    mockUnityServer.listen(PIPE_NAME, () => {
      done();
    });
  });

  afterEach((done) => {
    if (serverSocket) {
      serverSocket.destroy();
      serverSocket = null;
    }
    mockUnityServer.close(() => {
      done();
    });
  });

  test('should establish real connection', async () => {
    const client = new VibeLinkClient();
    
    // Override pipe name for testing
    (client as any).getPipePath = () => PIPE_NAME;

    await client.connect();

    expect(client.isConnected()).toBe(true);

    await client.disconnect();
  }, 10000);

  test('should send and receive real messages', async () => {
    const client = new VibeLinkClient();
    (client as any).getPipePath = () => PIPE_NAME;

    await client.connect();

    // Set up server to echo responses
    let receivedMessage: any = null;
    serverSocket?.on('data', (data) => {
      receivedMessage = JSON.parse(data.toString().trim());
      
      // Send response
      const response = {
        id: receivedMessage.id,
        type: 'response',
        success: true,
        result: `Echo: ${receivedMessage.command}`,
        timestamp: Date.now(),
      };

      serverSocket?.write(JSON.stringify(response) + '\n');
    });

    const result = await client.sendCommand('test_command', { data: 'test' });

    expect(result).toBe('Echo: test_command');
    expect(receivedMessage.command).toBe('test_command');
    expect(JSON.parse(receivedMessage.payload)).toEqual({ data: 'test' });

    await client.disconnect();
  }, 10000);

  test('should handle multiple sequential commands', async () => {
    const client = new VibeLinkClient();
    (client as any).getPipePath = () => PIPE_NAME;

    await client.connect();

    // Set up server to respond
    serverSocket?.on('data', (data) => {
      const message = JSON.parse(data.toString().trim());
      
      const response = {
        id: message.id,
        success: true,
        result: `Response to ${message.command}`,
      };

      serverSocket?.write(JSON.stringify(response) + '\n');
    });

    const result1 = await client.sendCommand('cmd1', {});
    const result2 = await client.sendCommand('cmd2', {});
    const result3 = await client.sendCommand('cmd3', {});

    expect(result1).toBe('Response to cmd1');
    expect(result2).toBe('Response to cmd2');
    expect(result3).toBe('Response to cmd3');

    await client.disconnect();
  }, 10000);

  test('should handle concurrent commands correctly', async () => {
    const client = new VibeLinkClient();
    (client as any).getPipePath = () => PIPE_NAME;

    await client.connect();

    const receivedCommands: string[] = [];
    let buffer = '';

    // Set up server to respond with delay
    serverSocket?.on('data', (data) => {
      buffer += data.toString();
      
      // Process complete messages
      let newlineIndex;
      while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
        const messageStr = buffer.substring(0, newlineIndex);
        buffer = buffer.substring(newlineIndex + 1);
        
        if (messageStr.trim()) {
          const message = JSON.parse(messageStr);
          receivedCommands.push(message.command);
          
          // Simulate processing delay
          setTimeout(() => {
            const response = {
              id: message.id,
              success: true,
              result: `Result: ${message.command}`,
            };

            serverSocket?.write(JSON.stringify(response) + '\n');
          }, Math.random() * 100);
        }
      }
    });

    // Send multiple commands concurrently
    const promises = [
      client.sendCommand('concurrent1', {}),
      client.sendCommand('concurrent2', {}),
      client.sendCommand('concurrent3', {}),
      client.sendCommand('concurrent4', {}),
    ];

    const results = await Promise.all(promises);

    expect(results).toHaveLength(4);
    expect(results[0]).toBe('Result: concurrent1');
    expect(results[1]).toBe('Result: concurrent2');
    expect(results[2]).toBe('Result: concurrent3');
    expect(results[3]).toBe('Result: concurrent4');

    expect(receivedCommands).toHaveLength(4);

    await client.disconnect();
    
    // Clean up
    buffer = '';
  }, 15000);

  test('should handle server sending error response', async () => {
    const client = new VibeLinkClient();
    (client as any).getPipePath = () => PIPE_NAME;

    await client.connect();

    serverSocket?.on('data', (data) => {
      const message = JSON.parse(data.toString().trim());
      
      const response = {
        id: message.id,
        success: false,
        error: 'Simulated Unity error',
      };

      serverSocket?.write(JSON.stringify(response) + '\n');
    });

    await expect(client.sendCommand('failing_command', {})).rejects.toThrow(
      'Simulated Unity error'
    );

    await client.disconnect();
  }, 10000);

  test('should handle server disconnect during command', async () => {
    const client = new VibeLinkClient();
    (client as any).getPipePath = () => PIPE_NAME;

    await client.connect();

    const commandPromise = client.sendCommand('test', {});

    // Disconnect server before responding
    setTimeout(() => {
      serverSocket?.destroy();
    }, 100);

    await expect(commandPromise).rejects.toThrow('Connection closed');
  }, 10000);

  test('should handle fragmented messages', async () => {
    const client = new VibeLinkClient();
    (client as any).getPipePath = () => PIPE_NAME;

    await client.connect();

    serverSocket?.on('data', (data) => {
      const message = JSON.parse(data.toString().trim());
      
      const response = JSON.stringify({
        id: message.id,
        success: true,
        result: 'large result data'.repeat(100),
      }) + '\n';

      // Send in small chunks to test buffering
      const chunkSize = 50;
      let offset = 0;

      const sendChunk = () => {
        if (offset < response.length) {
          const chunk = response.slice(offset, offset + chunkSize);
          serverSocket?.write(chunk);
          offset += chunkSize;
          setTimeout(sendChunk, 10);
        }
      };

      sendChunk();
    });

    const result = await client.sendCommand('large_response', {});

    expect(result).toBe('large result data'.repeat(100));

    await client.disconnect();
  }, 10000);
});
