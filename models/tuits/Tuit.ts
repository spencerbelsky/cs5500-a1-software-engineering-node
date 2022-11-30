/**
 * @file Creates the Tuit data type representing a Tuit and its details.
 */
import User from "../users/User";
import Stats from "./Stats";

/**
 * @typedef Tuit Represents a tuit object.
 * @property {string} id the id of the tuit object created.
 * @property {string} tuit the type of account the user has created.
 * @property {User} postedBy the user who posted the tuit.
 * @property {Date} postedOn the date the tuit was posted.
 */
export default interface Tuit {
    id: string,
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    stats: Stats,
};