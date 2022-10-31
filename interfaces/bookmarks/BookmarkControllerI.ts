/**
 * @file Declares Controller RESTful Web service API for bookmarks resource
 */

import {Request, Response} from "express";

export default interface BookmarkControllerI {
    bookmarkTuit (req: Request, res: Response): void;
    unbookmarkTuit (req: Request, res: Response): void;
    viewAllBookmarks (req: Request, res: Response): void;
    viewBookmarksOfUser (req: Request, res: Response): void;
};