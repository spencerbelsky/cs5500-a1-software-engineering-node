import mongoose from "mongoose";
import TuitSchema from "../mongoose/TuitSchema";

const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;