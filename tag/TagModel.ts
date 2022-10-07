import mongoose from "mongoose";
import tagSchema from "./TagSchema";

const tagModel = mongoose.model(
    'TagModel', tagSchema
);

export default tagModel