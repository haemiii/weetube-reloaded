import Video from "../models/Video";


export const home = async(req, res)=> {

    //callback pattern!!!
    // Video.find({},(error, videos)=> {
    //     return res.render("home", {pageTitle : "Home", videos : []});
    // });
    
    //promise pattern
    const videos = await Video.find({}).sort({createdAt: "desc"});
    return res.render("home", { pageTitle: "Home", videos });
    
}

export const see = async(req, res) => {
    const {id} = req.params;
    // console.log(req.params);
    const video = await Video.findById(id);
    if(video){
        return res.render("watch", {pageTitle : video.title, video});
    }
    return res.render("404", {pageTitle: "Video not found."});
}
export const getEdit = async(req, res) => {
    const {id} = req.params;
    // console.log(req.params);
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle: "Video not found."});
    }
    return res.render("edit", {pageTitle : `Edit: ${video.title}`, video});
};
export const postEdit = async(req, res) =>{
    const {id} = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({ _id:id });
    if(!video){
        return res.status(404).render("404", {pageTitle: "Video not found."});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
    // video.title = title;
    // video.description = description;
    // video.hashtags = hashtags
    // .split(",")
    // .map((word) => word.startWith("#") ? word : `#${word}`);
    // await video.save();
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
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    }catch(error){
        return res.render("upload", {
        pageTitle : "Upload Video", 
        errorMaessage : error._message,
        });

    }
};

export const deleteVideo = async (req, res)=>{
    const {id} = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async (req, res)=>{
    const { keyword } = req.query;
    let videos = [];
    console.log(keyword);
    if (keyword){
        const videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}$` , "i"),
            },       
        });
    }
    return res.render("search", {pageTitle: "Search", videos})
}