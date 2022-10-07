import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'TuitModel'
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'TagModel'
    },
}, {collection: 'tuits'});
export default tagSchema;