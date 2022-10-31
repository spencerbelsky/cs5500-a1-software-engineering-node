/**
 * @file Controller RESTful Web service API for follows resource.
 */

import {Request, Response, Express} from "express";
import Follow from "../models/follows/Follow";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/follows/FollowControllerI";
import {stat} from "fs";

/**
 * @class FollowController Implements RESTful Web service API for Follow
 * resource.
 * Defines the following HTTP endpoints:
 *         POST /api/users/:uid/bookmarks/:tid to create a bookmark of a tuit by a user.
 *         DEL /api/users/:uid/bookmarks/:tid to delete a bookmark of a tuit by a user.
 *         GET /api/bookmarks to retrieve all bookmarks saved.
 *         GET /api/users/:uid/bookmarks to retrieve all bookmarks of a specific user.
 * @property {FollowDao} followDao Singleton DAO implementing bookmarks CRUD
 * operations
 * @property {FollowController} FollowController Singleton controller
 * implementing RESTful Web service API
 */

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:auid", FollowController.followController.followUser);
            app.delete("/api/users/:uid/follows/:auid", FollowController.followController.unfollowUser);
            app.get("/api/users/:uid/following", FollowController.followController.viewFollowing);
            app.get("/api/users/:uid/followers", FollowController.followController.viewFollowers);
            app.get("/api/users/:uid/following", FollowController.followController.viewUserFollowers);
            app.get("/api/users/:uid/followers", FollowController.followController.viewUserFollowing);
        }
        return FollowController.followController;
    }
    private constructor() {
    }

    /**
     * Creates a new follow instance between one user and another user.
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new bookmark to be inserted in the database.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark relationship that was inserted in the database.
     */
    followUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(
            req.params.uid,
            req.params.auid
        ).then(follow => res.json(follow));

    /**
     * Removes a follow instance from the database.
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user un-bookmarking and
     * tid identifying the primary key of the tuit being un-bookmarked.
     * @param {Response} res Represents response to client, including status
     * on whether deleting the relationship of a bookmark between a user and a tuit.
     */
    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(
            req.params.uid,
            req.params.auid
        ).then(status => res.send(status));


    /**
     * Retrieves all followers a user has and returns an array of
     * bookmarks
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    viewFollowing = (req: Request, res: Response) =>
        FollowController.followDao.viewFollowing(req.params.uid)
            .then((follows: Follow[]) => res.json(follows));

    /**
     * Retrieves all of the users current followers and returns an array of followers.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    viewFollowers = (req: Request, res: Response) =>
        FollowController.followDao.viewFollowers(req.params.uid)
            .then((follows: Follow[]) => res.json(follows));

    /**
     * Retrieves a specific user's following and returns an array of followers.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    viewUserFollowing = (req: Request, res: Response) =>
        FollowController.followDao.viewFollowers(req.params.uid)
            .then((follows: Follow[]) => res.json(follows));


    /**
     * Retrieves a specific user's followers and returns an array of followers.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    viewUserFollowers = (req: Request, res: Response) =>
        FollowController.followDao.viewFollowers(req.params.uid)
            .then((follows: Follow[]) => res.json(follows));
}