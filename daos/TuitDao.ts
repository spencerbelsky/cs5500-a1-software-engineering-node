/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/tuits/TuitDaoI";
import Stats from "../models/tuits/Stats";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Returns all tuits in an array.
     * @returns Promise to be returned when a user wants a tuit array.
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find()
            .populate("postedBy")
            .exec();

    /**
     * Returns all tuits in an array by userId.
     * @returns Promise to be returned when a user wants a tuit array.
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .populate("postedBy")
            .exec();

    /**
     * Returns a tuit by the id.
     * @returns Promise to be returned when a user wants a specific tuit.
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});


    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});

    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});

    updateLikes = async (tid: string, newStats: Stats) =>
            TuitModel.updateOne(
                {_id: tid},
                {$set: {stats: newStats}});

    /**
     * Updates likes stats with new values in the database as tuits are liked and disliked.
     * @param {string} tid Primary key of tuit
     * @param {Stats} newStats new stats for the tuit
     */
    updateStats = async (tid: string, newStats: Stats) =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: {stats: newStats}}
        )
}