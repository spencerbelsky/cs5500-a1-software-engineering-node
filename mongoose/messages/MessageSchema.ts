/**
 * @file Implements mongoose schema for messages.
 */

import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents Message's relationship between one user and another user
 * @property {ObjectId} to the user that received a message.
 * @property {ObjectId} from the user that sent a message.
 * @property {ObjectId} sentOn the date the message was sent.
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now()},
}, {collection: "messages"});
export default MessageSchema;