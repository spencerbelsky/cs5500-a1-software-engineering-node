/**
 * @file Controller RESTful Web service API for dislikes resource.
 */
import {Express, Request, Response} from "express";
import DislikeControllerI from "../interfaces/dislikes/DislikeControllerI";
import DislikeDao from "../daos/DislikeDao";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";

/**
 * @class DislikeController Implements RESTful Web service API for dislikes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user</li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit</li>
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operationsy
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {DislikeController} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance()
    private static tuitDao: TuitDao = TuitDao.getInstance()
    private static likeDao: LikeDao = LikeDao.getInstance()
    private static dislikeController: DislikeController | null = null

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return DislikeController
     */
    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();

            app.put("/api/users/:uid/dislikes/:tid",
                DislikeController.dislikeController.userTogglesTuitDislikes);
            app.get("/api/users/:uid/dislikes",
                DislikeController.dislikeController.findAllTuitsDislikedByUser);
        }
        return DislikeController.dislikeController;
    }

    private constructor() {
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is un-disliking
     * the tuit and the tuit being un-disliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the dislike was successful or not
     */
    userUnDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userUnDislikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status))

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const dislikeDao = DislikeController.dislikeDao
        const likeDao = DislikeController.likeDao
        const tuitDao = DislikeController.tuitDao
        const uid = req.params.uid
        const tid = req.params.tid
        // @ts-ignore
        const profile = req.session['profile']
        const userId = uid === 'me' && profile ?
            profile._id : uid
        try {
            // check to see if the user has alreay liked or disliked a tuit
            const userLikedTuitCheck = await likeDao.findUserLikesTuit(userId, tid)
            const userDislikedTuitCheck = await dislikeDao.findUserDislikesTuit(userId, tid)

            // store how many likes and dislikes a tuit has
            const tuitLikeCount = await likeDao.countHowManyLikedTuit(tid)
            const tuitDislikeCount = await dislikeDao.countHowManyDislikedTuit(tid)

            // retrieve tuit and store it
            const tuit = await tuitDao.findTuitById(tid)

            // Check if user has already liked tuit
            // Using truthy values, if userLikedTuitCheck returns a non-null value, then it is true
            if (userLikedTuitCheck) {
                // If a dislike is present, then decrement the dislike stat and remove it from the UI
                await dislikeDao.userUnDislikesTuit(userId, tid)
                tuit.stats.dislikes = tuitDislikeCount - 1
            } else {
                // If user has disliked the tuit...
                if (userDislikedTuitCheck) {
                    // If user has liked the tuit, remove the like and decrement like count by 1
                    await likeDao.userUnlikesTuit(userId, tid)
                    tuit.stats.likes = tuitLikeCount - 1
                }
                // Add a dislike if the user dislikes a tuit
                await dislikeDao.userDislikesTuit(userId, tid)
                tuit.stats.dislikes = tuitDislikeCount + 1
            }
            // Retreive current stats and update them to reflect the state
            await tuitDao.updateStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userDislikesTuit(req.params.tid, req.params.uid)
            .then(dislike => res.json(dislike))

    /**
     * Retrieves all tuits disliked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user disliked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were disliked
     */
    findAllTuitsDislikedByUser = (req: Request, res: Response) => {
        const dislikeDao = DislikeController.dislikeDao
        const uid = req.params.uid
        // @ts-ignore
        const profile = req.session['profile']
        const userId = uid === 'me' && profile ? profile._id: uid

        dislikeDao.findAllTuitsDislikedByUser(userId)
            .then(dislikes => {
                const likesNonNullTuits = dislikes.filter(dislike => dislike.tuit)
                const tuitsFromDislikes = likesNonNullTuits.map(dislike => dislike.tuit);
                res.json(tuitsFromDislikes);
            })
    }
}
