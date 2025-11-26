/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const vibelink = $root.vibelink = (() => {

    /**
     * Namespace vibelink.
     * @exports vibelink
     * @namespace
     */
    const vibelink = {};

    vibelink.VibeLinkMessage = (function() {

        /**
         * Properties of a VibeLinkMessage.
         * @memberof vibelink
         * @interface IVibeLinkMessage
         * @property {string|null} [id] VibeLinkMessage id
         * @property {string|null} [type] VibeLinkMessage type
         * @property {string|null} [command] VibeLinkMessage command
         * @property {Uint8Array|null} [payload] VibeLinkMessage payload
         * @property {number|Long|null} [timestamp] VibeLinkMessage timestamp
         */

        /**
         * Constructs a new VibeLinkMessage.
         * @memberof vibelink
         * @classdesc Represents a VibeLinkMessage.
         * @implements IVibeLinkMessage
         * @constructor
         * @param {vibelink.IVibeLinkMessage=} [properties] Properties to set
         */
        function VibeLinkMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VibeLinkMessage id.
         * @member {string} id
         * @memberof vibelink.VibeLinkMessage
         * @instance
         */
        VibeLinkMessage.prototype.id = "";

        /**
         * VibeLinkMessage type.
         * @member {string} type
         * @memberof vibelink.VibeLinkMessage
         * @instance
         */
        VibeLinkMessage.prototype.type = "";

        /**
         * VibeLinkMessage command.
         * @member {string} command
         * @memberof vibelink.VibeLinkMessage
         * @instance
         */
        VibeLinkMessage.prototype.command = "";

        /**
         * VibeLinkMessage payload.
         * @member {Uint8Array} payload
         * @memberof vibelink.VibeLinkMessage
         * @instance
         */
        VibeLinkMessage.prototype.payload = $util.newBuffer([]);

        /**
         * VibeLinkMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof vibelink.VibeLinkMessage
         * @instance
         */
        VibeLinkMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new VibeLinkMessage instance using the specified properties.
         * @function create
         * @memberof vibelink.VibeLinkMessage
         * @static
         * @param {vibelink.IVibeLinkMessage=} [properties] Properties to set
         * @returns {vibelink.VibeLinkMessage} VibeLinkMessage instance
         */
        VibeLinkMessage.create = function create(properties) {
            return new VibeLinkMessage(properties);
        };

        /**
         * Encodes the specified VibeLinkMessage message. Does not implicitly {@link vibelink.VibeLinkMessage.verify|verify} messages.
         * @function encode
         * @memberof vibelink.VibeLinkMessage
         * @static
         * @param {vibelink.IVibeLinkMessage} message VibeLinkMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VibeLinkMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
            if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.command);
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.payload);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified VibeLinkMessage message, length delimited. Does not implicitly {@link vibelink.VibeLinkMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.VibeLinkMessage
         * @static
         * @param {vibelink.IVibeLinkMessage} message VibeLinkMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VibeLinkMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VibeLinkMessage message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.VibeLinkMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.VibeLinkMessage} VibeLinkMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VibeLinkMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.VibeLinkMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.type = reader.string();
                        break;
                    }
                case 3: {
                        message.command = reader.string();
                        break;
                    }
                case 4: {
                        message.payload = reader.bytes();
                        break;
                    }
                case 5: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VibeLinkMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.VibeLinkMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.VibeLinkMessage} VibeLinkMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VibeLinkMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VibeLinkMessage message.
         * @function verify
         * @memberof vibelink.VibeLinkMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VibeLinkMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.command != null && message.hasOwnProperty("command"))
                if (!$util.isString(message.command))
                    return "command: string expected";
            if (message.payload != null && message.hasOwnProperty("payload"))
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a VibeLinkMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.VibeLinkMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.VibeLinkMessage} VibeLinkMessage
         */
        VibeLinkMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.VibeLinkMessage)
                return object;
            let message = new $root.vibelink.VibeLinkMessage();
            if (object.id != null)
                message.id = String(object.id);
            if (object.type != null)
                message.type = String(object.type);
            if (object.command != null)
                message.command = String(object.command);
            if (object.payload != null)
                if (typeof object.payload === "string")
                    $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                else if (object.payload.length >= 0)
                    message.payload = object.payload;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a VibeLinkMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.VibeLinkMessage
         * @static
         * @param {vibelink.VibeLinkMessage} message VibeLinkMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VibeLinkMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.type = "";
                object.command = "";
                if (options.bytes === String)
                    object.payload = "";
                else {
                    object.payload = [];
                    if (options.bytes !== Array)
                        object.payload = $util.newBuffer(object.payload);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.command != null && message.hasOwnProperty("command"))
                object.command = message.command;
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this VibeLinkMessage to JSON.
         * @function toJSON
         * @memberof vibelink.VibeLinkMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VibeLinkMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VibeLinkMessage
         * @function getTypeUrl
         * @memberof vibelink.VibeLinkMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VibeLinkMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.VibeLinkMessage";
        };

        return VibeLinkMessage;
    })();

    vibelink.VibeLinkResponse = (function() {

        /**
         * Properties of a VibeLinkResponse.
         * @memberof vibelink
         * @interface IVibeLinkResponse
         * @property {string|null} [id] VibeLinkResponse id
         * @property {string|null} [type] VibeLinkResponse type
         * @property {boolean|null} [success] VibeLinkResponse success
         * @property {Uint8Array|null} [result] VibeLinkResponse result
         * @property {string|null} [error] VibeLinkResponse error
         * @property {number|Long|null} [timestamp] VibeLinkResponse timestamp
         */

        /**
         * Constructs a new VibeLinkResponse.
         * @memberof vibelink
         * @classdesc Represents a VibeLinkResponse.
         * @implements IVibeLinkResponse
         * @constructor
         * @param {vibelink.IVibeLinkResponse=} [properties] Properties to set
         */
        function VibeLinkResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VibeLinkResponse id.
         * @member {string} id
         * @memberof vibelink.VibeLinkResponse
         * @instance
         */
        VibeLinkResponse.prototype.id = "";

        /**
         * VibeLinkResponse type.
         * @member {string} type
         * @memberof vibelink.VibeLinkResponse
         * @instance
         */
        VibeLinkResponse.prototype.type = "";

        /**
         * VibeLinkResponse success.
         * @member {boolean} success
         * @memberof vibelink.VibeLinkResponse
         * @instance
         */
        VibeLinkResponse.prototype.success = false;

        /**
         * VibeLinkResponse result.
         * @member {Uint8Array} result
         * @memberof vibelink.VibeLinkResponse
         * @instance
         */
        VibeLinkResponse.prototype.result = $util.newBuffer([]);

        /**
         * VibeLinkResponse error.
         * @member {string} error
         * @memberof vibelink.VibeLinkResponse
         * @instance
         */
        VibeLinkResponse.prototype.error = "";

        /**
         * VibeLinkResponse timestamp.
         * @member {number|Long} timestamp
         * @memberof vibelink.VibeLinkResponse
         * @instance
         */
        VibeLinkResponse.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new VibeLinkResponse instance using the specified properties.
         * @function create
         * @memberof vibelink.VibeLinkResponse
         * @static
         * @param {vibelink.IVibeLinkResponse=} [properties] Properties to set
         * @returns {vibelink.VibeLinkResponse} VibeLinkResponse instance
         */
        VibeLinkResponse.create = function create(properties) {
            return new VibeLinkResponse(properties);
        };

        /**
         * Encodes the specified VibeLinkResponse message. Does not implicitly {@link vibelink.VibeLinkResponse.verify|verify} messages.
         * @function encode
         * @memberof vibelink.VibeLinkResponse
         * @static
         * @param {vibelink.IVibeLinkResponse} message VibeLinkResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VibeLinkResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.success);
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.result);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.error);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified VibeLinkResponse message, length delimited. Does not implicitly {@link vibelink.VibeLinkResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.VibeLinkResponse
         * @static
         * @param {vibelink.IVibeLinkResponse} message VibeLinkResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VibeLinkResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VibeLinkResponse message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.VibeLinkResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.VibeLinkResponse} VibeLinkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VibeLinkResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.VibeLinkResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.type = reader.string();
                        break;
                    }
                case 3: {
                        message.success = reader.bool();
                        break;
                    }
                case 4: {
                        message.result = reader.bytes();
                        break;
                    }
                case 5: {
                        message.error = reader.string();
                        break;
                    }
                case 6: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VibeLinkResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.VibeLinkResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.VibeLinkResponse} VibeLinkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VibeLinkResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VibeLinkResponse message.
         * @function verify
         * @memberof vibelink.VibeLinkResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VibeLinkResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.success != null && message.hasOwnProperty("success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            if (message.result != null && message.hasOwnProperty("result"))
                if (!(message.result && typeof message.result.length === "number" || $util.isString(message.result)))
                    return "result: buffer expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isString(message.error))
                    return "error: string expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a VibeLinkResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.VibeLinkResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.VibeLinkResponse} VibeLinkResponse
         */
        VibeLinkResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.VibeLinkResponse)
                return object;
            let message = new $root.vibelink.VibeLinkResponse();
            if (object.id != null)
                message.id = String(object.id);
            if (object.type != null)
                message.type = String(object.type);
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.result != null)
                if (typeof object.result === "string")
                    $util.base64.decode(object.result, message.result = $util.newBuffer($util.base64.length(object.result)), 0);
                else if (object.result.length >= 0)
                    message.result = object.result;
            if (object.error != null)
                message.error = String(object.error);
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a VibeLinkResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.VibeLinkResponse
         * @static
         * @param {vibelink.VibeLinkResponse} message VibeLinkResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VibeLinkResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.type = "";
                object.success = false;
                if (options.bytes === String)
                    object.result = "";
                else {
                    object.result = [];
                    if (options.bytes !== Array)
                        object.result = $util.newBuffer(object.result);
                }
                object.error = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.success != null && message.hasOwnProperty("success"))
                object.success = message.success;
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.bytes === String ? $util.base64.encode(message.result, 0, message.result.length) : options.bytes === Array ? Array.prototype.slice.call(message.result) : message.result;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this VibeLinkResponse to JSON.
         * @function toJSON
         * @memberof vibelink.VibeLinkResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VibeLinkResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VibeLinkResponse
         * @function getTypeUrl
         * @memberof vibelink.VibeLinkResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VibeLinkResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.VibeLinkResponse";
        };

        return VibeLinkResponse;
    })();

    vibelink.CaptureViewPayload = (function() {

        /**
         * Properties of a CaptureViewPayload.
         * @memberof vibelink
         * @interface ICaptureViewPayload
         * @property {string|null} [viewType] CaptureViewPayload viewType
         * @property {string|null} [resolution] CaptureViewPayload resolution
         */

        /**
         * Constructs a new CaptureViewPayload.
         * @memberof vibelink
         * @classdesc Represents a CaptureViewPayload.
         * @implements ICaptureViewPayload
         * @constructor
         * @param {vibelink.ICaptureViewPayload=} [properties] Properties to set
         */
        function CaptureViewPayload(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CaptureViewPayload viewType.
         * @member {string} viewType
         * @memberof vibelink.CaptureViewPayload
         * @instance
         */
        CaptureViewPayload.prototype.viewType = "";

        /**
         * CaptureViewPayload resolution.
         * @member {string} resolution
         * @memberof vibelink.CaptureViewPayload
         * @instance
         */
        CaptureViewPayload.prototype.resolution = "";

        /**
         * Creates a new CaptureViewPayload instance using the specified properties.
         * @function create
         * @memberof vibelink.CaptureViewPayload
         * @static
         * @param {vibelink.ICaptureViewPayload=} [properties] Properties to set
         * @returns {vibelink.CaptureViewPayload} CaptureViewPayload instance
         */
        CaptureViewPayload.create = function create(properties) {
            return new CaptureViewPayload(properties);
        };

        /**
         * Encodes the specified CaptureViewPayload message. Does not implicitly {@link vibelink.CaptureViewPayload.verify|verify} messages.
         * @function encode
         * @memberof vibelink.CaptureViewPayload
         * @static
         * @param {vibelink.ICaptureViewPayload} message CaptureViewPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CaptureViewPayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.viewType != null && Object.hasOwnProperty.call(message, "viewType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.viewType);
            if (message.resolution != null && Object.hasOwnProperty.call(message, "resolution"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.resolution);
            return writer;
        };

        /**
         * Encodes the specified CaptureViewPayload message, length delimited. Does not implicitly {@link vibelink.CaptureViewPayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.CaptureViewPayload
         * @static
         * @param {vibelink.ICaptureViewPayload} message CaptureViewPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CaptureViewPayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CaptureViewPayload message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.CaptureViewPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.CaptureViewPayload} CaptureViewPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CaptureViewPayload.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.CaptureViewPayload();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.viewType = reader.string();
                        break;
                    }
                case 2: {
                        message.resolution = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CaptureViewPayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.CaptureViewPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.CaptureViewPayload} CaptureViewPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CaptureViewPayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CaptureViewPayload message.
         * @function verify
         * @memberof vibelink.CaptureViewPayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CaptureViewPayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.viewType != null && message.hasOwnProperty("viewType"))
                if (!$util.isString(message.viewType))
                    return "viewType: string expected";
            if (message.resolution != null && message.hasOwnProperty("resolution"))
                if (!$util.isString(message.resolution))
                    return "resolution: string expected";
            return null;
        };

        /**
         * Creates a CaptureViewPayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.CaptureViewPayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.CaptureViewPayload} CaptureViewPayload
         */
        CaptureViewPayload.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.CaptureViewPayload)
                return object;
            let message = new $root.vibelink.CaptureViewPayload();
            if (object.viewType != null)
                message.viewType = String(object.viewType);
            if (object.resolution != null)
                message.resolution = String(object.resolution);
            return message;
        };

        /**
         * Creates a plain object from a CaptureViewPayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.CaptureViewPayload
         * @static
         * @param {vibelink.CaptureViewPayload} message CaptureViewPayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CaptureViewPayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.viewType = "";
                object.resolution = "";
            }
            if (message.viewType != null && message.hasOwnProperty("viewType"))
                object.viewType = message.viewType;
            if (message.resolution != null && message.hasOwnProperty("resolution"))
                object.resolution = message.resolution;
            return object;
        };

        /**
         * Converts this CaptureViewPayload to JSON.
         * @function toJSON
         * @memberof vibelink.CaptureViewPayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CaptureViewPayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CaptureViewPayload
         * @function getTypeUrl
         * @memberof vibelink.CaptureViewPayload
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CaptureViewPayload.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.CaptureViewPayload";
        };

        return CaptureViewPayload;
    })();

    vibelink.ExecuteScriptPayload = (function() {

        /**
         * Properties of an ExecuteScriptPayload.
         * @memberof vibelink
         * @interface IExecuteScriptPayload
         * @property {string|null} [code] ExecuteScriptPayload code
         * @property {number|null} [timeout] ExecuteScriptPayload timeout
         */

        /**
         * Constructs a new ExecuteScriptPayload.
         * @memberof vibelink
         * @classdesc Represents an ExecuteScriptPayload.
         * @implements IExecuteScriptPayload
         * @constructor
         * @param {vibelink.IExecuteScriptPayload=} [properties] Properties to set
         */
        function ExecuteScriptPayload(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExecuteScriptPayload code.
         * @member {string} code
         * @memberof vibelink.ExecuteScriptPayload
         * @instance
         */
        ExecuteScriptPayload.prototype.code = "";

        /**
         * ExecuteScriptPayload timeout.
         * @member {number} timeout
         * @memberof vibelink.ExecuteScriptPayload
         * @instance
         */
        ExecuteScriptPayload.prototype.timeout = 0;

        /**
         * Creates a new ExecuteScriptPayload instance using the specified properties.
         * @function create
         * @memberof vibelink.ExecuteScriptPayload
         * @static
         * @param {vibelink.IExecuteScriptPayload=} [properties] Properties to set
         * @returns {vibelink.ExecuteScriptPayload} ExecuteScriptPayload instance
         */
        ExecuteScriptPayload.create = function create(properties) {
            return new ExecuteScriptPayload(properties);
        };

        /**
         * Encodes the specified ExecuteScriptPayload message. Does not implicitly {@link vibelink.ExecuteScriptPayload.verify|verify} messages.
         * @function encode
         * @memberof vibelink.ExecuteScriptPayload
         * @static
         * @param {vibelink.IExecuteScriptPayload} message ExecuteScriptPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExecuteScriptPayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
            if (message.timeout != null && Object.hasOwnProperty.call(message, "timeout"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.timeout);
            return writer;
        };

        /**
         * Encodes the specified ExecuteScriptPayload message, length delimited. Does not implicitly {@link vibelink.ExecuteScriptPayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.ExecuteScriptPayload
         * @static
         * @param {vibelink.IExecuteScriptPayload} message ExecuteScriptPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExecuteScriptPayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExecuteScriptPayload message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.ExecuteScriptPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.ExecuteScriptPayload} ExecuteScriptPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExecuteScriptPayload.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.ExecuteScriptPayload();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.code = reader.string();
                        break;
                    }
                case 2: {
                        message.timeout = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExecuteScriptPayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.ExecuteScriptPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.ExecuteScriptPayload} ExecuteScriptPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExecuteScriptPayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExecuteScriptPayload message.
         * @function verify
         * @memberof vibelink.ExecuteScriptPayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExecuteScriptPayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isString(message.code))
                    return "code: string expected";
            if (message.timeout != null && message.hasOwnProperty("timeout"))
                if (typeof message.timeout !== "number")
                    return "timeout: number expected";
            return null;
        };

        /**
         * Creates an ExecuteScriptPayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.ExecuteScriptPayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.ExecuteScriptPayload} ExecuteScriptPayload
         */
        ExecuteScriptPayload.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.ExecuteScriptPayload)
                return object;
            let message = new $root.vibelink.ExecuteScriptPayload();
            if (object.code != null)
                message.code = String(object.code);
            if (object.timeout != null)
                message.timeout = Number(object.timeout);
            return message;
        };

        /**
         * Creates a plain object from an ExecuteScriptPayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.ExecuteScriptPayload
         * @static
         * @param {vibelink.ExecuteScriptPayload} message ExecuteScriptPayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExecuteScriptPayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = "";
                object.timeout = 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.timeout != null && message.hasOwnProperty("timeout"))
                object.timeout = options.json && !isFinite(message.timeout) ? String(message.timeout) : message.timeout;
            return object;
        };

        /**
         * Converts this ExecuteScriptPayload to JSON.
         * @function toJSON
         * @memberof vibelink.ExecuteScriptPayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExecuteScriptPayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ExecuteScriptPayload
         * @function getTypeUrl
         * @memberof vibelink.ExecuteScriptPayload
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ExecuteScriptPayload.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.ExecuteScriptPayload";
        };

        return ExecuteScriptPayload;
    })();

    vibelink.QueryStatePayload = (function() {

        /**
         * Properties of a QueryStatePayload.
         * @memberof vibelink
         * @interface IQueryStatePayload
         * @property {string|null} [selector] QueryStatePayload selector
         */

        /**
         * Constructs a new QueryStatePayload.
         * @memberof vibelink
         * @classdesc Represents a QueryStatePayload.
         * @implements IQueryStatePayload
         * @constructor
         * @param {vibelink.IQueryStatePayload=} [properties] Properties to set
         */
        function QueryStatePayload(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QueryStatePayload selector.
         * @member {string} selector
         * @memberof vibelink.QueryStatePayload
         * @instance
         */
        QueryStatePayload.prototype.selector = "";

        /**
         * Creates a new QueryStatePayload instance using the specified properties.
         * @function create
         * @memberof vibelink.QueryStatePayload
         * @static
         * @param {vibelink.IQueryStatePayload=} [properties] Properties to set
         * @returns {vibelink.QueryStatePayload} QueryStatePayload instance
         */
        QueryStatePayload.create = function create(properties) {
            return new QueryStatePayload(properties);
        };

        /**
         * Encodes the specified QueryStatePayload message. Does not implicitly {@link vibelink.QueryStatePayload.verify|verify} messages.
         * @function encode
         * @memberof vibelink.QueryStatePayload
         * @static
         * @param {vibelink.IQueryStatePayload} message QueryStatePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QueryStatePayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.selector != null && Object.hasOwnProperty.call(message, "selector"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.selector);
            return writer;
        };

        /**
         * Encodes the specified QueryStatePayload message, length delimited. Does not implicitly {@link vibelink.QueryStatePayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.QueryStatePayload
         * @static
         * @param {vibelink.IQueryStatePayload} message QueryStatePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QueryStatePayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QueryStatePayload message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.QueryStatePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.QueryStatePayload} QueryStatePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QueryStatePayload.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.QueryStatePayload();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.selector = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a QueryStatePayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.QueryStatePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.QueryStatePayload} QueryStatePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QueryStatePayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QueryStatePayload message.
         * @function verify
         * @memberof vibelink.QueryStatePayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QueryStatePayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.selector != null && message.hasOwnProperty("selector"))
                if (!$util.isString(message.selector))
                    return "selector: string expected";
            return null;
        };

        /**
         * Creates a QueryStatePayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.QueryStatePayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.QueryStatePayload} QueryStatePayload
         */
        QueryStatePayload.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.QueryStatePayload)
                return object;
            let message = new $root.vibelink.QueryStatePayload();
            if (object.selector != null)
                message.selector = String(object.selector);
            return message;
        };

        /**
         * Creates a plain object from a QueryStatePayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.QueryStatePayload
         * @static
         * @param {vibelink.QueryStatePayload} message QueryStatePayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QueryStatePayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.selector = "";
            if (message.selector != null && message.hasOwnProperty("selector"))
                object.selector = message.selector;
            return object;
        };

        /**
         * Converts this QueryStatePayload to JSON.
         * @function toJSON
         * @memberof vibelink.QueryStatePayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QueryStatePayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for QueryStatePayload
         * @function getTypeUrl
         * @memberof vibelink.QueryStatePayload
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        QueryStatePayload.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.QueryStatePayload";
        };

        return QueryStatePayload;
    })();

    vibelink.RunPlayModePayload = (function() {

        /**
         * Properties of a RunPlayModePayload.
         * @memberof vibelink
         * @interface IRunPlayModePayload
         * @property {number|null} [duration] RunPlayModePayload duration
         */

        /**
         * Constructs a new RunPlayModePayload.
         * @memberof vibelink
         * @classdesc Represents a RunPlayModePayload.
         * @implements IRunPlayModePayload
         * @constructor
         * @param {vibelink.IRunPlayModePayload=} [properties] Properties to set
         */
        function RunPlayModePayload(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RunPlayModePayload duration.
         * @member {number} duration
         * @memberof vibelink.RunPlayModePayload
         * @instance
         */
        RunPlayModePayload.prototype.duration = 0;

        /**
         * Creates a new RunPlayModePayload instance using the specified properties.
         * @function create
         * @memberof vibelink.RunPlayModePayload
         * @static
         * @param {vibelink.IRunPlayModePayload=} [properties] Properties to set
         * @returns {vibelink.RunPlayModePayload} RunPlayModePayload instance
         */
        RunPlayModePayload.create = function create(properties) {
            return new RunPlayModePayload(properties);
        };

        /**
         * Encodes the specified RunPlayModePayload message. Does not implicitly {@link vibelink.RunPlayModePayload.verify|verify} messages.
         * @function encode
         * @memberof vibelink.RunPlayModePayload
         * @static
         * @param {vibelink.IRunPlayModePayload} message RunPlayModePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RunPlayModePayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.duration);
            return writer;
        };

        /**
         * Encodes the specified RunPlayModePayload message, length delimited. Does not implicitly {@link vibelink.RunPlayModePayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.RunPlayModePayload
         * @static
         * @param {vibelink.IRunPlayModePayload} message RunPlayModePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RunPlayModePayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RunPlayModePayload message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.RunPlayModePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.RunPlayModePayload} RunPlayModePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RunPlayModePayload.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.RunPlayModePayload();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.duration = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RunPlayModePayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.RunPlayModePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.RunPlayModePayload} RunPlayModePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RunPlayModePayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RunPlayModePayload message.
         * @function verify
         * @memberof vibelink.RunPlayModePayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RunPlayModePayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.duration != null && message.hasOwnProperty("duration"))
                if (typeof message.duration !== "number")
                    return "duration: number expected";
            return null;
        };

        /**
         * Creates a RunPlayModePayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.RunPlayModePayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.RunPlayModePayload} RunPlayModePayload
         */
        RunPlayModePayload.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.RunPlayModePayload)
                return object;
            let message = new $root.vibelink.RunPlayModePayload();
            if (object.duration != null)
                message.duration = Number(object.duration);
            return message;
        };

        /**
         * Creates a plain object from a RunPlayModePayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.RunPlayModePayload
         * @static
         * @param {vibelink.RunPlayModePayload} message RunPlayModePayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RunPlayModePayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.duration = 0;
            if (message.duration != null && message.hasOwnProperty("duration"))
                object.duration = options.json && !isFinite(message.duration) ? String(message.duration) : message.duration;
            return object;
        };

        /**
         * Converts this RunPlayModePayload to JSON.
         * @function toJSON
         * @memberof vibelink.RunPlayModePayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RunPlayModePayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RunPlayModePayload
         * @function getTypeUrl
         * @memberof vibelink.RunPlayModePayload
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RunPlayModePayload.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.RunPlayModePayload";
        };

        return RunPlayModePayload;
    })();

    vibelink.CaptureViewResult = (function() {

        /**
         * Properties of a CaptureViewResult.
         * @memberof vibelink
         * @interface ICaptureViewResult
         * @property {string|null} [imagePath] CaptureViewResult imagePath
         * @property {Uint8Array|null} [imageData] CaptureViewResult imageData
         */

        /**
         * Constructs a new CaptureViewResult.
         * @memberof vibelink
         * @classdesc Represents a CaptureViewResult.
         * @implements ICaptureViewResult
         * @constructor
         * @param {vibelink.ICaptureViewResult=} [properties] Properties to set
         */
        function CaptureViewResult(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CaptureViewResult imagePath.
         * @member {string} imagePath
         * @memberof vibelink.CaptureViewResult
         * @instance
         */
        CaptureViewResult.prototype.imagePath = "";

        /**
         * CaptureViewResult imageData.
         * @member {Uint8Array} imageData
         * @memberof vibelink.CaptureViewResult
         * @instance
         */
        CaptureViewResult.prototype.imageData = $util.newBuffer([]);

        /**
         * Creates a new CaptureViewResult instance using the specified properties.
         * @function create
         * @memberof vibelink.CaptureViewResult
         * @static
         * @param {vibelink.ICaptureViewResult=} [properties] Properties to set
         * @returns {vibelink.CaptureViewResult} CaptureViewResult instance
         */
        CaptureViewResult.create = function create(properties) {
            return new CaptureViewResult(properties);
        };

        /**
         * Encodes the specified CaptureViewResult message. Does not implicitly {@link vibelink.CaptureViewResult.verify|verify} messages.
         * @function encode
         * @memberof vibelink.CaptureViewResult
         * @static
         * @param {vibelink.ICaptureViewResult} message CaptureViewResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CaptureViewResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.imagePath != null && Object.hasOwnProperty.call(message, "imagePath"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.imagePath);
            if (message.imageData != null && Object.hasOwnProperty.call(message, "imageData"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.imageData);
            return writer;
        };

        /**
         * Encodes the specified CaptureViewResult message, length delimited. Does not implicitly {@link vibelink.CaptureViewResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.CaptureViewResult
         * @static
         * @param {vibelink.ICaptureViewResult} message CaptureViewResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CaptureViewResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CaptureViewResult message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.CaptureViewResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.CaptureViewResult} CaptureViewResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CaptureViewResult.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.CaptureViewResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.imagePath = reader.string();
                        break;
                    }
                case 2: {
                        message.imageData = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CaptureViewResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.CaptureViewResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.CaptureViewResult} CaptureViewResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CaptureViewResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CaptureViewResult message.
         * @function verify
         * @memberof vibelink.CaptureViewResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CaptureViewResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.imagePath != null && message.hasOwnProperty("imagePath"))
                if (!$util.isString(message.imagePath))
                    return "imagePath: string expected";
            if (message.imageData != null && message.hasOwnProperty("imageData"))
                if (!(message.imageData && typeof message.imageData.length === "number" || $util.isString(message.imageData)))
                    return "imageData: buffer expected";
            return null;
        };

        /**
         * Creates a CaptureViewResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.CaptureViewResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.CaptureViewResult} CaptureViewResult
         */
        CaptureViewResult.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.CaptureViewResult)
                return object;
            let message = new $root.vibelink.CaptureViewResult();
            if (object.imagePath != null)
                message.imagePath = String(object.imagePath);
            if (object.imageData != null)
                if (typeof object.imageData === "string")
                    $util.base64.decode(object.imageData, message.imageData = $util.newBuffer($util.base64.length(object.imageData)), 0);
                else if (object.imageData.length >= 0)
                    message.imageData = object.imageData;
            return message;
        };

        /**
         * Creates a plain object from a CaptureViewResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.CaptureViewResult
         * @static
         * @param {vibelink.CaptureViewResult} message CaptureViewResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CaptureViewResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.imagePath = "";
                if (options.bytes === String)
                    object.imageData = "";
                else {
                    object.imageData = [];
                    if (options.bytes !== Array)
                        object.imageData = $util.newBuffer(object.imageData);
                }
            }
            if (message.imagePath != null && message.hasOwnProperty("imagePath"))
                object.imagePath = message.imagePath;
            if (message.imageData != null && message.hasOwnProperty("imageData"))
                object.imageData = options.bytes === String ? $util.base64.encode(message.imageData, 0, message.imageData.length) : options.bytes === Array ? Array.prototype.slice.call(message.imageData) : message.imageData;
            return object;
        };

        /**
         * Converts this CaptureViewResult to JSON.
         * @function toJSON
         * @memberof vibelink.CaptureViewResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CaptureViewResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CaptureViewResult
         * @function getTypeUrl
         * @memberof vibelink.CaptureViewResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CaptureViewResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.CaptureViewResult";
        };

        return CaptureViewResult;
    })();

    vibelink.ExecuteScriptResult = (function() {

        /**
         * Properties of an ExecuteScriptResult.
         * @memberof vibelink
         * @interface IExecuteScriptResult
         * @property {boolean|null} [success] ExecuteScriptResult success
         * @property {string|null} [output] ExecuteScriptResult output
         * @property {Array.<string>|null} [logs] ExecuteScriptResult logs
         */

        /**
         * Constructs a new ExecuteScriptResult.
         * @memberof vibelink
         * @classdesc Represents an ExecuteScriptResult.
         * @implements IExecuteScriptResult
         * @constructor
         * @param {vibelink.IExecuteScriptResult=} [properties] Properties to set
         */
        function ExecuteScriptResult(properties) {
            this.logs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExecuteScriptResult success.
         * @member {boolean} success
         * @memberof vibelink.ExecuteScriptResult
         * @instance
         */
        ExecuteScriptResult.prototype.success = false;

        /**
         * ExecuteScriptResult output.
         * @member {string} output
         * @memberof vibelink.ExecuteScriptResult
         * @instance
         */
        ExecuteScriptResult.prototype.output = "";

        /**
         * ExecuteScriptResult logs.
         * @member {Array.<string>} logs
         * @memberof vibelink.ExecuteScriptResult
         * @instance
         */
        ExecuteScriptResult.prototype.logs = $util.emptyArray;

        /**
         * Creates a new ExecuteScriptResult instance using the specified properties.
         * @function create
         * @memberof vibelink.ExecuteScriptResult
         * @static
         * @param {vibelink.IExecuteScriptResult=} [properties] Properties to set
         * @returns {vibelink.ExecuteScriptResult} ExecuteScriptResult instance
         */
        ExecuteScriptResult.create = function create(properties) {
            return new ExecuteScriptResult(properties);
        };

        /**
         * Encodes the specified ExecuteScriptResult message. Does not implicitly {@link vibelink.ExecuteScriptResult.verify|verify} messages.
         * @function encode
         * @memberof vibelink.ExecuteScriptResult
         * @static
         * @param {vibelink.IExecuteScriptResult} message ExecuteScriptResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExecuteScriptResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            if (message.output != null && Object.hasOwnProperty.call(message, "output"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.output);
            if (message.logs != null && message.logs.length)
                for (let i = 0; i < message.logs.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.logs[i]);
            return writer;
        };

        /**
         * Encodes the specified ExecuteScriptResult message, length delimited. Does not implicitly {@link vibelink.ExecuteScriptResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.ExecuteScriptResult
         * @static
         * @param {vibelink.IExecuteScriptResult} message ExecuteScriptResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExecuteScriptResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExecuteScriptResult message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.ExecuteScriptResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.ExecuteScriptResult} ExecuteScriptResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExecuteScriptResult.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.ExecuteScriptResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.success = reader.bool();
                        break;
                    }
                case 2: {
                        message.output = reader.string();
                        break;
                    }
                case 3: {
                        if (!(message.logs && message.logs.length))
                            message.logs = [];
                        message.logs.push(reader.string());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExecuteScriptResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.ExecuteScriptResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.ExecuteScriptResult} ExecuteScriptResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExecuteScriptResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExecuteScriptResult message.
         * @function verify
         * @memberof vibelink.ExecuteScriptResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExecuteScriptResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.success != null && message.hasOwnProperty("success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            if (message.output != null && message.hasOwnProperty("output"))
                if (!$util.isString(message.output))
                    return "output: string expected";
            if (message.logs != null && message.hasOwnProperty("logs")) {
                if (!Array.isArray(message.logs))
                    return "logs: array expected";
                for (let i = 0; i < message.logs.length; ++i)
                    if (!$util.isString(message.logs[i]))
                        return "logs: string[] expected";
            }
            return null;
        };

        /**
         * Creates an ExecuteScriptResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.ExecuteScriptResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.ExecuteScriptResult} ExecuteScriptResult
         */
        ExecuteScriptResult.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.ExecuteScriptResult)
                return object;
            let message = new $root.vibelink.ExecuteScriptResult();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.output != null)
                message.output = String(object.output);
            if (object.logs) {
                if (!Array.isArray(object.logs))
                    throw TypeError(".vibelink.ExecuteScriptResult.logs: array expected");
                message.logs = [];
                for (let i = 0; i < object.logs.length; ++i)
                    message.logs[i] = String(object.logs[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from an ExecuteScriptResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.ExecuteScriptResult
         * @static
         * @param {vibelink.ExecuteScriptResult} message ExecuteScriptResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExecuteScriptResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.logs = [];
            if (options.defaults) {
                object.success = false;
                object.output = "";
            }
            if (message.success != null && message.hasOwnProperty("success"))
                object.success = message.success;
            if (message.output != null && message.hasOwnProperty("output"))
                object.output = message.output;
            if (message.logs && message.logs.length) {
                object.logs = [];
                for (let j = 0; j < message.logs.length; ++j)
                    object.logs[j] = message.logs[j];
            }
            return object;
        };

        /**
         * Converts this ExecuteScriptResult to JSON.
         * @function toJSON
         * @memberof vibelink.ExecuteScriptResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExecuteScriptResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ExecuteScriptResult
         * @function getTypeUrl
         * @memberof vibelink.ExecuteScriptResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ExecuteScriptResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.ExecuteScriptResult";
        };

        return ExecuteScriptResult;
    })();

    vibelink.QueryStateResult = (function() {

        /**
         * Properties of a QueryStateResult.
         * @memberof vibelink
         * @interface IQueryStateResult
         * @property {Array.<vibelink.IGameObject>|null} [objects] QueryStateResult objects
         */

        /**
         * Constructs a new QueryStateResult.
         * @memberof vibelink
         * @classdesc Represents a QueryStateResult.
         * @implements IQueryStateResult
         * @constructor
         * @param {vibelink.IQueryStateResult=} [properties] Properties to set
         */
        function QueryStateResult(properties) {
            this.objects = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QueryStateResult objects.
         * @member {Array.<vibelink.IGameObject>} objects
         * @memberof vibelink.QueryStateResult
         * @instance
         */
        QueryStateResult.prototype.objects = $util.emptyArray;

        /**
         * Creates a new QueryStateResult instance using the specified properties.
         * @function create
         * @memberof vibelink.QueryStateResult
         * @static
         * @param {vibelink.IQueryStateResult=} [properties] Properties to set
         * @returns {vibelink.QueryStateResult} QueryStateResult instance
         */
        QueryStateResult.create = function create(properties) {
            return new QueryStateResult(properties);
        };

        /**
         * Encodes the specified QueryStateResult message. Does not implicitly {@link vibelink.QueryStateResult.verify|verify} messages.
         * @function encode
         * @memberof vibelink.QueryStateResult
         * @static
         * @param {vibelink.IQueryStateResult} message QueryStateResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QueryStateResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.objects != null && message.objects.length)
                for (let i = 0; i < message.objects.length; ++i)
                    $root.vibelink.GameObject.encode(message.objects[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified QueryStateResult message, length delimited. Does not implicitly {@link vibelink.QueryStateResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.QueryStateResult
         * @static
         * @param {vibelink.IQueryStateResult} message QueryStateResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QueryStateResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QueryStateResult message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.QueryStateResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.QueryStateResult} QueryStateResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QueryStateResult.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.QueryStateResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.objects && message.objects.length))
                            message.objects = [];
                        message.objects.push($root.vibelink.GameObject.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a QueryStateResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.QueryStateResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.QueryStateResult} QueryStateResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QueryStateResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QueryStateResult message.
         * @function verify
         * @memberof vibelink.QueryStateResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QueryStateResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.objects != null && message.hasOwnProperty("objects")) {
                if (!Array.isArray(message.objects))
                    return "objects: array expected";
                for (let i = 0; i < message.objects.length; ++i) {
                    let error = $root.vibelink.GameObject.verify(message.objects[i]);
                    if (error)
                        return "objects." + error;
                }
            }
            return null;
        };

        /**
         * Creates a QueryStateResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.QueryStateResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.QueryStateResult} QueryStateResult
         */
        QueryStateResult.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.QueryStateResult)
                return object;
            let message = new $root.vibelink.QueryStateResult();
            if (object.objects) {
                if (!Array.isArray(object.objects))
                    throw TypeError(".vibelink.QueryStateResult.objects: array expected");
                message.objects = [];
                for (let i = 0; i < object.objects.length; ++i) {
                    if (typeof object.objects[i] !== "object")
                        throw TypeError(".vibelink.QueryStateResult.objects: object expected");
                    message.objects[i] = $root.vibelink.GameObject.fromObject(object.objects[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a QueryStateResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.QueryStateResult
         * @static
         * @param {vibelink.QueryStateResult} message QueryStateResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QueryStateResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.objects = [];
            if (message.objects && message.objects.length) {
                object.objects = [];
                for (let j = 0; j < message.objects.length; ++j)
                    object.objects[j] = $root.vibelink.GameObject.toObject(message.objects[j], options);
            }
            return object;
        };

        /**
         * Converts this QueryStateResult to JSON.
         * @function toJSON
         * @memberof vibelink.QueryStateResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QueryStateResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for QueryStateResult
         * @function getTypeUrl
         * @memberof vibelink.QueryStateResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        QueryStateResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.QueryStateResult";
        };

        return QueryStateResult;
    })();

    vibelink.RunPlayModeResult = (function() {

        /**
         * Properties of a RunPlayModeResult.
         * @memberof vibelink
         * @interface IRunPlayModeResult
         * @property {Array.<vibelink.ILogEntry>|null} [logs] RunPlayModeResult logs
         * @property {number|null} [duration] RunPlayModeResult duration
         */

        /**
         * Constructs a new RunPlayModeResult.
         * @memberof vibelink
         * @classdesc Represents a RunPlayModeResult.
         * @implements IRunPlayModeResult
         * @constructor
         * @param {vibelink.IRunPlayModeResult=} [properties] Properties to set
         */
        function RunPlayModeResult(properties) {
            this.logs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RunPlayModeResult logs.
         * @member {Array.<vibelink.ILogEntry>} logs
         * @memberof vibelink.RunPlayModeResult
         * @instance
         */
        RunPlayModeResult.prototype.logs = $util.emptyArray;

        /**
         * RunPlayModeResult duration.
         * @member {number} duration
         * @memberof vibelink.RunPlayModeResult
         * @instance
         */
        RunPlayModeResult.prototype.duration = 0;

        /**
         * Creates a new RunPlayModeResult instance using the specified properties.
         * @function create
         * @memberof vibelink.RunPlayModeResult
         * @static
         * @param {vibelink.IRunPlayModeResult=} [properties] Properties to set
         * @returns {vibelink.RunPlayModeResult} RunPlayModeResult instance
         */
        RunPlayModeResult.create = function create(properties) {
            return new RunPlayModeResult(properties);
        };

        /**
         * Encodes the specified RunPlayModeResult message. Does not implicitly {@link vibelink.RunPlayModeResult.verify|verify} messages.
         * @function encode
         * @memberof vibelink.RunPlayModeResult
         * @static
         * @param {vibelink.IRunPlayModeResult} message RunPlayModeResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RunPlayModeResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.logs != null && message.logs.length)
                for (let i = 0; i < message.logs.length; ++i)
                    $root.vibelink.LogEntry.encode(message.logs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.duration);
            return writer;
        };

        /**
         * Encodes the specified RunPlayModeResult message, length delimited. Does not implicitly {@link vibelink.RunPlayModeResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.RunPlayModeResult
         * @static
         * @param {vibelink.IRunPlayModeResult} message RunPlayModeResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RunPlayModeResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RunPlayModeResult message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.RunPlayModeResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.RunPlayModeResult} RunPlayModeResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RunPlayModeResult.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.RunPlayModeResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.logs && message.logs.length))
                            message.logs = [];
                        message.logs.push($root.vibelink.LogEntry.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        message.duration = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RunPlayModeResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.RunPlayModeResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.RunPlayModeResult} RunPlayModeResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RunPlayModeResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RunPlayModeResult message.
         * @function verify
         * @memberof vibelink.RunPlayModeResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RunPlayModeResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.logs != null && message.hasOwnProperty("logs")) {
                if (!Array.isArray(message.logs))
                    return "logs: array expected";
                for (let i = 0; i < message.logs.length; ++i) {
                    let error = $root.vibelink.LogEntry.verify(message.logs[i]);
                    if (error)
                        return "logs." + error;
                }
            }
            if (message.duration != null && message.hasOwnProperty("duration"))
                if (typeof message.duration !== "number")
                    return "duration: number expected";
            return null;
        };

        /**
         * Creates a RunPlayModeResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.RunPlayModeResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.RunPlayModeResult} RunPlayModeResult
         */
        RunPlayModeResult.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.RunPlayModeResult)
                return object;
            let message = new $root.vibelink.RunPlayModeResult();
            if (object.logs) {
                if (!Array.isArray(object.logs))
                    throw TypeError(".vibelink.RunPlayModeResult.logs: array expected");
                message.logs = [];
                for (let i = 0; i < object.logs.length; ++i) {
                    if (typeof object.logs[i] !== "object")
                        throw TypeError(".vibelink.RunPlayModeResult.logs: object expected");
                    message.logs[i] = $root.vibelink.LogEntry.fromObject(object.logs[i]);
                }
            }
            if (object.duration != null)
                message.duration = Number(object.duration);
            return message;
        };

        /**
         * Creates a plain object from a RunPlayModeResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.RunPlayModeResult
         * @static
         * @param {vibelink.RunPlayModeResult} message RunPlayModeResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RunPlayModeResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.logs = [];
            if (options.defaults)
                object.duration = 0;
            if (message.logs && message.logs.length) {
                object.logs = [];
                for (let j = 0; j < message.logs.length; ++j)
                    object.logs[j] = $root.vibelink.LogEntry.toObject(message.logs[j], options);
            }
            if (message.duration != null && message.hasOwnProperty("duration"))
                object.duration = options.json && !isFinite(message.duration) ? String(message.duration) : message.duration;
            return object;
        };

        /**
         * Converts this RunPlayModeResult to JSON.
         * @function toJSON
         * @memberof vibelink.RunPlayModeResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RunPlayModeResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RunPlayModeResult
         * @function getTypeUrl
         * @memberof vibelink.RunPlayModeResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RunPlayModeResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.RunPlayModeResult";
        };

        return RunPlayModeResult;
    })();

    vibelink.Vector3 = (function() {

        /**
         * Properties of a Vector3.
         * @memberof vibelink
         * @interface IVector3
         * @property {number|null} [x] Vector3 x
         * @property {number|null} [y] Vector3 y
         * @property {number|null} [z] Vector3 z
         */

        /**
         * Constructs a new Vector3.
         * @memberof vibelink
         * @classdesc Represents a Vector3.
         * @implements IVector3
         * @constructor
         * @param {vibelink.IVector3=} [properties] Properties to set
         */
        function Vector3(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vector3 x.
         * @member {number} x
         * @memberof vibelink.Vector3
         * @instance
         */
        Vector3.prototype.x = 0;

        /**
         * Vector3 y.
         * @member {number} y
         * @memberof vibelink.Vector3
         * @instance
         */
        Vector3.prototype.y = 0;

        /**
         * Vector3 z.
         * @member {number} z
         * @memberof vibelink.Vector3
         * @instance
         */
        Vector3.prototype.z = 0;

        /**
         * Creates a new Vector3 instance using the specified properties.
         * @function create
         * @memberof vibelink.Vector3
         * @static
         * @param {vibelink.IVector3=} [properties] Properties to set
         * @returns {vibelink.Vector3} Vector3 instance
         */
        Vector3.create = function create(properties) {
            return new Vector3(properties);
        };

        /**
         * Encodes the specified Vector3 message. Does not implicitly {@link vibelink.Vector3.verify|verify} messages.
         * @function encode
         * @memberof vibelink.Vector3
         * @static
         * @param {vibelink.IVector3} message Vector3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector3.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            return writer;
        };

        /**
         * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link vibelink.Vector3.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.Vector3
         * @static
         * @param {vibelink.IVector3} message Vector3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector3.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vector3 message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.Vector3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.Vector3} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector3.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.Vector3();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.float();
                        break;
                    }
                case 2: {
                        message.y = reader.float();
                        break;
                    }
                case 3: {
                        message.z = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Vector3 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.Vector3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.Vector3} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector3.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vector3 message.
         * @function verify
         * @memberof vibelink.Vector3
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vector3.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            return null;
        };

        /**
         * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.Vector3
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.Vector3} Vector3
         */
        Vector3.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.Vector3)
                return object;
            let message = new $root.vibelink.Vector3();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            return message;
        };

        /**
         * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.Vector3
         * @static
         * @param {vibelink.Vector3} message Vector3
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vector3.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            return object;
        };

        /**
         * Converts this Vector3 to JSON.
         * @function toJSON
         * @memberof vibelink.Vector3
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vector3.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Vector3
         * @function getTypeUrl
         * @memberof vibelink.Vector3
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Vector3.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.Vector3";
        };

        return Vector3;
    })();

    vibelink.GameObject = (function() {

        /**
         * Properties of a GameObject.
         * @memberof vibelink
         * @interface IGameObject
         * @property {string|null} [name] GameObject name
         * @property {boolean|null} [active] GameObject active
         * @property {string|null} [tag] GameObject tag
         * @property {string|null} [layer] GameObject layer
         * @property {vibelink.IVector3|null} [position] GameObject position
         * @property {vibelink.IVector3|null} [rotation] GameObject rotation
         * @property {vibelink.IVector3|null} [scale] GameObject scale
         * @property {Array.<string>|null} [components] GameObject components
         * @property {Array.<vibelink.IGameObject>|null} [children] GameObject children
         * @property {Object.<string,vibelink.IPropertyValue>|null} [properties] GameObject properties
         */

        /**
         * Constructs a new GameObject.
         * @memberof vibelink
         * @classdesc Represents a GameObject.
         * @implements IGameObject
         * @constructor
         * @param {vibelink.IGameObject=} [properties] Properties to set
         */
        function GameObject(properties) {
            this.components = [];
            this.children = [];
            this.properties = {};
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameObject name.
         * @member {string} name
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.name = "";

        /**
         * GameObject active.
         * @member {boolean} active
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.active = false;

        /**
         * GameObject tag.
         * @member {string} tag
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.tag = "";

        /**
         * GameObject layer.
         * @member {string} layer
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.layer = "";

        /**
         * GameObject position.
         * @member {vibelink.IVector3|null|undefined} position
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.position = null;

        /**
         * GameObject rotation.
         * @member {vibelink.IVector3|null|undefined} rotation
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.rotation = null;

        /**
         * GameObject scale.
         * @member {vibelink.IVector3|null|undefined} scale
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.scale = null;

        /**
         * GameObject components.
         * @member {Array.<string>} components
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.components = $util.emptyArray;

        /**
         * GameObject children.
         * @member {Array.<vibelink.IGameObject>} children
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.children = $util.emptyArray;

        /**
         * GameObject properties.
         * @member {Object.<string,vibelink.IPropertyValue>} properties
         * @memberof vibelink.GameObject
         * @instance
         */
        GameObject.prototype.properties = $util.emptyObject;

        /**
         * Creates a new GameObject instance using the specified properties.
         * @function create
         * @memberof vibelink.GameObject
         * @static
         * @param {vibelink.IGameObject=} [properties] Properties to set
         * @returns {vibelink.GameObject} GameObject instance
         */
        GameObject.create = function create(properties) {
            return new GameObject(properties);
        };

        /**
         * Encodes the specified GameObject message. Does not implicitly {@link vibelink.GameObject.verify|verify} messages.
         * @function encode
         * @memberof vibelink.GameObject
         * @static
         * @param {vibelink.IGameObject} message GameObject message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameObject.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.active != null && Object.hasOwnProperty.call(message, "active"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.active);
            if (message.tag != null && Object.hasOwnProperty.call(message, "tag"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.tag);
            if (message.layer != null && Object.hasOwnProperty.call(message, "layer"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.layer);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.vibelink.Vector3.encode(message.position, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
                $root.vibelink.Vector3.encode(message.rotation, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.scale != null && Object.hasOwnProperty.call(message, "scale"))
                $root.vibelink.Vector3.encode(message.scale, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.components != null && message.components.length)
                for (let i = 0; i < message.components.length; ++i)
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.components[i]);
            if (message.children != null && message.children.length)
                for (let i = 0; i < message.children.length; ++i)
                    $root.vibelink.GameObject.encode(message.children[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.properties != null && Object.hasOwnProperty.call(message, "properties"))
                for (let keys = Object.keys(message.properties), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 10, wireType 2 =*/82).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.vibelink.PropertyValue.encode(message.properties[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };

        /**
         * Encodes the specified GameObject message, length delimited. Does not implicitly {@link vibelink.GameObject.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.GameObject
         * @static
         * @param {vibelink.IGameObject} message GameObject message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameObject.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameObject message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.GameObject
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.GameObject} GameObject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameObject.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.GameObject(), key, value;
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        message.active = reader.bool();
                        break;
                    }
                case 3: {
                        message.tag = reader.string();
                        break;
                    }
                case 4: {
                        message.layer = reader.string();
                        break;
                    }
                case 5: {
                        message.position = $root.vibelink.Vector3.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.rotation = $root.vibelink.Vector3.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.scale = $root.vibelink.Vector3.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        if (!(message.components && message.components.length))
                            message.components = [];
                        message.components.push(reader.string());
                        break;
                    }
                case 9: {
                        if (!(message.children && message.children.length))
                            message.children = [];
                        message.children.push($root.vibelink.GameObject.decode(reader, reader.uint32()));
                        break;
                    }
                case 10: {
                        if (message.properties === $util.emptyObject)
                            message.properties = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            let tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = $root.vibelink.PropertyValue.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.properties[key] = value;
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameObject message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.GameObject
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.GameObject} GameObject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameObject.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameObject message.
         * @function verify
         * @memberof vibelink.GameObject
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameObject.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.active != null && message.hasOwnProperty("active"))
                if (typeof message.active !== "boolean")
                    return "active: boolean expected";
            if (message.tag != null && message.hasOwnProperty("tag"))
                if (!$util.isString(message.tag))
                    return "tag: string expected";
            if (message.layer != null && message.hasOwnProperty("layer"))
                if (!$util.isString(message.layer))
                    return "layer: string expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.vibelink.Vector3.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.rotation != null && message.hasOwnProperty("rotation")) {
                let error = $root.vibelink.Vector3.verify(message.rotation);
                if (error)
                    return "rotation." + error;
            }
            if (message.scale != null && message.hasOwnProperty("scale")) {
                let error = $root.vibelink.Vector3.verify(message.scale);
                if (error)
                    return "scale." + error;
            }
            if (message.components != null && message.hasOwnProperty("components")) {
                if (!Array.isArray(message.components))
                    return "components: array expected";
                for (let i = 0; i < message.components.length; ++i)
                    if (!$util.isString(message.components[i]))
                        return "components: string[] expected";
            }
            if (message.children != null && message.hasOwnProperty("children")) {
                if (!Array.isArray(message.children))
                    return "children: array expected";
                for (let i = 0; i < message.children.length; ++i) {
                    let error = $root.vibelink.GameObject.verify(message.children[i]);
                    if (error)
                        return "children." + error;
                }
            }
            if (message.properties != null && message.hasOwnProperty("properties")) {
                if (!$util.isObject(message.properties))
                    return "properties: object expected";
                let key = Object.keys(message.properties);
                for (let i = 0; i < key.length; ++i) {
                    let error = $root.vibelink.PropertyValue.verify(message.properties[key[i]]);
                    if (error)
                        return "properties." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameObject message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.GameObject
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.GameObject} GameObject
         */
        GameObject.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.GameObject)
                return object;
            let message = new $root.vibelink.GameObject();
            if (object.name != null)
                message.name = String(object.name);
            if (object.active != null)
                message.active = Boolean(object.active);
            if (object.tag != null)
                message.tag = String(object.tag);
            if (object.layer != null)
                message.layer = String(object.layer);
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".vibelink.GameObject.position: object expected");
                message.position = $root.vibelink.Vector3.fromObject(object.position);
            }
            if (object.rotation != null) {
                if (typeof object.rotation !== "object")
                    throw TypeError(".vibelink.GameObject.rotation: object expected");
                message.rotation = $root.vibelink.Vector3.fromObject(object.rotation);
            }
            if (object.scale != null) {
                if (typeof object.scale !== "object")
                    throw TypeError(".vibelink.GameObject.scale: object expected");
                message.scale = $root.vibelink.Vector3.fromObject(object.scale);
            }
            if (object.components) {
                if (!Array.isArray(object.components))
                    throw TypeError(".vibelink.GameObject.components: array expected");
                message.components = [];
                for (let i = 0; i < object.components.length; ++i)
                    message.components[i] = String(object.components[i]);
            }
            if (object.children) {
                if (!Array.isArray(object.children))
                    throw TypeError(".vibelink.GameObject.children: array expected");
                message.children = [];
                for (let i = 0; i < object.children.length; ++i) {
                    if (typeof object.children[i] !== "object")
                        throw TypeError(".vibelink.GameObject.children: object expected");
                    message.children[i] = $root.vibelink.GameObject.fromObject(object.children[i]);
                }
            }
            if (object.properties) {
                if (typeof object.properties !== "object")
                    throw TypeError(".vibelink.GameObject.properties: object expected");
                message.properties = {};
                for (let keys = Object.keys(object.properties), i = 0; i < keys.length; ++i) {
                    if (typeof object.properties[keys[i]] !== "object")
                        throw TypeError(".vibelink.GameObject.properties: object expected");
                    message.properties[keys[i]] = $root.vibelink.PropertyValue.fromObject(object.properties[keys[i]]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GameObject message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.GameObject
         * @static
         * @param {vibelink.GameObject} message GameObject
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameObject.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.components = [];
                object.children = [];
            }
            if (options.objects || options.defaults)
                object.properties = {};
            if (options.defaults) {
                object.name = "";
                object.active = false;
                object.tag = "";
                object.layer = "";
                object.position = null;
                object.rotation = null;
                object.scale = null;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.active != null && message.hasOwnProperty("active"))
                object.active = message.active;
            if (message.tag != null && message.hasOwnProperty("tag"))
                object.tag = message.tag;
            if (message.layer != null && message.hasOwnProperty("layer"))
                object.layer = message.layer;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.vibelink.Vector3.toObject(message.position, options);
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                object.rotation = $root.vibelink.Vector3.toObject(message.rotation, options);
            if (message.scale != null && message.hasOwnProperty("scale"))
                object.scale = $root.vibelink.Vector3.toObject(message.scale, options);
            if (message.components && message.components.length) {
                object.components = [];
                for (let j = 0; j < message.components.length; ++j)
                    object.components[j] = message.components[j];
            }
            if (message.children && message.children.length) {
                object.children = [];
                for (let j = 0; j < message.children.length; ++j)
                    object.children[j] = $root.vibelink.GameObject.toObject(message.children[j], options);
            }
            let keys2;
            if (message.properties && (keys2 = Object.keys(message.properties)).length) {
                object.properties = {};
                for (let j = 0; j < keys2.length; ++j)
                    object.properties[keys2[j]] = $root.vibelink.PropertyValue.toObject(message.properties[keys2[j]], options);
            }
            return object;
        };

        /**
         * Converts this GameObject to JSON.
         * @function toJSON
         * @memberof vibelink.GameObject
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameObject.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameObject
         * @function getTypeUrl
         * @memberof vibelink.GameObject
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameObject.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.GameObject";
        };

        return GameObject;
    })();

    vibelink.PropertyValue = (function() {

        /**
         * Properties of a PropertyValue.
         * @memberof vibelink
         * @interface IPropertyValue
         * @property {string|null} [stringValue] PropertyValue stringValue
         * @property {number|null} [intValue] PropertyValue intValue
         * @property {number|null} [floatValue] PropertyValue floatValue
         * @property {boolean|null} [boolValue] PropertyValue boolValue
         * @property {vibelink.IVector3|null} [vector3Value] PropertyValue vector3Value
         * @property {Uint8Array|null} [bytesValue] PropertyValue bytesValue
         */

        /**
         * Constructs a new PropertyValue.
         * @memberof vibelink
         * @classdesc Represents a PropertyValue.
         * @implements IPropertyValue
         * @constructor
         * @param {vibelink.IPropertyValue=} [properties] Properties to set
         */
        function PropertyValue(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PropertyValue stringValue.
         * @member {string|null|undefined} stringValue
         * @memberof vibelink.PropertyValue
         * @instance
         */
        PropertyValue.prototype.stringValue = null;

        /**
         * PropertyValue intValue.
         * @member {number|null|undefined} intValue
         * @memberof vibelink.PropertyValue
         * @instance
         */
        PropertyValue.prototype.intValue = null;

        /**
         * PropertyValue floatValue.
         * @member {number|null|undefined} floatValue
         * @memberof vibelink.PropertyValue
         * @instance
         */
        PropertyValue.prototype.floatValue = null;

        /**
         * PropertyValue boolValue.
         * @member {boolean|null|undefined} boolValue
         * @memberof vibelink.PropertyValue
         * @instance
         */
        PropertyValue.prototype.boolValue = null;

        /**
         * PropertyValue vector3Value.
         * @member {vibelink.IVector3|null|undefined} vector3Value
         * @memberof vibelink.PropertyValue
         * @instance
         */
        PropertyValue.prototype.vector3Value = null;

        /**
         * PropertyValue bytesValue.
         * @member {Uint8Array|null|undefined} bytesValue
         * @memberof vibelink.PropertyValue
         * @instance
         */
        PropertyValue.prototype.bytesValue = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * PropertyValue value.
         * @member {"stringValue"|"intValue"|"floatValue"|"boolValue"|"vector3Value"|"bytesValue"|undefined} value
         * @memberof vibelink.PropertyValue
         * @instance
         */
        Object.defineProperty(PropertyValue.prototype, "value", {
            get: $util.oneOfGetter($oneOfFields = ["stringValue", "intValue", "floatValue", "boolValue", "vector3Value", "bytesValue"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PropertyValue instance using the specified properties.
         * @function create
         * @memberof vibelink.PropertyValue
         * @static
         * @param {vibelink.IPropertyValue=} [properties] Properties to set
         * @returns {vibelink.PropertyValue} PropertyValue instance
         */
        PropertyValue.create = function create(properties) {
            return new PropertyValue(properties);
        };

        /**
         * Encodes the specified PropertyValue message. Does not implicitly {@link vibelink.PropertyValue.verify|verify} messages.
         * @function encode
         * @memberof vibelink.PropertyValue
         * @static
         * @param {vibelink.IPropertyValue} message PropertyValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PropertyValue.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringValue);
            if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.intValue);
            if (message.floatValue != null && Object.hasOwnProperty.call(message, "floatValue"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.floatValue);
            if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.boolValue);
            if (message.vector3Value != null && Object.hasOwnProperty.call(message, "vector3Value"))
                $root.vibelink.Vector3.encode(message.vector3Value, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.bytesValue != null && Object.hasOwnProperty.call(message, "bytesValue"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.bytesValue);
            return writer;
        };

        /**
         * Encodes the specified PropertyValue message, length delimited. Does not implicitly {@link vibelink.PropertyValue.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.PropertyValue
         * @static
         * @param {vibelink.IPropertyValue} message PropertyValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PropertyValue.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PropertyValue message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.PropertyValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.PropertyValue} PropertyValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PropertyValue.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.PropertyValue();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.stringValue = reader.string();
                        break;
                    }
                case 2: {
                        message.intValue = reader.int32();
                        break;
                    }
                case 3: {
                        message.floatValue = reader.float();
                        break;
                    }
                case 4: {
                        message.boolValue = reader.bool();
                        break;
                    }
                case 5: {
                        message.vector3Value = $root.vibelink.Vector3.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.bytesValue = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PropertyValue message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.PropertyValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.PropertyValue} PropertyValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PropertyValue.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PropertyValue message.
         * @function verify
         * @memberof vibelink.PropertyValue
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PropertyValue.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                properties.value = 1;
                if (!$util.isString(message.stringValue))
                    return "stringValue: string expected";
            }
            if (message.intValue != null && message.hasOwnProperty("intValue")) {
                if (properties.value === 1)
                    return "value: multiple values";
                properties.value = 1;
                if (!$util.isInteger(message.intValue))
                    return "intValue: integer expected";
            }
            if (message.floatValue != null && message.hasOwnProperty("floatValue")) {
                if (properties.value === 1)
                    return "value: multiple values";
                properties.value = 1;
                if (typeof message.floatValue !== "number")
                    return "floatValue: number expected";
            }
            if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                if (properties.value === 1)
                    return "value: multiple values";
                properties.value = 1;
                if (typeof message.boolValue !== "boolean")
                    return "boolValue: boolean expected";
            }
            if (message.vector3Value != null && message.hasOwnProperty("vector3Value")) {
                if (properties.value === 1)
                    return "value: multiple values";
                properties.value = 1;
                {
                    let error = $root.vibelink.Vector3.verify(message.vector3Value);
                    if (error)
                        return "vector3Value." + error;
                }
            }
            if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                if (properties.value === 1)
                    return "value: multiple values";
                properties.value = 1;
                if (!(message.bytesValue && typeof message.bytesValue.length === "number" || $util.isString(message.bytesValue)))
                    return "bytesValue: buffer expected";
            }
            return null;
        };

        /**
         * Creates a PropertyValue message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.PropertyValue
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.PropertyValue} PropertyValue
         */
        PropertyValue.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.PropertyValue)
                return object;
            let message = new $root.vibelink.PropertyValue();
            if (object.stringValue != null)
                message.stringValue = String(object.stringValue);
            if (object.intValue != null)
                message.intValue = object.intValue | 0;
            if (object.floatValue != null)
                message.floatValue = Number(object.floatValue);
            if (object.boolValue != null)
                message.boolValue = Boolean(object.boolValue);
            if (object.vector3Value != null) {
                if (typeof object.vector3Value !== "object")
                    throw TypeError(".vibelink.PropertyValue.vector3Value: object expected");
                message.vector3Value = $root.vibelink.Vector3.fromObject(object.vector3Value);
            }
            if (object.bytesValue != null)
                if (typeof object.bytesValue === "string")
                    $util.base64.decode(object.bytesValue, message.bytesValue = $util.newBuffer($util.base64.length(object.bytesValue)), 0);
                else if (object.bytesValue.length >= 0)
                    message.bytesValue = object.bytesValue;
            return message;
        };

        /**
         * Creates a plain object from a PropertyValue message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.PropertyValue
         * @static
         * @param {vibelink.PropertyValue} message PropertyValue
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PropertyValue.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                object.stringValue = message.stringValue;
                if (options.oneofs)
                    object.value = "stringValue";
            }
            if (message.intValue != null && message.hasOwnProperty("intValue")) {
                object.intValue = message.intValue;
                if (options.oneofs)
                    object.value = "intValue";
            }
            if (message.floatValue != null && message.hasOwnProperty("floatValue")) {
                object.floatValue = options.json && !isFinite(message.floatValue) ? String(message.floatValue) : message.floatValue;
                if (options.oneofs)
                    object.value = "floatValue";
            }
            if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                object.boolValue = message.boolValue;
                if (options.oneofs)
                    object.value = "boolValue";
            }
            if (message.vector3Value != null && message.hasOwnProperty("vector3Value")) {
                object.vector3Value = $root.vibelink.Vector3.toObject(message.vector3Value, options);
                if (options.oneofs)
                    object.value = "vector3Value";
            }
            if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                object.bytesValue = options.bytes === String ? $util.base64.encode(message.bytesValue, 0, message.bytesValue.length) : options.bytes === Array ? Array.prototype.slice.call(message.bytesValue) : message.bytesValue;
                if (options.oneofs)
                    object.value = "bytesValue";
            }
            return object;
        };

        /**
         * Converts this PropertyValue to JSON.
         * @function toJSON
         * @memberof vibelink.PropertyValue
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PropertyValue.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PropertyValue
         * @function getTypeUrl
         * @memberof vibelink.PropertyValue
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PropertyValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.PropertyValue";
        };

        return PropertyValue;
    })();

    vibelink.LogEntry = (function() {

        /**
         * Properties of a LogEntry.
         * @memberof vibelink
         * @interface ILogEntry
         * @property {vibelink.LogType|null} [type] LogEntry type
         * @property {string|null} [message] LogEntry message
         * @property {string|null} [stackTrace] LogEntry stackTrace
         * @property {number|Long|null} [timestamp] LogEntry timestamp
         */

        /**
         * Constructs a new LogEntry.
         * @memberof vibelink
         * @classdesc Represents a LogEntry.
         * @implements ILogEntry
         * @constructor
         * @param {vibelink.ILogEntry=} [properties] Properties to set
         */
        function LogEntry(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogEntry type.
         * @member {vibelink.LogType} type
         * @memberof vibelink.LogEntry
         * @instance
         */
        LogEntry.prototype.type = 0;

        /**
         * LogEntry message.
         * @member {string} message
         * @memberof vibelink.LogEntry
         * @instance
         */
        LogEntry.prototype.message = "";

        /**
         * LogEntry stackTrace.
         * @member {string} stackTrace
         * @memberof vibelink.LogEntry
         * @instance
         */
        LogEntry.prototype.stackTrace = "";

        /**
         * LogEntry timestamp.
         * @member {number|Long} timestamp
         * @memberof vibelink.LogEntry
         * @instance
         */
        LogEntry.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new LogEntry instance using the specified properties.
         * @function create
         * @memberof vibelink.LogEntry
         * @static
         * @param {vibelink.ILogEntry=} [properties] Properties to set
         * @returns {vibelink.LogEntry} LogEntry instance
         */
        LogEntry.create = function create(properties) {
            return new LogEntry(properties);
        };

        /**
         * Encodes the specified LogEntry message. Does not implicitly {@link vibelink.LogEntry.verify|verify} messages.
         * @function encode
         * @memberof vibelink.LogEntry
         * @static
         * @param {vibelink.ILogEntry} message LogEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogEntry.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.stackTrace != null && Object.hasOwnProperty.call(message, "stackTrace"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.stackTrace);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified LogEntry message, length delimited. Does not implicitly {@link vibelink.LogEntry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof vibelink.LogEntry
         * @static
         * @param {vibelink.ILogEntry} message LogEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogEntry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LogEntry message from the specified reader or buffer.
         * @function decode
         * @memberof vibelink.LogEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vibelink.LogEntry} LogEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogEntry.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.vibelink.LogEntry();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.message = reader.string();
                        break;
                    }
                case 3: {
                        message.stackTrace = reader.string();
                        break;
                    }
                case 4: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LogEntry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof vibelink.LogEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vibelink.LogEntry} LogEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogEntry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogEntry message.
         * @function verify
         * @memberof vibelink.LogEntry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogEntry.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.stackTrace != null && message.hasOwnProperty("stackTrace"))
                if (!$util.isString(message.stackTrace))
                    return "stackTrace: string expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a LogEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof vibelink.LogEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {vibelink.LogEntry} LogEntry
         */
        LogEntry.fromObject = function fromObject(object) {
            if (object instanceof $root.vibelink.LogEntry)
                return object;
            let message = new $root.vibelink.LogEntry();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "LOG_TYPE_UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "LOG_TYPE_LOG":
            case 1:
                message.type = 1;
                break;
            case "LOG_TYPE_WARNING":
            case 2:
                message.type = 2;
                break;
            case "LOG_TYPE_ERROR":
            case 3:
                message.type = 3;
                break;
            case "LOG_TYPE_EXCEPTION":
            case 4:
                message.type = 4;
                break;
            case "LOG_TYPE_ASSERT":
            case 5:
                message.type = 5;
                break;
            }
            if (object.message != null)
                message.message = String(object.message);
            if (object.stackTrace != null)
                message.stackTrace = String(object.stackTrace);
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a LogEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof vibelink.LogEntry
         * @static
         * @param {vibelink.LogEntry} message LogEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogEntry.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "LOG_TYPE_UNKNOWN" : 0;
                object.message = "";
                object.stackTrace = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.vibelink.LogType[message.type] === undefined ? message.type : $root.vibelink.LogType[message.type] : message.type;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.stackTrace != null && message.hasOwnProperty("stackTrace"))
                object.stackTrace = message.stackTrace;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this LogEntry to JSON.
         * @function toJSON
         * @memberof vibelink.LogEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for LogEntry
         * @function getTypeUrl
         * @memberof vibelink.LogEntry
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        LogEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/vibelink.LogEntry";
        };

        return LogEntry;
    })();

    /**
     * LogType enum.
     * @name vibelink.LogType
     * @enum {number}
     * @property {number} LOG_TYPE_UNKNOWN=0 LOG_TYPE_UNKNOWN value
     * @property {number} LOG_TYPE_LOG=1 LOG_TYPE_LOG value
     * @property {number} LOG_TYPE_WARNING=2 LOG_TYPE_WARNING value
     * @property {number} LOG_TYPE_ERROR=3 LOG_TYPE_ERROR value
     * @property {number} LOG_TYPE_EXCEPTION=4 LOG_TYPE_EXCEPTION value
     * @property {number} LOG_TYPE_ASSERT=5 LOG_TYPE_ASSERT value
     */
    vibelink.LogType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "LOG_TYPE_UNKNOWN"] = 0;
        values[valuesById[1] = "LOG_TYPE_LOG"] = 1;
        values[valuesById[2] = "LOG_TYPE_WARNING"] = 2;
        values[valuesById[3] = "LOG_TYPE_ERROR"] = 3;
        values[valuesById[4] = "LOG_TYPE_EXCEPTION"] = 4;
        values[valuesById[5] = "LOG_TYPE_ASSERT"] = 5;
        return values;
    })();

    return vibelink;
})();

export { $root as default };
