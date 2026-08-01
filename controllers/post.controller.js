const PostService=require('../services/post.service')

const GetPost=async(req,resp)=>{
    const data=await PostService.GetingPost()
    resp.status(200).json(data)
}

const Postpost=async(req,resp)=>{
    const data=await PostService.PostingPost(req.body)
    resp.status(201).json(data)
}


module.exports={
    GetPost,
    Postpost
}