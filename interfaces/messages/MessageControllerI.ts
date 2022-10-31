/**
 * @file Declares Controller RESTful Web service API for messages resource
 */

import {Request, Response} from "express";

export default interface MessageControllerI {
    sendMessage (req: Request, res: Response): void;
    viewMessagesSent (req: Request, res: Response): void;
    viewMessagesReceived (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
};