/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/dislikes/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of LikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao()
        }
        return DislikeDao.dislikeDao
    }

    private constructor() {
    }

    /**
     * Counts how many users disliked a tuit
     * @param {string} tid Primary Key of Tuit
     * @return Promise to be returned when count of dislikes is retrieved from database
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid})

    /**
     * Retrieves the primary key of a dislike of a tuit by user if relation exists.
     * @param {string} uid Primary key of user
     * @param {string} tid Primary Key of Tuit
     * @return Promise to be notified when dislike is found in database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid})

    /**
     * Removes the primary key of a dislike from the database.
     * @param {string} uid Primary key of user
     * @param {string} tid Primary Key of Tuit
     * @returns Promise To be notified when dislike is removed from the database
     */
    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid})

    /**
     * Inserts dislike primary key for a dislike by a specific user of a specific tuit.
     * @param {string} uid Primary key of User
     * @param {string} tid Primary Key of Tuit
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid})

    /**
     * Finds all Tuits disliked by a User.
     * @param {string} uid Primary key of user
     * @returns Promise To be returned in an array when the tuits are retrieved from the database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel.find({dislikedBy: uid})
            .populate("tuit")
            .exec()
}