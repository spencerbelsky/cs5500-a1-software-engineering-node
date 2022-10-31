/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Bookmarks a tuit.
     * @param {string} uid The primary key of user making the bookmark.
     * @param {string} tid The primary key of tuit getting bookmarked.
     * @returns Promise to be returned when a bookmark instance is created in the database.
     * database.
     */
    bookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedBy:uid, tuit: tid});

    /**
     * Bookmarks a tuit.
     * @param {string} uid The primary key of user making the bookmark.
     * @param {string} tid The primary key of tuit getting bookmarked.
     * @returns Promise to be returned when a bookmark instance is deleted in the database.
     * database.
     */
    unbookmarkTuit = async (uid: string, tid:string): Promise<any> =>
        BookmarkModel.deleteOne({likedBy: uid, tuit: tid});

    /**
     * Views all Bookmarks.
     * @returns Promise To be notified when all bookmarks are retrieved from the
     * database
     */
    viewAllBookmarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find();

    /**
     * Views all bookmarks of a specific user.
     * @param {string} uid The primary key of user.
     * @return {Promise} Promise to be returned when bookmark array is retreived.
     */
    viewBookmarksOfUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid}).populate("tuit").exec();



}