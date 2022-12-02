/**
 * @file Implements mongoose schema for tuits.
 */


import mongoose from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef TuitSchema Represents tuits.
 * @property {ObjectId} tuit Tuit id of the tuit being posted.
 * @property {ObjectId} postedOn The date that the tuit was posted.
 * @property {ObjectId} postedBy Id of the user that is tuiting.
 * the tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {
        type: String, required: true
    },
    postedOn: {type: Date},
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'tuits'});

export default TuitSchema