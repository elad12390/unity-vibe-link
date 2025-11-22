using NUnit.Framework;
using VibeLink.Protocol;
using UnityEngine;

namespace VibeLink.Tests
{
    [TestFixture]
    public class VibeLinkMessageTests
    {
        [Test]
        public void VibeLinkMessage_Constructor_SetsPropertiesCorrectly()
        {
            // Arrange & Act
            var message = new VibeLinkMessage("test_command", "{\"data\":\"value\"}");

            // Assert
            Assert.IsNotNull(message.id);
            Assert.AreEqual("request", message.type);
            Assert.AreEqual("test_command", message.command);
            Assert.AreEqual("{\"data\":\"value\"}", message.payload);
            Assert.Greater(message.timestamp, 0);
        }

        [Test]
        public void VibeLinkMessage_GeneratesUniqueIds()
        {
            // Arrange & Act
            var message1 = new VibeLinkMessage("cmd1", "{}");
            var message2 = new VibeLinkMessage("cmd2", "{}");
            var message3 = new VibeLinkMessage("cmd3", "{}");

            // Assert
            Assert.AreNotEqual(message1.id, message2.id);
            Assert.AreNotEqual(message2.id, message3.id);
            Assert.AreNotEqual(message1.id, message3.id);
        }

        [Test]
        public void VibeLinkMessage_ToJson_CreatesValidJson()
        {
            // Arrange
            var message = new VibeLinkMessage("test", "{}");

            // Act
            string json = message.ToJson();

            // Assert
            Assert.IsNotNull(json);
            Assert.IsTrue(json.Contains("test"));
            Assert.IsTrue(json.Contains("request"));
        }

        [Test]
        public void VibeLinkMessage_FromJson_DeserializesCorrectly()
        {
            // Arrange
            var original = new VibeLinkMessage("test_cmd", "{\"foo\":\"bar\"}");
            string json = original.ToJson();

            // Act
            var deserialized = VibeLinkMessage.FromJson(json);

            // Assert
            Assert.AreEqual(original.id, deserialized.id);
            Assert.AreEqual(original.command, deserialized.command);
            Assert.AreEqual(original.payload, deserialized.payload);
            Assert.AreEqual(original.type, deserialized.type);
        }

        [Test]
        public void VibeLinkResponse_Constructor_SetsPropertiesCorrectly()
        {
            // Arrange & Act
            var response = new VibeLinkResponse("msg-123", true, "success result", null);

            // Assert
            Assert.AreEqual("msg-123", response.id);
            Assert.AreEqual("response", response.type);
            Assert.IsTrue(response.success);
            Assert.AreEqual("success result", response.result);
            Assert.IsNull(response.error);
            Assert.Greater(response.timestamp, 0);
        }

        [Test]
        public void VibeLinkResponse_ErrorResponse_SetsErrorCorrectly()
        {
            // Arrange & Act
            var response = new VibeLinkResponse("msg-456", false, null, "Error message");

            // Assert
            Assert.AreEqual("msg-456", response.id);
            Assert.IsFalse(response.success);
            Assert.IsNull(response.result);
            Assert.AreEqual("Error message", response.error);
        }

        [Test]
        public void VibeLinkResponse_ToJson_CreatesValidJson()
        {
            // Arrange
            var response = new VibeLinkResponse("test-id", true, "test result");

            // Act
            string json = response.ToJson();

            // Assert
            Assert.IsNotNull(json);
            Assert.IsTrue(json.Contains("test-id"));
            Assert.IsTrue(json.Contains("test result"));
            Assert.IsTrue(json.Contains("response"));
        }

        [Test]
        public void CaptureViewPayload_CanBeSerialized()
        {
            // Arrange
            var payload = new CaptureViewPayload
            {
                viewType = "game",
                resolution = "1080p"
            };

            // Act
            string json = JsonUtility.ToJson(payload);
            var deserialized = JsonUtility.FromJson<CaptureViewPayload>(json);

            // Assert
            Assert.AreEqual("game", deserialized.viewType);
            Assert.AreEqual("1080p", deserialized.resolution);
        }

        [Test]
        public void ExecuteScriptPayload_CanBeSerialized()
        {
            // Arrange
            var payload = new ExecuteScriptPayload
            {
                code = "Debug.Log(\"test\");",
                timeout = 10.0f
            };

            // Act
            string json = JsonUtility.ToJson(payload);
            var deserialized = JsonUtility.FromJson<ExecuteScriptPayload>(json);

            // Assert
            Assert.AreEqual("Debug.Log(\"test\");", deserialized.code);
            Assert.AreEqual(10.0f, deserialized.timeout);
        }

        [Test]
        public void ExecuteScriptPayload_DefaultTimeout()
        {
            // Arrange
            var payload = new ExecuteScriptPayload
            {
                code = "test"
            };

            // Assert
            Assert.AreEqual(5.0f, payload.timeout);
        }

        [Test]
        public void QueryStatePayload_CanBeSerialized()
        {
            // Arrange
            var payload = new QueryStatePayload
            {
                selector = "Player > Gun"
            };

            // Act
            string json = JsonUtility.ToJson(payload);
            var deserialized = JsonUtility.FromJson<QueryStatePayload>(json);

            // Assert
            Assert.AreEqual("Player > Gun", deserialized.selector);
        }

        [Test]
        public void RunPlayModePayload_CanBeSerialized()
        {
            // Arrange
            var payload = new RunPlayModePayload
            {
                duration = 5.5f
            };

            // Act
            string json = JsonUtility.ToJson(payload);
            var deserialized = JsonUtility.FromJson<RunPlayModePayload>(json);

            // Assert
            Assert.AreEqual(5.5f, deserialized.duration);
        }

        [Test]
        public void RoundTrip_MessageAndResponse_PreservesData()
        {
            // Arrange
            var message = new VibeLinkMessage("complex_cmd", "{\"nested\":{\"value\":123}}");
            
            // Act - Simulate serialization/deserialization cycle
            string messageJson = message.ToJson();
            var deserializedMessage = VibeLinkMessage.FromJson(messageJson);

            var response = new VibeLinkResponse(deserializedMessage.id, true, "result data");
            string responseJson = response.ToJson();

            // Assert
            Assert.AreEqual(message.id, deserializedMessage.id);
            Assert.AreEqual(message.command, deserializedMessage.command);
            Assert.IsTrue(responseJson.Contains(message.id));
        }
    }
}
