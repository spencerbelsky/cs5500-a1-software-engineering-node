/**
 * @file Implements mongoose schema for follows.
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef FollowSchema Represents follows
 * @property {ObjectId} userFollowed UserId of the user getting followed
 * @property {ObjectId} userFollowing UserId of the user that is following a new user
 * the tuit
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;