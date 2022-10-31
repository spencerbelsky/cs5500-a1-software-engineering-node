/**
 * @file Implements mongoose model to CRUD
 * documents in the messages colllection.
 */
import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";
const MessageModel = mongoose.model("MessageModel", MessageSchema);
export default MessageModel;