/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import UserController from "./controller/UserController";
import TuitController from "./controller/TuitController";
import LikeController from "./controller/LikeController";
import MessageController from "./controller/MessageController";
import BookmarkController from "./controller/BookmarkController";
import FollowController from "./controller/FollowController";
import mongoose from "mongoose";
var cors = require('cors');

// Using .env to store environment variables
require('dotenv').config();

// constructing the connection string
// mongodb+srv://spencerbelsky:<password>@cluster0.xac2dds.mongodb.net/?retryWrites=true&w=majority
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.xac2dds.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database

mongoose.connect(connectionString);

const app = express();
app.use(express.json());
app.use(cors());

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const messagesController = MessageController.getInstance(app);
const bookmarksController = BookmarkController.getInstance(app);
const followsController = FollowController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);