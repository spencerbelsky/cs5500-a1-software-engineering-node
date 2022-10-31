/**
 * @file Creates the Bookmark data type representing a bookmark made by a specific user.
 */
import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * @typedef Bookmark Represents bookmark's relationship between tuit and a user.
 * @property {Tuit} tuit tuit being bookmarked.
 * @property {User} bookmarkedBy User that bookmarked tuit.
 */
export default interface Bookmark {
    tuit: Tuit,
    bookmarkedBy: User,

};