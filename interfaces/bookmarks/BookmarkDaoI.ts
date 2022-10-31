/**
 * @file Declares API for Bookmarks related data access object methods.
 */
import Bookmark from "../../models/bookmarks/Bookmark";

export default interface LikeDaoI {
    bookmarkTuit(uid: string, tid: string): Promise<Bookmark>;
    unbookmarkTuit (uid: string, tid: string): Promise<any>;
    viewAllBookmarks(uid: string): Promise<Bookmark[]>;
    viewBookmarksOfUser (uid: string): Promise<Bookmark[]>;
};