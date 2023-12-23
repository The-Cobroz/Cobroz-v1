import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema({
    postID: {
        type: mongoose.SchemaTypes.ObjectId
    },
    userID: [{
        type: mongoose.SchemaTypes.ObjectId
    }]
});

const interactionModel = new mongoose.model("interactionModel", interactionSchema);

export default interactionModel; 