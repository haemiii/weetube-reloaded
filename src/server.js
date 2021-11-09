import express from "express";  //node_modules에서 찾아줌!!

const PORT = 4000;

const app = express(); //server = application 만들기
//server is always conneted with internet
//type google.com -> request, server is always listening


//application setting

app.get("/",(req, res)=> {
    console.log(req);
    //return res.end, return res.send("hi!!!!")
    }); // route, callback

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

