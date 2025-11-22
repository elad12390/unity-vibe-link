/**
 * Integration tests for Unity VibeLink connection
 * These tests require Unity to be running with VibeLink Host started
 */

import { VibeLinkClient } from "../vibelink-client.js";

describe("Unity Integration Tests", () => {
  let client: VibeLinkClient;
  const isUnityRunning = process.env.UNITY_RUNNING === "true";

  beforeEach(() => {
    client = new VibeLinkClient();
  });

  afterEach(async () => {
    if (client.isConnected()) {
      await client.disconnect();
    }
  });

  describe("Connection", () => {
    it("should connect to Unity successfully", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running (set UNITY_RUNNING=true to run)");
        return;
      }

      await client.connect();
      expect(client.isConnected()).toBe(true);
    }, 15000);

    it("should handle ping/pong", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      await client.connect();
      const result = await client.sendCommand("ping", {});
      expect(result).toBe("pong");
    }, 15000);

    it("should handle multiple connections", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      const client1 = new VibeLinkClient();
      const client2 = new VibeLinkClient();

      try {
        await client1.connect();
        await client2.connect();

        expect(client1.isConnected()).toBe(true);
        expect(client2.isConnected()).toBe(true);

        const result1 = await client1.sendCommand("ping", {});
        const result2 = await client2.sendCommand("ping", {});

        expect(result1).toBe("pong");
        expect(result2).toBe("pong");
      } finally {
        await client1.disconnect();
        await client2.disconnect();
      }
    }, 20000);

    it("should reconnect after disconnect", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      await client.connect();
      expect(client.isConnected()).toBe(true);

      await client.disconnect();
      expect(client.isConnected()).toBe(false);

      await client.connect();
      expect(client.isConnected()).toBe(true);

      const result = await client.sendCommand("ping", {});
      expect(result).toBe("pong");
    }, 20000);
  });

  describe("Unity Commands", () => {
    beforeEach(async () => {
      if (isUnityRunning) {
        await client.connect();
      }
    });

    it("should execute unity_query_state", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      const result = await client.sendCommand("unity_query_state", {
        selector: "*",
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      
      // Should be valid JSON array
      const parsed = JSON.parse(result);
      expect(Array.isArray(parsed)).toBe(true);
    }, 15000);

    it("should execute unity_execute_script", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      const result = await client.sendCommand("unity_execute_script", {
        code: 'Debug.Log("VibeLink Integration Test");',
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    }, 15000);

    it("should create a test GameObject and query it", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      // Create a test object
      const createCode = `
        var testObj = GameObject.CreatePrimitive(PrimitiveType.Cube);
        testObj.name = "VibeLinkTestCube";
        testObj.transform.position = new Vector3(100, 100, 100);
        Debug.Log("Created VibeLinkTestCube");
      `;

      await client.sendCommand("unity_execute_script", { code: createCode });

      // Query it
      const queryResult = await client.sendCommand("unity_query_state", {
        selector: "VibeLinkTestCube",
      });

      const objects = JSON.parse(queryResult);
      expect(objects.length).toBeGreaterThan(0);
      expect(objects[0].name).toBe("VibeLinkTestCube");

      // Clean up
      const cleanupCode = `
        var testObj = GameObject.Find("VibeLinkTestCube");
        if (testObj != null) {
          GameObject.DestroyImmediate(testObj);
          Debug.Log("Cleaned up VibeLinkTestCube");
        }
      `;
      await client.sendCommand("unity_execute_script", { code: cleanupCode });
    }, 20000);

    it("should handle unity_capture_view", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      const result = await client.sendCommand("unity_capture_view", {
        viewType: "game",
        resolution: "720p",
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toContain(".png");
    }, 15000);

    it("should handle errors gracefully", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      try {
        await client.sendCommand("unity_execute_script", {
          code: "this will cause a syntax error",
        });
        fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 15000);
  });

  describe("Performance", () => {
    beforeEach(async () => {
      if (isUnityRunning) {
        await client.connect();
      }
    });

    it("should handle rapid sequential commands", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(client.sendCommand("ping", {}));
      }

      const results = await Promise.all(promises);
      expect(results).toHaveLength(10);
      results.forEach((result) => {
        expect(result).toBe("pong");
      });
    }, 20000);

    it("should have low latency (< 100ms for ping)", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      const start = Date.now();
      await client.sendCommand("ping", {});
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(100);
      console.log(`✓ Ping latency: ${duration}ms`);
    }, 15000);
  });

  describe("Error Handling", () => {
    it("should timeout if Unity is not running", async () => {
      if (isUnityRunning) {
        console.log("⚠️  Skipping: Unity IS running");
        return;
      }

      await expect(client.connect()).rejects.toThrow(/timeout/i);
    }, 15000);

    it("should reject commands when not connected", async () => {
      await expect(client.sendCommand("ping", {})).rejects.toThrow(
        /not connected/i
      );
    });

    it("should handle unknown commands", async () => {
      if (!isUnityRunning) {
        console.log("⚠️  Skipping: Unity not running");
        return;
      }

      await client.connect();

      try {
        await client.sendCommand("unknown_command", {});
        fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 15000);
  });
});
