import express from "express";  //node_modules에서 찾아줌!!
import session from "express-session"
import morgan from "morgan";
import MongoStore from 'connect-mongo';
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter"; // ./ ->이 파일에서
import { localsMiddleware } from "./middlewares";


const app = express(); //server = application 만들기
//server is always conneted with internet
//type google.com -> request, server is always listening
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended: true})); // make express application understand form

app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000, 
    },
    store : MongoStore.create({mongoUrl:process.env.DB_URL}),
    })
);
// app.use((req, res, next) => {
//     req.sessionStore.all((error, sessions) => {
//       console.log(sessions);
//       next();
//     });
//   });
//create router
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users",userRouter);


export default app;
