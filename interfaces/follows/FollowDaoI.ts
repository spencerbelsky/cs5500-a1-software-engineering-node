/**
 * @file Declares API for Bookmarks related data access object methods.
 */
import Follow from "../../models/follows/Follow";
import {Request, Response} from "express";

export default interface LikeDaoI {
    followUser (uid: string, auid: string): Promise<Follow>;
    unfollowUser (uid: string, auid: string): Promise<any>;
    viewFollowing (uid: string): Promise<Follow[]>;
    viewFollowers (uid: string): Promise<Follow[]>;
    viewUserFollowing (uid: string): Promise<Follow[]>;
    viewUserFollowers (uid: string): Promise<Follow[]>;
};