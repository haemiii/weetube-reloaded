import express from "express";  //node_modules에서 찾아줌!!
import {edit, remove} from "../controllers/userController";
const userRouter = express.Router();


userRouter.get("/edit", edit);
userRouter.get("/delete",remove);

export default userRouter;