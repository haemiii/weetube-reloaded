import express from "express";  //node_modules에서 찾아줌!!
import {see, getEdit, postEdit, postUpload,getUpload} from "../controllers/videoController";
const videoRouter = express.Router();


videoRouter.get("/:id(\\d+)", see); // 정규식(regular expression)사용! 
// * = everything, (nico\w+) -> w: everyword. (\d+) ->d : digit  
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;