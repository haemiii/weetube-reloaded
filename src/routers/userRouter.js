import express from "express";  //node_modules에서 찾아줌!!
import {edit, remove, see, logout} from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove",remove);
userRouter.get("/:id(\\d+)", see); //: -> parameter

export default userRouter;