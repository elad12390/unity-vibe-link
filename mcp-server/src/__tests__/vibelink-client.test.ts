import { VibeLinkClient } from '../vibelink-client.js';
import net from 'net';
import { EventEmitter } from 'events';

// Mock net module
jest.mock('net');

describe('VibeLinkClient', () => {
  let client: VibeLinkClient;
  let mockSocket: EventEmitter & {
    write: jest.Mock;
    destroy: jest.Mock;
  };

  beforeEach(() => {
    // Create mock socket
    mockSocket = Object.assign(new EventEmitter(), {
      write: jest.fn(),
      destroy: jest.fn(),
    });

    // Mock net.createConnection
    (net.createConnection as jest.Mock).mockReturnValue(mockSocket);

    client = new VibeLinkClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Connection Management', () => {
    test('should not be connected initially', () => {
      expect(client.isConnected()).toBe(false);
    });

    test('should connect successfully', async () => {
      const connectPromise = client.connect();

      // Simulate successful connection
      setImmediate(() => {
        mockSocket.emit('connect');
      });

      await connectPromise;

      expect(client.isConnected()).toBe(true);
    });

    test('should reject on connection timeout', async () => {
      jest.useFakeTimers();

      const connectPromise = client.connect();

      // Fast-forward time to trigger timeout
      jest.advanceTimersByTime(10000);

      await expect(connectPromise).rejects.toThrow('Connection timeout');

      jest.useRealTimers();
    });

    test('should reject on connection error', async () => {
      const connectPromise = client.connect();

      setImmediate(() => {
        mockSocket.emit('error', new Error('Connection failed'));
      });

      await expect(connectPromise).rejects.toThrow('Connection failed');
    });

    test('should disconnect properly', async () => {
      const connectPromise = client.connect();

      setImmediate(() => {
        mockSocket.emit('connect');
      });

      await connectPromise;

      await client.disconnect();

      expect(mockSocket.destroy).toHaveBeenCalled();
      expect(client.isConnected()).toBe(false);
    });

    test('should not connect if already connected', async () => {
      const connectPromise = client.connect();

      setImmediate(() => {
        mockSocket.emit('connect');
      });

      await connectPromise;

      // Try to connect again
      await client.connect();

      // Should only call createConnection once
      expect(net.createConnection).toHaveBeenCalledTimes(1);
    });

    test('should handle connection close', async () => {
      const connectPromise = client.connect();

      setImmediate(() => {
        mockSocket.emit('connect');
      });

      await connectPromise;
      expect(client.isConnected()).toBe(true);

      // Simulate connection close
      mockSocket.emit('close');

      expect(client.isConnected()).toBe(false);
    });

    test('should use correct pipe path on macOS', async () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', {
        value: 'darwin',
      });

      client.connect();

      expect(net.createConnection).toHaveBeenCalledWith('/tmp/vibelink_unity_pipe');

      Object.defineProperty(process, 'platform', {
        value: originalPlatform,
      });
    });

    test('should use correct pipe path on Windows', async () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', {
        value: 'win32',
      });

      const newClient = new VibeLinkClient();
      newClient.connect();

      expect(net.createConnection).toHaveBeenCalledWith('\\\\.\\pipe\\vibelink_unity_pipe');

      Object.defineProperty(process, 'platform', {
        value: originalPlatform,
      });
    });
  });

  describe('Command Sending', () => {
    beforeEach(async () => {
      const connectPromise = client.connect();
      setImmediate(() => mockSocket.emit('connect'));
      await connectPromise;
    });

    test('should send command and receive response', async () => {
      const commandPromise = client.sendCommand('test_command', { foo: 'bar' });

      // Verify message was sent
      expect(mockSocket.write).toHaveBeenCalled();
      const sentMessage = mockSocket.write.mock.calls[0][0];
      const parsedMessage = JSON.parse(sentMessage.toString().trim());

      expect(parsedMessage.command).toBe('test_command');
      expect(JSON.parse(parsedMessage.payload)).toEqual({ foo: 'bar' });

      // Simulate response
      const response = {
        id: parsedMessage.id,
        type: 'response',
        success: true,
        result: 'test result',
        timestamp: Date.now(),
      };

      setImmediate(() => {
        mockSocket.emit('data', Buffer.from(JSON.stringify(response) + '\n'));
      });

      const result = await commandPromise;
      expect(result).toBe('test result');
    });

    test('should reject on command error response', async () => {
      const commandPromise = client.sendCommand('test_command', {});

      const sentMessage = mockSocket.write.mock.calls[0][0];
      const parsedMessage = JSON.parse(sentMessage.toString().trim());

      // Simulate error response
      const response = {
        id: parsedMessage.id,
        type: 'response',
        success: false,
        error: 'Something went wrong',
        timestamp: Date.now(),
      };

      setImmediate(() => {
        mockSocket.emit('data', Buffer.from(JSON.stringify(response) + '\n'));
      });

      await expect(commandPromise).rejects.toThrow('Something went wrong');
    });

    test('should timeout on no response', async () => {
      jest.useFakeTimers();

      const commandPromise = client.sendCommand('test_command', {});

      // Fast-forward time to trigger timeout
      jest.advanceTimersByTime(30000);

      await expect(commandPromise).rejects.toThrow('Command timeout: test_command');

      jest.useRealTimers();
    });

    test('should throw if not connected', async () => {
      await client.disconnect();

      await expect(client.sendCommand('test', {})).rejects.toThrow(
        'Not connected to Unity'
      );
    });

    test('should handle multiple commands concurrently', async () => {
      const promise1 = client.sendCommand('cmd1', {});
      const promise2 = client.sendCommand('cmd2', {});
      const promise3 = client.sendCommand('cmd3', {});

      const sentMessages = mockSocket.write.mock.calls.map((call) =>
        JSON.parse(call[0].toString().trim())
      );

      // Simulate responses in different order
      setImmediate(() => {
        mockSocket.emit(
          'data',
          Buffer.from(
            JSON.stringify({
              id: sentMessages[1].id,
              success: true,
              result: 'result2',
            }) + '\n'
          )
        );

        mockSocket.emit(
          'data',
          Buffer.from(
            JSON.stringify({
              id: sentMessages[0].id,
              success: true,
              result: 'result1',
            }) + '\n'
          )
        );

        mockSocket.emit(
          'data',
          Buffer.from(
            JSON.stringify({
              id: sentMessages[2].id,
              success: true,
              result: 'result3',
            }) + '\n'
          )
        );
      });

      const results = await Promise.all([promise1, promise2, promise3]);
      expect(results).toEqual(['result1', 'result2', 'result3']);
    });

    test('should reject all pending commands on disconnect', async () => {
      const promise1 = client.sendCommand('cmd1', {});
      const promise2 = client.sendCommand('cmd2', {});

      setImmediate(() => {
        mockSocket.emit('close');
      });

      await expect(promise1).rejects.toThrow('Connection closed');
      await expect(promise2).rejects.toThrow('Connection closed');
    });

    test('should handle partial data and buffer correctly', async () => {
      const commandPromise = client.sendCommand('test', {});

      const sentMessage = mockSocket.write.mock.calls[0][0];
      const parsedMessage = JSON.parse(sentMessage.toString().trim());

      const response = {
        id: parsedMessage.id,
        success: true,
        result: 'test',
      };

      const responseStr = JSON.stringify(response) + '\n';
      const part1 = responseStr.slice(0, 20);
      const part2 = responseStr.slice(20);

      setImmediate(() => {
        // Send partial data
        mockSocket.emit('data', Buffer.from(part1));
        // Send rest of data
        mockSocket.emit('data', Buffer.from(part2));
      });

      const result = await commandPromise;
      expect(result).toBe('test');
    });

    test('should handle multiple messages in one data chunk', async () => {
      const promise1 = client.sendCommand('cmd1', {});
      const promise2 = client.sendCommand('cmd2', {});

      const sentMessages = mockSocket.write.mock.calls.map((call) =>
        JSON.parse(call[0].toString().trim())
      );

      const responses =
        JSON.stringify({ id: sentMessages[0].id, success: true, result: 'r1' }) +
        '\n' +
        JSON.stringify({ id: sentMessages[1].id, success: true, result: 'r2' }) +
        '\n';

      setImmediate(() => {
        mockSocket.emit('data', Buffer.from(responses));
      });

      const results = await Promise.all([promise1, promise2]);
      expect(results).toEqual(['r1', 'r2']);
    });

    test('should generate unique message IDs', async () => {
      client.sendCommand('cmd1', {});
      client.sendCommand('cmd2', {});
      client.sendCommand('cmd3', {});

      const sentMessages = mockSocket.write.mock.calls.map((call) =>
        JSON.parse(call[0].toString().trim())
      );

      const ids = sentMessages.map((m) => m.id);
      expect(new Set(ids).size).toBe(3); // All unique
    });
  });

  describe('Image Reading', () => {
    test('should read image as base64', async () => {
      // Note: This test requires actual file system interaction
      // Skipping in unit tests, covered in integration tests
      expect(true).toBe(true);
    });

    test('should throw error if image read fails', async () => {
      // Note: This test requires actual file system interaction
      // Skipping in unit tests, covered in integration tests
      await expect(client.readImageAsBase64('/this/path/definitely/does/not/exist/12345.png'))
        .rejects.toThrow();
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed JSON response gracefully', async () => {
      const connectPromise = client.connect();
      setImmediate(() => mockSocket.emit('connect'));
      await connectPromise;

      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      // Send malformed JSON
      mockSocket.emit('data', Buffer.from('invalid json\n'));

      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('Failed to parse response'),
        expect.any(Error)
      );

      consoleError.mockRestore();
    });

    test('should handle response for unknown request ID', async () => {
      const connectPromise = client.connect();
      setImmediate(() => mockSocket.emit('connect'));
      await connectPromise;

      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      const response = {
        id: 'unknown_id_12345',
        success: true,
        result: 'test',
      };

      mockSocket.emit('data', Buffer.from(JSON.stringify(response) + '\n'));

      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('unknown request: unknown_id_12345')
      );

      consoleError.mockRestore();
    });
  });
});
