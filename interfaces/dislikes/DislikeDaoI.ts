/**
 * @file Declares API for Dislikes related data access object methods
 */
import Dislike from "../../models/dislikes/Dislike";

export default interface DislikeDaoI {
    userDislikesTuit(uid: string, tid: string): Promise<Dislike>;

    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;

    findUserDislikesTuit(uid: string, tid: string): Promise<any>

    userUnDislikesTuit(uid: string, tid: string): Promise<any>;

    countHowManyDislikedTuit(tid: string): Promise<any>
};