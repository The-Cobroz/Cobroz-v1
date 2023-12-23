import mongoose from "mongoose";

const expSchema = new mongoose.Schema({
    court: {
        type: String,
    },
    begin: {
        type: String,
    },
    end: {
        type: String,
        default: "Present"
    }
});

const eduSchema = new mongoose.Schema({
    cllg: {
        type: String,
    },
    percent: {
        type: Number
    },
    year: {
        type: Number
    }
});

const lspSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    status: {
        type: String,
        default: "underprocess"
    },
    broz: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
    },
    posts: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
    },
    topAns: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    seenPosts: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
    majorIn: {
        type: String,
    },
    authID: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    exp: [{
        type: expSchema
    }],
    edu: [{
        type: eduSchema
    }]
});

const lspModel = new mongoose.model("lspModel",lspSchema);

export default lspModel;