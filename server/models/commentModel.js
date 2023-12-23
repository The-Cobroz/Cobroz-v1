import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String
        },
        postID: {
            type : mongoose.SchemaTypes.ObjectId
        },
        commentID: {
            type: mongoose.SchemaTypes.ObjectId,
            default: null
        },
        commentBy: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        upvotes: {
            type: Number,
            default: 0
        },
        downvotes: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 1
        },
    },
    {
        timestamps : {
            type: Date,
            default: Date.now()
        }
    }
);

const commentModel = new mongoose.model("commentModel",commentSchema);

export default commentModel;