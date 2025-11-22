#!/usr/bin/env node

/**
 * Simple test script to connect to Unity VibeLink without MCP
 * Run: node test-connection.js
 */

import net from 'net';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

const PIPE_NAME = 'vibelink_unity_pipe';

function getPipePath() {
  if (process.platform === 'win32') {
    return `\\\\.\\pipe\\${PIPE_NAME}`;
  } else {
    // .NET Core creates pipes with CoreFxPipe_ prefix in tmpdir
    return path.join(os.tmpdir(), `CoreFxPipe_${PIPE_NAME}`);
  }
}

async function testConnection() {
  const pipePath = getPipePath();
  
  console.log(`[Test] Attempting to connect to Unity at: ${pipePath}`);
  console.log(`[Test] Platform: ${process.platform}`);
  
  // Check if pipe exists on Unix
  if (process.platform !== 'win32') {
    try {
      await fs.access(pipePath);
      console.log(`[Test] ✓ Pipe file exists!`);
    } catch (err) {
      console.log(`[Test] ✗ Pipe file does NOT exist at ${pipePath}`);
      console.log(`[Test] Make sure Unity VibeLink Host is running!`);
      process.exit(1);
    }
  }

  const socket = net.createConnection(pipePath);

  socket.on('connect', () => {
    console.log('[Test] ✓ Connected to Unity!');
    
    // Send a ping message
    const pingMessage = {
      id: '1',
      type: 'request',
      command: 'ping',
      payload: '{}',
      timestamp: Date.now()
    };
    
    console.log('[Test] Sending ping message...');
    socket.write(JSON.stringify(pingMessage) + '\n');
  });

  socket.on('data', (data) => {
    console.log('[Test] ✓ Received response from Unity:');
    console.log(data.toString());
    
    console.log('\n[Test] SUCCESS! Unity is connected and responding!');
    socket.end();
    process.exit(0);
  });

  socket.on('error', (err) => {
    console.log('[Test] ✗ Connection error:', err.message);
    
    if (err.code === 'ENOENT') {
      console.log('\n[Test] The pipe does not exist. Possible causes:');
      console.log('  1. Unity is not running');
      console.log('  2. VibeLink Host is not started (Tools → VibeLink → Start Host)');
      console.log('  3. Unity failed to create the named pipe');
    } else if (err.code === 'ECONNREFUSED') {
      console.log('\n[Test] Connection refused. Unity may not be listening.');
    }
    
    process.exit(1);
  });

  socket.on('timeout', () => {
    console.log('[Test] ✗ Connection timeout');
    socket.end();
    process.exit(1);
  });

  socket.setTimeout(5000);
}

console.log('=== Unity VibeLink Connection Test ===\n');
testConnection().catch(err => {
  console.error('[Test] Unexpected error:', err);
  process.exit(1);
});
