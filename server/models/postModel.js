import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    upvotes:{
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
    postedBy: {
        type: mongoose.SchemaTypes.ObjectId
    },
    linkID: {
        type: mongoose.SchemaTypes.ObjectId
    },
    tags: [{
        type: String,
    }],

},
{
    timestamp: {
        type: Date,
        default: Date.now()
    }
}
);

const postModel = new mongoose.model("postModel",postSchema);

export default postModel;