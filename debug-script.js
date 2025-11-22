import net from 'net';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

const PIPE_NAME = 'vibelink_unity_pipe';

function getPipePath() {
  if (process.platform === 'win32') {
    return `\\\\.\\pipe\\${PIPE_NAME}`;
  } else {
    return path.join(os.tmpdir(), `CoreFxPipe_${PIPE_NAME}`);
  }
}

async function runDebugScript() {
  const pipePath = getPipePath();
  console.log(`[Debug] Connecting to: ${pipePath}`);

  const socket = net.createConnection(pipePath);

  socket.on('connect', () => {
    console.log('[Debug] Connected!');
    
    // Command to get DataPath
    const msg = {
      id: 'debug_' + Date.now(),
      type: 'request',
      command: 'unity_execute_script',
      payload: JSON.stringify({
        code: 'Application.dataPath'
      }),
      timestamp: Date.now()
    };
    
    console.log('[Debug] Sending:', JSON.stringify(msg));
    socket.write(JSON.stringify(msg) + '\n');
  });

  socket.on('data', (data) => {
    console.log('[Debug] Received:', data.toString());
    socket.end();
  });

  socket.on('error', (err) => console.error('[Debug] Error:', err));
}

runDebugScript();