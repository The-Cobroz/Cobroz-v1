import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    broz:[ {
        type: mongoose.SchemaTypes.ObjectId,
    }],
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
    }],
    seenPosts : [{
        type: mongoose.SchemaTypes.ObjectId,
    }]
});

const userModel = new mongoose.model("userModel", userSchema);

export default userModel;