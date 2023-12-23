import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import multer from "multer";
import lspModel from "../models/lspModel.js";
import path from "path";
import fs from "fs/promises";
import lawAuthUploadModel from "../models/lawAuthUploadModel.js";

const router = express.Router();

router.use(express.json());
router.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
router.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const user = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
        const folderPath = path.join("uploads", `${user}`);
        
        // Check if the folder exists, create it if not
        fs.access(folderPath)
            .then(() => cb(null, folderPath))
            .catch(() => fs.mkdir(folderPath).then(() => cb(null, folderPath)))
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using the fieldname, current timestamp, and original file extension
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/register/user", async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);

    const { name, email, password } = req.body;

    try {
        const altUser = await userModel.findOne({ email });
        const checkLaw = await lspModel.findOne({ email });

        if (altUser || checkLaw) {
            return res.status(205).json({
                message: "User with this account already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, "cugelaiUzcldiufgaewiufgsldjc");
        res.cookie("logged", token, {
            expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
            httpOnly: false,
            path: "/",
            sameSite: "None",
            secure: true
        });
        res.cookie("type", "client", {
            httpOnly: false,
            expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
            path: "/",
            sameSite: "None",
            secure: true
        });

        return res.status(200).json({
            message: "Account created successfully"
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Internal server error during registration"
        });
    }
});

router.post("/register/lsp/page-1", async(req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    const {name, email, password} = req.body;
    try{
        const altUser = await lspModel.findOne({email});
        const checkUser = await userModel.findOne({email});
        if(altUser || checkUser){
            res.status(205).json({
                message: "user already exists with this email",
            });
        }
        else if(name && email && password){
            const pswd = await bcrypt.hash(password, 10);
            const lawyer = await lspModel({name, email, password: pswd});
            await lawyer.save();

            const token = jwt.sign({_id:lawyer._id},"cugelaiUzcldiufgaewiufgsldjc");
            res.cookie("logged",token,{
                httpOnly: false,
                expires: new Date(Date.now() + 5*60*60*1000),
                path: "/",
                sameSite: "None",
                secure: true
            });
            res.cookie("type","lawyer",{
                httpOnly: false,
                expires:new Date(Date.now() + 5*60*60*1000),
                path: "/",
                sameSite: "None",
                secure: true
            });


            res.status(200).json({
                message: "proceed to verifcation"
            });     
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.post("/register/lsp/page-2", upload.fields([{ name: 'cop', maxCount: 1 }, { name: 'deg', maxCount: 1 }]), async (req, res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");

    try {
        const uploads = await lawAuthUploadModel.findOne({ barID: req.body.barID });
        if (uploads) {
            return res.status(205).json({
                message: "Lawyer with this barID already exists"
            });
        } else if (req.files && req.body.barID && req.body.sbc) {
            console.log(req.files);

            const uploads = new lawAuthUploadModel({
                barID: req.body.barID,
                sbc: req.body.sbc,
                cop: req.files['cop'][0].filename,
                deg: req.files['deg'][0].filename
            });

            // Save the file paths in the database
            await uploads.save();

            // Update the user model with the authID
            await lspModel.updateOne({ _id: id }, { $set: { authID: uploads._id } });

            return res.status(200).json({
                message: "Account created successfully, you will be notified once you are verified"
            });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post("/login", async(req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    const {email, password} = req.body;
    try{
        const checkUser = await userModel.findOne({email});
        const checkLawyer = await lspModel.findOne({email});
        if(!checkUser && !checkLawyer){
            res.status(205).json({
                message: "email not found proceed to create account"
            });
        }
        else if(checkUser){
            const pswd = await bcrypt.compare(password, checkUser.password);
            if(pswd){
                const token = jwt.sign({_id: checkUser._id},"cugelaiUzcldiufgaewiufgsldjc");
                res.cookie("logged",token,{
                    httpOnly: false,
                    expires: new Date(Date.now() + 5*60*60*1000),
                    path: "/",
                    sameSite: "None",
                    secure: true
                });
                res.cookie("type","client",{
                    httpOnly: false,
                    expires:new Date(Date.now() + 5*60*60*1000),
                    path: "/",
                    sameSite: "None",
                    secure: true
                });


                res.status(200).json({
                    message: "Welcome back to Cobroz"
                });
            }
        }
        else{
            const pswd = await bcrypt.compare(password, checkLawyer.password);
            if(pswd){
                const token = jwt.sign({_id: checkLawyer._id},"cugelaiUzcldiufgaewiufgsldjc");
                res.cookie("logged",token,{
                    httpOnly: false,
                    expires: new Date(Date.now() + 5*60*60*1000),
                    path: "/",
                    sameSite: "None",
                    secure: true
                });
                res.cookie("type","lawyer",{
                    httpOnly: false,
                    expires:new Date(Date.now() + 5*60*60*1000),
                    path: "/",
                    sameSite: "None",
                    secure: true
                });


                res.status(200).json({
                    message: "Welcome back to Cobroz"
                });
            }
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.get("/logout", async(req, res) => {
    try{
        res.clearCookie("logged");
        res.clearCookie("type");
        res.status(200).json({
            message: "logout successful"
        });
    }catch(error){
        res.status(500).json(error);
    }
})

export default router;