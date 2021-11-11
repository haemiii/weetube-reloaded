import express from "express";  //node_modules에서 찾아줌!!
import {watch, edit} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/watch", watch);
videoRouter.get("/edit", edit);
export default videoRouter;