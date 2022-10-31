/**
 * @file Declares API for Messages related data access object methods.
 */
import Message from "../../models/messages/Message";

export default interface MessageDaoI {
    sendMessage(uid: string, message: Message, auid: string): Promise<Message>;
    viewMessagesSent (uid: string): Promise<Message[]>;
    viewMessagesReceived (uid:string): Promise<Message[]>;
    deleteMessage (mid:string): Promise<any>;
};