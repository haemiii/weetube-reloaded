import express from "express";  //node_modules에서 찾아줌!! ->express 가 패키지 이므로
import {join, login} from "../controllers/userController";
import {home, search} from "../controllers/videoController"; // ../->파일을 나감
const globalRouter = express.Router();


globalRouter.get("/", home);
globalRouter.get("/join",join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;