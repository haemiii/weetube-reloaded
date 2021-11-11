import express from "express";  //node_modules에서 찾아줌!!
import {join} from "../controllers/userController";
import {trending} from "../controllers/videoController";
const globalRouter = express.Router();


globalRouter.get("/", trending);
globalRouter.get("/join",join);

export default globalRouter;