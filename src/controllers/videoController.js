import Video from "../models/Video";

export const home = async(req, res)=> {
    //callback pattern!!!
    // Video.find({},(error, videos)=> {
    //     return res.render("home", {pageTitle : "Home", videos : []});
    // });
    
    //promise pattern
    try{
        const videos = await Video.find({});
        return res.render("home", {pageTitle : "Home", videos});
    }catch{
        return res.render("server-error");
    }
    
}

export const see = async(req, res) => {
    const {id} = req.params;
    // console.log(req.params);
    const video = await Video.findById(id);
    return res.render("watch", {pageTitle : video.title, video});
}
export const getEdit = (req, res) => {
    const {id} = req.params;
    // console.log(req.params);
    return res.render("edit", {pageTitle : `Editing`});
};
export const postEdit = (req, res) =>{
    const {id} = req.params;
    const {title} = req.body;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) =>{
    return res.render("upload" ,{pageTitle : "Upload Video" });
};
export const postUpload = async(req, res) =>{
    const {title, description, hashtags} = req.body;
    try{
        await Video.create({
            title,
            description,
            createdAt : Date.now(),
            hashtags : hashtags.split(",").map((word) => `#${word}`),
        });
    }catch(error){
        return res.render("/upload", {
        pageTitle : "Upload Video", 
        errorMaessage : error._message
    });

    }
};