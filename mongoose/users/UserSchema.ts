/**
 * @file Implements mongoose schema for users.
 */

import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * @typedef UserSchema Represents users.
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

const UserSchema = new mongoose.Schema<User>({

    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
    salary: {type: Number, default: 50000}
}, {collection: "users"});

export default UserSchema;