/**
 * @file Implements mongoose schema for bookmarks.
 */

import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef BookmarkSchema Represents bookmarks
 * @property {ObjectId} tuit Tuit id of the tuit that is being bookmarked
 * @property {ObjectId} bookmarkedBy User id of the user that is bookmarking
 * the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;