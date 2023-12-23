import mongoose, { Mongoose } from "mongoose";

const lawAuthUploadSchema = new mongoose.Schema({
    barID : {
        type: Number,
        required: true,
        unique: true,
    },
    sbc: { 
        type: String,
        required: true
    },
    cop: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    deg: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }
});

const lawAuthUploadModel = new mongoose.model("lawAuthUploadModel", lawAuthUploadSchema);

export default lawAuthUploadModel;