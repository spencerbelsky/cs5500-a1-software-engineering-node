/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import UserController from "./controller/UserController";
import TuitController from "./controller/TuitController";
import mongoose from "mongoose";

const cors = require('cors')
const app = express();

const userDao = new UserDao();
const tuitDao = TuitDao.getInstance();


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

mongoose.connect('mongodb://localhost:27017/tuiter', options);

app.use(cors());
app.use(express.json());

const PORT = 4000;
app.listen(process.env.PORT || PORT);

const tuitController = new TuitController(app, tuitDao);
const userController = new UserController(app, userDao);
