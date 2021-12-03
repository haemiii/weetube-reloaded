import express from "express";  //node_modules에서 찾아줌!! ->express 가 패키지 이므로
import {getJoin, postJoin,  getLogin, postLogin} from "../controllers/userController";
import {home, search} from "../controllers/videoController"; // ../->파일을 나감
import { publicOnlyMiddleware } from "../middlewares";
const rootRouter = express.Router();


rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;