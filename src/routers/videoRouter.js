import express from "express";  //node_modules에서 찾아줌!!
import {see, getEdit, postEdit, postUpload,getUpload, deleteVideo} from "../controllers/videoController";
const videoRouter = express.Router();


videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", see); // 정규식(regular expression)사용! 
// * = everything, (nico\w+) -> w: everyword. (\d+) ->d : digit  
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);

videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);

export default videoRouter;