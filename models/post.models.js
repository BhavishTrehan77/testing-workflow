const { default: mongoose } = require("mongoose");


const PostSchema=new mongoose.Schema({
    title:String,
    content:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})


const Post=mongoose.model("Post",PostSchema)


module.exports={
    Post
}