import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

//application listening
const handelListening = () => 
    console.log(`✔ Server listenting on port http://localhost:${PORT} 🎉`);
app.listen(PORT, handelListening); 
