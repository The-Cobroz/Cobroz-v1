import mongoose from "mongoose";

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
        type: String
    }
});

const notifModel = new mongoose.model(notifModel, notifSchema);

export default notifModel;