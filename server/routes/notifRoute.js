import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import notifModel from "../models/notifModel.js";

const router = express.Router();

router.use(express.json());
router.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
router.use(cookieParser());

// Types of Notifications 
// 1) Follow request sent ✔️
// 2) request accepted ✔️
// 3) subscription request - later
// 4) sent you message - when chat section is made 
// 5) payment notif ✔️
// 6) no. of likes ✔️
// 7) commented on commented ✔️
// 8) commented on post ✔️
// 9) get all the notifs ✔️
// 10) delete notification ✔️ 

router.post("/sendRequest", async(req, res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    const type = req.cookies.type;
    const data = req.body;
    const notifData = {
        type: "reqSent",
        from: id,
        to: data.to,
        fromType: type,
        toType: data.type
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
    const data = req.body;
    const notifData = {
        type: "reqAccept",
        from: id,
        to: data.to,
        fromType: type,
        toType: data.type
    }
    try{
        const notif = await notifModel.create(notifData);

        if(notif){
            res.status(200).json({
                message: "notif added"
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

router.post("/paymentAlert", async(req, res) => {
    const data = req.body;
    try{
        if(data.newConn){
            var amount = data.newConn * 100; //amount value to be changed
            //apply any discounts according to newConn value
            const notif = await notifModel.create({
                type: "paymentAlert",
                to: data.id,
                toType: data.type,
                data: {
                    info: amount
                }
            });

            if(notif){
                res.status(200).json({
                    message: "Notif created"
                });
            }
            else{
                res.status(205).json({
                    message: "some error"
                })
            }
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.post("/likes", async(req,res) => {
    const data = req.body;
    const id = data.id;
   // const type = data.type;
    try{
        const notif = null;
        if(data.typeLike === "post"){
            notif = await notifModel.create({
                type: "postLikes",
                to: id,
                toType: data.type,
                data: {
                    id: data.postID,
                    info: data.likes
                }
            });
        }
        else{
            notif = await notifModel.create({
                type: "commLikes",
                to: id,
                toType: data.type,
                data: {
                    id: data.commID,
                    info: data.likes
                }
            });
        }

        if(notif){
            res.status(200).json({
                message: "notif sent"
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

router.post("/commComm", async(req, res) => {
    const data = req.body;
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    const type = req.cookies.type;

    try{
        const notif = await notifModel.create({
            type: "commcomm",
            from: id,
            to: data.id,
            toType: data.type,
            fromType: type,
            data: {
                id: data.comm
            } 
        });

        if(notif){
            res.status(200).json({
                message: "notif added"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.post("/commPost", async(req, res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    const type = req.cookies.type;
    const data = req.body;

    try{
        const notif = await notifModel.create({
            type: "postcomm",
            from: id,
            to: data.id,
            toType: data.type,
            fromType: type,
            data: {
                id: data.post
            }
        });

        if(notif){
            res.status(200).json(
                {
                    message: "notif added"
                }
            );
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

router.get("/getAllNotifs", async(req, res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    try{
        const notifs = await notifModel.find({to: id});
        if(notifs){
            res.status(200).json(notifs);
        }
        else{
            res.status(205).json({
                message: "no notifications"
            })
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.post("/systemNotif", async(req, res) => {
    const data = req.body;

    try{
        const notifData = {
            type: data.type,
            to: data.to,
            toType: data.toType
        };

        const notif = await notifModel.create(notifData);

        if(notif){
            res.status(200).json({
                message: "notif added"
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

router.get("/getNotifs", async(req, res)=> {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    
    try{
        const notifs = await notifModel.find({to: id}, {action: false});

        if(notifs){
            res.status(200).json(notifs);
        }
        else{
            res.status(205).json({
                message: "some error"
            })
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.put("/changeAction", async(req, res) => {
    const notifID = req.body.id;
    try{
        const change = await notifModel.updateOne({_id: notifID}, {$set : {action: true}});
        if(change){
            res.status(200).json({
                message: "notification read"
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

router.delete("/delNotifs", async(req,res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    try{
        const delTo = await notifModel.deleteMany({to: id});
        const delFrom = await notifModel.deleteMany({from: id});

        if(delTo && delFrom){
            res.status(200).json({
                message: "delete successful"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

export default router;
