/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/likes/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes.
 * @property {LikeDao} LikeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Looking up all of the users that liked a tuit.
     * @param {string} tid The primary key of the tuit.
     * @returns Promise to be returned when a tuit array is retreived from the database.
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Looking up all of the tuits a specific user liked.
     * @param {string} uid The primary key of the user.
     * @returns Promise to be returned when a tuit array is returned from the database.
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Creates an instance of a like in the database when a user likes a tuit.
     * @param {string} uid The primary key of the user liking a tuit.
     * @param {string} uid The primary key of the tuit liked by a user.
     * @returns Promise to be returned when a like instance is created in the database.
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Deletes an instance of a like in the database when a user likes a tuit.
     * @param {string} uid The primary key of the user unlking a tuit.
     * @param {string} tid The primary key of the tuit being unliked by a user.
     * @returns Promise to be returned when a like instance is deleted in the database.
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}