
import express from "express";  //node_modules에서 찾아줌!!
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter"; // ./ ->이 파일에서

const app = express(); //server = application 만들기
//server is always conneted with internet
//type google.com -> request, server is always listening
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended: true})); // make express application understand form

//create router
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users",userRouter);


export default app;
