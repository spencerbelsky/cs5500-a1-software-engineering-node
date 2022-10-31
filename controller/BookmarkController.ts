/**
 * @file Controller RESTful Web service API for bookmarks resource.
 */

import {Request, Response, Express} from "express";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/bookmarks/BookmarkControllerI";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmark
 * resource.
 * Defines the following HTTP endpoints:
 *         POST /api/users/:uid/bookmarks/:tid to create a bookmark of a tuit by a user.
 *         DEL /api/users/:uid/bookmarks/:tid to delete a bookmark of a tuit by a user.
 *         GET /api/bookmarks to retrieve all bookmarks saved.
 *         GET /api/users/:uid/bookmarks to retrieve all bookmarks of a specific user.
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD
 * operations
 * @property {BookmarkController} BookmarkController Singleton controller
 * implementing RESTful Web service API
 */

export default class BookmarkController implements BookmarkControllerI {
     private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
     private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.bookmarkTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.unbookmarkTuit);
            app.get("/api/bookmarks", BookmarkController.bookmarkController.viewAllBookmarks);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController?.viewBookmarksOfUser);
        }
        return BookmarkController.bookmarkController;
    }
    private constructor() {
    }

    /**
     * Creates a new bookmark instance between tuit and a user
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new bookmark to be inserted in the database.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark relationship that was inserted in the database.
     */
    bookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.bookmarkTuit(
            req.params.uid,
            req.params.tid
        ).then(bookmark => res.json(bookmark));

    /**
     * Removes a bookmark instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user un-bookmarking and
     * tid identifying the primary key of the tuit being un-bookmarked.
     * @param {Response} res Represents response to client, including status
     * on whether deleting the relationship of a bookmark between a user and a tuit.
     */
    unbookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.unbookmarkTuit(
            req.params.uid,
            req.params.tid
        ).then(status => res.json(status));

    /**
     * Retrieves all bookmarks of a user from database and returns an array of
     * bookmarks
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    viewBookmarksOfUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.viewBookmarksOfUser(req.params.uid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    /**
     * Retrieves all bookmarks from database and returns an array of bookmarks
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    viewAllBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.viewAllBookmarks()
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

 }