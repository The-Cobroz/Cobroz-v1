import express, { request } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import notifModel from "../models/notifModel";
import userModel from "../models/userModel";
import lspModel from "../models/lspModel";

const router = express.Router();

router.use(express.json());
router.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
router.use(cookieParser());

// Types of Notifications 
// 1) Follow request sent
// 2) request accepted
// 3) subscription request
// 4) sent you message 
// 5) payment notif
// 6) no. of likes
// 7) commented on commented
// 8) commented on post
// 9) get all the notifs
// 10) delete notification

router.post("/sendRequest", async(req, res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    const data = req.body;
    const notifData = {
        type: "reqSent",
        from: id,
        to: data.to,
        data: data.info
    };
    try{
        const notif = await notifModel.create(notifData);
        if(notif){
            res.status(200).json({
                message: "notification created"
            });
        }
        else{
            res.status(205).json({
                message: "some error"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.post("/acceptRequest", async(req, res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    const type = req.cookies.type;
    const otherid = req.body.id;

    try{
        const notifData = {
            type: "reqAccept",
            from: id,
            to: otherid
        };

        const notif = await notifModel.create(notifData);

        if(type === "lawyer"){
            await lspModel.updateOneById({})
        }

        if(notif){
            res.status(200).json({
                message: "Notification made"
            })
        }
    }
    catch(error){

    }
});


export default router;
