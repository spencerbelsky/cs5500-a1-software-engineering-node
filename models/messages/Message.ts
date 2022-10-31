/**
 * @file Creates the Message data type representing a Message that was sent between two users.
 */
import User from "../users/User";

/**
 * @typedef Message Represents Message's relationship between one user and another user
 * @property {message} message the body of the message being sent.
 * @property {to} to the user that received a message.
 * @property {from} from the user that sent a message.
 * @property {sentOn} sentOn the date the message was sent.
 */
export default interface Message {
    message: string;
    to: User,
    from: User,
    sentOn: Date,
};