import express from "express";
import cors from "cors";
import fs from "fs/promises"
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import userModel from "../models/userModel.js";
import lspModel from "../models/lspModel.js";
import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";
import interactionModel from "../models/interactionModel.js";


const router = express.Router();

router.use(express.json());
router.use(cors());
router.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
        const dest = path.join("upload/",`${id}`);
        if(!fs.access(dest)){
            fs.mkdir(dest);
        }
        cb(null,dest);
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + '-' + file.filename);
    }
});

const upload = multer({storage});

router.post("/newpost", upload.single(), async (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.setHeader('Access-Control-Allow-Methods', 'POST');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   res.setHeader('Access-Control-Allow-Credentials', 'true');
   const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
   try {
      const { content, tags } = req.body;
      const post = await postModel.create({ content, tags, postedBy: id });

      // Update user or lspModel with the new post ID
      const user = await userModel.findOne({ _id: id });
      if (!user) {
         await lspModel.updateOne({ _id: id }, { $addToSet: { posts: post._id } });
      } else {
         await userModel.updateOne({ _id: id }, { $addToSet: { posts: post._id } });
      }

      return res.status(200).json({
         message: "post added",
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json(error);
   }
});

router.get("/getPost", async(req,res) => {
    const id = req.params.postID;
    try{
        const post = await postModel.findOne({_id:id});
        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(400).json({
                message: "post not found"
            });
        }
    }catch(error){
        res.status(500).json(error);
    }
}); 

router.get("/getAllPosts", async(req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    try{
        const posts = await postModel.find({});
        if(posts){
            res.status(200).json({
                posts: posts
            });
        }
        else{
            res.status(400).json({
                message : "No more posts"
            });
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.post("/updatePost", async(req, res) => {
    const id = jwt.decode(req.cookies.logged,"cugelaiUzcldiufgaewiufgsldjc");
    try{
        const postid = req.body._id;
        await postModel.findByIdAndUpdate(postid,req.body,{
            new: true
        });

        const interaction = await interactionModel.findOne({postID: postid, userID: {$in: [id]}});
        if(!interaction){
            const interaction = await interactionModel({postID:postid, userID:id});
            await interaction.save();
        }

        return res.status(200).json({
            message: "Update successful"
        })
    }catch(error){
        return res.status(500).json(error);
    }
});

router.post("/addComment", async(req,res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    try{
        const {comment, postID, commentID} = req.body;

        const newComment = await commentModel({comment,postID,commentID, commentBy: id});
        await newComment.save();

        const checkInt = await interactionModel.findOne({postID, userID: {$in: [id]}});
        if(!checkInt){
            const Int = await interactionModel({postID, userID: id});
            await Int.save();
        }
        return res.status(200).json({
            message: "Comment Added"
        });

    }catch(error){
        return res.status(500).json(error);
    }
});

router.delete("/delPost", async (req, res) => {
   const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
   try {
      const post = await postModel.findOne({ _id: req.body.postID });

      if (!post) {
         return res.status(404).json({
            message: "Post not found",
         });
      }

      if (id === post.postedBy) {
         await postModel.deleteOne({ _id: req.body.postID });
         await interactionModel.deleteMany({ postID: req.body.postID });

         const user = await (userModel.findOne({ _id: id }) || lspModel.findOne({ _id: id }));
         if (user) {
            var posts = user.posts;
            var newPosts = posts.filter((ids) => ids !== req.body.postID);
            await (userModel.updateOne({ _id: id }, { $set: { posts: newPosts } }) || lspModel.updateOne({ _id: id }, { $set: { posts: newPosts } }));
         }

         await commentModel.deleteMany({ postID: req.body.postID });

         return res.status(200).json({
            message: "Post deleted successfully",
         });
      } else {
         return res.status(403).json({
            message: "You can delete only your posts",
         });
      }
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "Internal Server Error",
      });
   }
});

router.put("/editComment", async(req,res) => {
    const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
    try{
        const commentID = req.body.commentID;

        await commentModel.findByIdAndUpdate(commentID, req.body, {
            new: true
        });

        return res.status(200).json({
            message: "update successful"
        });

    }catch(error){
        return res.status(500).json(error);
    }
});

router.get("/getComment", async(req, res) => {
    const {commentID} = req.query;
    try{
        const comment = await commentModel.findOne({_id: commentID});
        if(comment){
            res.status(200).json(comment);
        }
        else{
            res.status(400).json({
                message: "No comment"
            });
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.get("/getAllComments", async(req, res) => {
    const {postID} = req.body;
    try{
        const comments = await commentModel.find({postID, commentID: null});
        if(comments){
            res.status(200).json({
                comments: comments
            });
        }
        else{
            res.status(400).json({
                message: "no comments"
            });
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.get("/getAllReplies", async(req, res) => {
    const {postID, commentID} = req.body;
    try{
        const replies = await commentModel.find({postID, commentID});
        if(replies){
            res.status(200).json({
                replies: replies
            });
        }
        else{
            res.status(400).json({
                message: "no replies"
            }); 
        }
    }catch(error){
        res.status(500).json(error);
    }
})

router.delete("/delComment", async (req, res) => {
   const id = jwt.decode(req.cookies.logged, "cugelaiUzcldiufgaewiufgsldjc");
   try {
      const commentID = req.body.commentId;
      const comment = await commentModel.findOne({ _id: commentID });

      if (id === comment.commentBy) {
         await commentModel.deleteOne({ _id: commentID }); // Add 'await' here
         return res.status(200).json({
            message: "comment deleted",
         });
      } else {
         return res.status(403).json({
            message: "Unauthorized to delete the comment",
         });
      }
   } catch (error) {
      console.error(error);
      return res.status(500).json(error);
   }
});


export default router;