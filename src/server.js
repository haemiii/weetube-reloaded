import express from "express";  //node_modules에서 찾아줌!!

const PORT = 4000;

const app = express(); //server = application 만들기
//server is always conneted with internet
//type google.com -> request, server is always listening

//middleware -> between request and respond :dosen't respond, expand request
//middleware(call next function) <= controller 
const loggerMiddleware = (req ,res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
};
const privateMiddleware = (req, res, next) =>{
    const url = req.url;
    if(url == "/protected"){
        return res.send("<h1>Not Allowed</h1>");
    }
    next();
};

const handleProtected = (req, res) =>{
    return res.send("Welcome to the private lounge.");
};

//globalMiddleware : using every route
app.use(loggerMiddleware); 
app.use(privateMiddleware);
//application setting
//app.get-> the way:server respond
app.get("/", (req, res)=> {// create route, callback : controller
    console.log(req);
    //return res.end, return res.send("hi!!!!")
    }); 
app.get("/protected", handleProtected);


const handleLogin  = (req, res) =>{
    return res.send("Login here!!");
};    
app.get("/login", handleLogin);
//application listening
const handelListening = () => 
    console.log(`✔ Server listenting on port http://localhost:${PORT} 🎉`);
app.listen(PORT, handelListening); //what port do server listen?, callback


//HTTP -> How server communicate with us
//GET -> Http method

//browser-> request page to the server, and get page for us

