#!/bin/bash

echo "🧪 VibeLink Integration Test - After Unity Restart"
echo "=================================================="
echo ""

cd "$(dirname "$0")/mcp-server"

echo "1️⃣ Testing Connection & Ping..."
node -e "
const { VibeLinkClient } = require('./build/vibelink-client.js');
async function test() {
  const client = new VibeLinkClient();
  await client.connect();
  const result = await client.sendCommand('ping', {});
  console.log('✅ Ping:', result);
  await client.disconnect();
}
test().catch(err => { console.error('❌', err.message); process.exit(1); });
"

echo ""
echo "2️⃣ Testing Query State..."
node -e "
const { VibeLinkClient } = require('./build/vibelink-client.js');
async function test() {
  const client = new VibeLinkClient();
  await client.connect();
  const result = await client.sendCommand('unity_query_state', { selector: '*' });
  const count = (result.match(/\"name\"/g) || []).length;
  console.log('✅ Query found', count, 'objects');
  await client.disconnect();
}
test().catch(err => { console.error('❌', err.message); process.exit(1); });
"

echo ""
echo "3️⃣ Testing GameObject Creation..."
node -e "
const { VibeLinkClient } = require('./build/vibelink-client.js');
async function test() {
  const client = new VibeLinkClient();
  await client.connect();
  
  // Create cube
  const createResult = await client.sendCommand('unity_execute_script', {
    code: 'var testCube = GameObject.CreatePrimitive(PrimitiveType.Cube); testCube.name = \"VibeLinkTestCube\"; testCube.transform.position = new Vector3(100, 100, 100);'
  });
  console.log('Create result:', createResult);
  
  // Query for it
  const queryResult = await client.sendCommand('unity_query_state', { selector: 'VibeLinkTestCube' });
  const objects = JSON.parse(queryResult);
  
  if (objects.length > 0) {
    console.log('✅ CREATED:', objects[0].name, 'at', objects[0].position);
  } else {
    console.log('❌ Object not found');
    process.exit(1);
  }
  
  await client.disconnect();
}
test().catch(err => { console.error('❌', err.message); process.exit(1); });
"

echo ""
echo "4️⃣ Running Full Integration Test Suite..."
UNITY_RUNNING=true npm run test:unity

echo ""
echo "=================================================="
echo "✅ All tests complete!"
echo ""
echo "If all tests passed, VibeLink is fully operational! 🎉"
