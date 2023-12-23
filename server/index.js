import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import profileRoute from "./routes/profileRoute.js";
import forumRoute from "./routes/forumRoute.js";
import notifRoute from "./routes/notifRoute.js";

const app = express();

mongoose
    .connect('mongodb://127.0.0.1:27017/',{
        dbName: "cobrozv1",
    })
    .then(() => console.log("Database Connected"))
    .catch(() => console.error());

app.use(express.json());
app.options("*",cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use("/auth",authRoute);
app.use("/profile",profileRoute);
app.use("/forum", forumRoute); 
app.use("/notif",notifRoute);


app.listen(5000,() => {
    console.log("server connected");
})

