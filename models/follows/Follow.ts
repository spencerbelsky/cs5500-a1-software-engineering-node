/**
 * @file Creates the Follow data type representing a follow that occurred between two users.
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follow's relationship between one user and another user.
 * @property {userFollowed} userFollowed the user that was followed.
 * @property {userFollowing} bookmarkedBy the user that followed another user.
 */
export default interface Follow {
    userFollowed: User;
    userFollowing: User,
};