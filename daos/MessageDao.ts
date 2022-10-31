/**
 * @file Implements DAO managing data storage of messagess. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/messages/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages.
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Sends a message to another user.
     * @param {string} uid The primary key of user sending a message.
     * @param {string} message The body of the message being sent.
     * @param {string} auid The primary key of the user receiving a message.
     * @param {Date} sentOn The date the message was sent.
     * @returns Promise to be returned when a message instance is created in the database.
     * database.
     */
    sendMessage = async (uid: string, message: Message, auid: string): Promise<Message> =>
        MessageModel.create({...message, from: uid, to: auid});

    /**
     * Deletes a message
     * @param {string} uid The primary key of the message getting deleted.
     * @returns Promise to be returned when a message instance is deleted in the database.
     * database.
     */

    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

    /**
     * Views all messages the user has received.
     * @param {string} uid the primary key of the user retreiving the list of users they are following.
     * @returns Promise To be notified when all messages are retrieved from the
     * database
     */

    viewMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid})
            .populate("message")
            .exec();

    /**
     * Views all of the messages the user has sent.
     * @param {string} uid the primary key of the user retreiving the list of messages they sent.
     * @returns Promise To be notified when all messages are retrieved from the
     * database
     */
    viewMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid})
            .populate("message")
            .exec();
};
