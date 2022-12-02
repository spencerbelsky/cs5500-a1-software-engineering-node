/**
 * @file Declares Controller RESTful Web service API for dislikes resource
 */
import {Request, Response} from "express";

export default interface DislikeControllerI {
    userUnDislikesTuit(req: Request, res: Response): void;

    findAllTuitsDislikedByUser(req: Request, res: Response): void;

    userDislikesTuit(req: Request, res: Response): void;

    userTogglesTuitDislikes(req: Request, res: Response): void;
}