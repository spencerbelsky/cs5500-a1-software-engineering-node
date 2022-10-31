/**
 * @file Controller RESTful Web service API for messages resource
 */

import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/messages/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users to create a new user instance</li>
 *     <li>GET /api/users to retrieve all the user instances</li>
 *     <li>GET /api/users/:uid to retrieve an individual user instance </li>
 *     <li>PUT /api/users to modify an individual user instance </li>
 *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            // RESTful User Web service API
            app.post("/api/users/:uid/messages/:auid",
                MessageController.messageController.sendMessage);

            app.delete("/api/messages/:mid",
                MessageController.messageController.deleteMessage);

            app.get("/api/users/:uid/messages",
                MessageController.messageController.viewMessagesSent);

            app.get("/api/messages/:uid",
                MessageController.messageController.viewMessagesReceived);
        }
        return MessageController.messageController;
    }

    constructor() {
    }

    /**
     * Sends a message from one user to another and creates message instance in database.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.sendMessage(req.params.uid,
            req.body,
            req.params.auid)
            .then(message => res.json(message));



    /**
     * Deletes a message sent by a user.
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.json(status));

    /**
     * Views all messages sent by a user
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    viewMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.viewMessagesSent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * View all messages recieved by a user.
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    viewMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.viewMessagesReceived(req.params.uid)
            .then(messages => res.json(messages));

};