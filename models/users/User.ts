/**
 * @file Creates the User data type representing a User and their details.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";


/**
 * @typedef UserSchema Represents a user object.
 * @property {String} username username of the user.
 * @property {String} password password of the user.
 * @property {String} firstName first name of the user.
 * @property {String} lastName last name of the user.
 * @property {String} email email of the user.
 * @property {String} profilePhoto the user's profile photo.
 * @property {String} headerImage the header image of the user.
 * @property {String} biography a short description the user can make for their account.
 * @property {String} dateOfBirth the user's birthday.
 * @property {String} accountType the type of account the user has created.
 * @property {String} martialStatus the relationship status of the user.
 * @property {ObjectId} location the current location of the user.
 * @property {Number} salary how much the user makes in a year.
 */

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};