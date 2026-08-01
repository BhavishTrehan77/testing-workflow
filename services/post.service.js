const { Post } = require("../models/post.models")







const GetingPost=async()=>{
    return await Post.find({})
}

const PostingPost=async(body)=>{
    return await Post.create(body)
}


module.exports={
    GetingPost,
    PostingPost
}