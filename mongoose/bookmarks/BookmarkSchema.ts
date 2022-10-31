/**
 * @file Implements bookmark schema for bookmarks.
 */

import mongoose, {Schema} from "mongoose";
import Like from "../../models/bookmarks/Bookmark";

/**
 * @typedef BookmarkSchema Represents bookmarks schema
 * @property {ObjectId} tuit TuitId of tuit that is being bookmarked
 * @property {ObjectId} bookmarkedBy UserId of the user that is bookmarking a tuit
 */

const BookmarkSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "BookmarkModel"},
}, {collection: "bookmark"});
export default BookmarkSchema;