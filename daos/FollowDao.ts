/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/follows/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Follows.
 * @property {BookmarkDao} bookmarkDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
     * Follows another user.
     * @param {string} uid The primary key of user following another user.
     * @param {string} auid The primary key of the user getting followed.
     * @returns Promise to be returned when a follow instance is created in the database.
     * database.
     */
    followUser = async (uid: string, auid: string): Promise<Follow> =>
        FollowModel.create({userFollowing: uid, userFollowed: auid});

    /**
     * Unfollows a user.
     * @param {string} uid The primary key of user unfollowing another user.
     * @param {string} auid The primary key of user getting unfollowed.
     * @returns Promise to be returned when a follow instance is deleted in the database.
     * database.
     */

    unfollowUser = async (uid: string, auid: string): Promise<any> =>
        FollowModel.deleteOne ({userFollowing: auid, userFollowed: uid});

    /**
     * Views all users the current user is Following.
     * @param {string} uid the primary key of the user retreiving the list of users they are following.
     * @returns Promise To be notified when all follows are retrieved from the
     * database
     */

    viewFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Views all users the current followers
     * @param {string} uid the primary key of the user retreiving the list of users that follow them.
     * @returns Promise To be notified when all follows are retrieved from the
     * database
     */

    viewFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Views all bookmarks of a specific user.
     * @param {string} uid The primary key of user who will be searched and we will find who they are]
     * following.
     * @return {Promise} Promise to be returned when bookmark array is retreived.
     */
    viewUserFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid}).populate("userFollowing").exec();

    /**
     * Views all bookmarks of a specific user.
     * @param {string} uid The primary key of user whose followers we are searching for.
     * @return {Promise} Promise to be returned when bookmark array is retreived.
     */
    viewUserFollowers = async (uid: string): Promise<Follow[]> =>
       FollowModel.find({userFollowed: uid}).populate("userFollowed").exec();



}