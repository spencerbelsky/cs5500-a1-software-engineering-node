import {Express, Request, Response} from "express";
import TuitDao from "../interfaces/TuitDaoI";
import TuitControllerI from "../interfaces/TuitControllerI";

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        app.get('/api/tuits', this.findAllTuits);
        app.get('/api/tuits/:tid', this.findTuitById);
        app.get('/api/users/:uid/tuits', this.findTuitsByUser);
        app.post('/api/users/:uid/tuits', this.createTuit);
        app.delete('/api/tuits/:tid', this.deleteTuit);
    }
    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao
            .findAllTuits()
            .then(tuits => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao
            .findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));
    findTuitsByUser =
        (req: Request, res: Response) =>
            this.tuitDao
                .findTuitsByUser(req.params.uid)
                .then(tuits => res.json(tuits));

    createTuit = (req: Request, res: Response) =>
        this.tuitDao
            .createTuit(req.body)
            .then(actualTuit => res.json(actualTuit));

    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao
            .deleteTuit(req.params.tid)
            .then(status => res.json(status));

    updateTuit = (req: Request, res: Response) =>
        this.tuitDao
            .updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));

}

