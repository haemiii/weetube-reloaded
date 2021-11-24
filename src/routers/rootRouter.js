import express from "express";  //node_modules에서 찾아줌!! ->express 가 패키지 이므로
import {getJoin, postJoin,  login} from "../controllers/userController";
import {home, search} from "../controllers/videoController"; // ../->파일을 나감
const rootRouter = express.Router();


rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search", search);

export default rootRouter;