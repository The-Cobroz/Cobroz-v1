import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId //post or comment, message id
    },
    info: {
        type: String //like count, comment, etc
    }
});

const notifSchema = new mongoose.Schema({
    type : {
        type: String
    },
    from : {
        type: mongoose.SchemaTypes.ObjectId
    },
    to : {
        type: mongoose.SchemaTypes.ObjectId
    },
    data : {
        type: dataSchema
    },
    fromType: {
        type: String
    },
    toType: {
        type: String
    },
    action: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now()
    }
});

const notifModel = new mongoose.model("notifModel", notifSchema);

export default notifModel;