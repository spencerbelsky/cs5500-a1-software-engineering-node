/**
 * @file Declares Controller RESTful Web service API for follows resource
 */

import {Request, Response} from "express";

export default interface FollowControllerI {
    followUser (req: Request, res: Response): void;
    unfollowUser (req: Request, res: Response): void;
    viewFollowing (req: Request, res: Response): void;
    viewFollowers (req: Request, res: Response): void;
    viewUserFollowing (req: Request, res: Response): void;
    viewUserFollowers (req: Request, res: Response): void;
};