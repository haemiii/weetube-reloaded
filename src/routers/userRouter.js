import express from "express";  //node_modules에서 찾아줌!!
import {edit, see, logout, startGithubLogin, finishGithubLogin} from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

userRouter.get("/:id(\\d+)", see); //: -> parameter

export default userRouter;