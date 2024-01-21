import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import lspModel from "../models/lspModel.js";
import Twilio from "twilio/lib/rest/Twilio.js";

const router = express.Router();

router.use(express.json());
router.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));
router.use(cookieParser());

router.get("/getProfile", async(req,res) => {
    
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    try{
        let check = await userModel.findOne({_id: id});
        if(check){
            const userDetails = {...check._doc, password: ""};
            res.json(userDetails).status(200);
        }
        else{

            check = await lspModel.findOne({_id:id});
            const userDetails = {...check._doc, password: ""};
            res.status(200).json(userDetails);  
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.get("/getUser", async(req,res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/web/app/post/:postID');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    const id = req.query.userID;

    try{
        let user = await userModel.findOne({_id: id});
        if(user){
            res.status(200).json(user);
        }
        else{
            user = await lspModel.findOne({_id: id});
            if(user){
                res.status(200).json(user);
            }
            else{
                res.status(205).json({
                    message: "User not found"
                });
            }
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.get("/getUserDetails", async(req, res) => {
    const id = req.query.from;
    const type = req.query.fromType;

    try{
        let userData = null;
        if(type === "lawyer"){
            userData = await lspModel.findOne({_id: id});
        }
        else{
            userData = await userModel.findOne({_id: id});
        }

        if(userData){
            res.status(200).json(userData);
        }
        else{
            res.status(205).json({
                message: "error"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.put("/password/change", async(req, res) => {
    const id = jwt.decode(req.cookies.logged,"cugelaiUzcldiufgaewiufgsldjc");
    const type = req.cookies.type;

    try{
        const {oldPswd, pswd} = req.body;
        var user = null;
        if(type === "lawyer"){
            user = await lspModel.findOne({_id: id});
        }
        else{
            user = await userModel.findOne({_id: id});
        }

        const check = await bcrypt.compare(oldPswd, user.password);
        if(check){
            if(type === "lawyer"){
                const pPassword = bcrypt.hash(pswd, 10);
                const update = await lspModel.updateOne({_id: id}, {$set : {password: pPassword}});
                await update.save();

                if(update){
                    res.status(200).json({
                        message: "Password Changed"
                    });
                }
            }
            else{
                const pPassword = bcrypt.hash(pswd, 10);
                const update = await userModel.updateOne({_id: id}, {$set : {password: pPassword}});
                await update.save();

                if(update){
                    res.status(200).json({
                        message: "Password Changed"
                    });
                }
            }
        }
        else{
            res.status(205).json({
                message: "Password doesn't match"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.put("/user/update", async(req,res) => {
    console.log(req.cookies);
    const id = jwt.decode(req.cookies.logged,"cugelaiUzcldiufgaewiufgsldjc");    
    try{
        const user = await userModel.findById(id);
        if(!user){
            res.status(205).json({
                message: "user not found, try again later"
            });
        }
        else{
            const {phone, email} = req.body;
            if(phone){
                const checkUser = await userModel.findOne({phone});
                const CheckLsp = await lspModel.findone({phone});

                if(checkUser || CheckLsp){
                    return res.status(205).json({
                        message: "This phone number is already registered"
                    });
                }
            } 
            const update = await userModel.findByIdAndUpdate(id, req.body, {
                new: true
            });

            if(update){
                return res.status(200).json({
                    message: "Changes saved"
                });
            }
            else{
                return res.status(205).json({
                    message: "Changes not saved, Try again later"
                });
            }
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.put("/lsp/update", async(req,res) => {
    const id = jwt.decode(req.cookies.logged,"cugelaiUzcldiufgaewiufgsldjc");
    try{
        const user = await lspModel.findById(id);
        if(!user){
            res.status(205).json({
                message: "user not found, try again later"
            });
        }
        else{
            const {phone, email} = req.body;
            if(phone){
                const checkUser = await userModel.findOne({phone});
                const CheckLsp = await lspModel.findone({phone});

                if(checkUser || CheckLsp){
                    return res.status(205).json({
                        message: "This phone number is already registered"
                    });
                }
            }
            if(email){
                const checkUser = await userModel.findOne({email});
                const CheckLsp = await lspModel.findone({email});

                if(checkUser || CheckLsp){
                    return res.status(205).json({
                        message: "This phone number is already registered"
                    });
                }
            } 
            const update = await lspModel.findByIdAndUpdate(id, req.body, {
                new: true
            });

            if(update){
                return res.status(200).json({
                    message: "Changes saved"
                });
            }
            else{
                return res.status(205).json({
                    message: "Changes not saved, Try again later"
                });
            }
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.put("/lsp/update-array", async(req,res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    try{
        const {edu, exp} = req.body;
        if(edu){
            await lspModel.updateOne({_id: id}, {$addToSet: {edu}});
        }
        if(exp){
            await lspModel.updateOne({_id: id}, {$addToSet: {exp}});
        }

        res.status(200).json({
            message: "Update Successful"
        });
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.put("/posts/seen", async (req, res) => {
    const postID = req.body.postID;
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    const type = req.cookies.type;

    try {
        let update;

        if (type === "lawyer") {
            update = await lspModel.updateOne({ _id: id }, { $addToSet: { seenPosts: postID } });
        } else if (type === "client") {
            update = await userModel.updateOne({ _id: id }, { $addToSet: { seenPosts: postID } });
        } else {
            return res.status(205).json({
                message: "update not done"
            });
        }

        if (update) {
            return res.status(200).json({
                message: "update successful"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

router.put("/new/connection", async(req,res) => {
    const id = jwt.decode(req.cookies.logged,"cugelaiUzcldiufgaewiufgsldjc"); 
    try{
        const connectID = req.body.connectID;

        const lspUser = await (lspModel.updateOne({_id: id}, {$push: {broz: connectID}}) || lspModel.updateOne({_id: connectID}, {$push: {broz: id}}));
        const user = await (userModel.updateOne({_id:id}, {$push: {broz: connectID}}) || userModel.updateOne({_id: connectID}, {$push: {broz: id}}));

        if(lspUser && user){
            res.status(200).json({
                message: "broz updated"
            });
        }
        else{
            res.status(205).json({
                message: "error"
            });
        }
    }catch(error){  
        return res.status(500).json(error);
    }
});

router.put("/connection/delete", async(req, res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    try{
        const deleteID = req.body.deleteID;
        
    }catch(error){
        return res.status(500).json(error);
    }
});

router.delete("/user/deleteAccount", async(req, res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    try{
        const user = await userModel.findOne({_id: id});
        const pswd = await bcrypt.compare(user.password,req.body.password);

        if(pswd){
            const del = await userModel.deleteOne({_id: id});
            if(del){
                res.clearCookie("logged");

                return res.status(200).json({
                    message: "account deleted successfully"
                });
            }
        }
        else{
            return res.status(205).json({
                message: "wrong password"
            });
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.delete("/lsp/deleteAccount", async(req, res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    try{
        const user = await lspModel.findOne({_id: id});
        const pswd = bcrypt.compare(user.password,req.body.password);

        if(pswd){
            const del = await lspModel.deleteOne({_id: id});
            if(del){
                res.clearCookie("logged");
            
                return res.status(200).json({
                    message: "account deleted successfully"
                });
            }
        }
        else{
            return res.status(205).json({
                message: "wrong password"
            });
        }
    }catch(error){
        res.status(500).json(error);
    }
});

export default router;