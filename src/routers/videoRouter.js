import express from "express";  //node_modules에서 찾아줌!!
import {see, edit, upload, deleteVideo} from "../controllers/videoController";
const videoRouter = express.Router();


videoRouter.get("/upload",upload);
videoRouter.get("/:id(\\d+)", see); // 정규식(regular expression)사용! 
// * = everything, (nico\w+) -> w: everyword. (\d+) ->d : digit  
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;