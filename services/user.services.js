const { User } = require("../models/user.models")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const { default: mongoose } = require("mongoose")


const GetingData=async(q)=>{
    const{cursor}=q
    const limit=Number(q.limit)
    let que={}
    if(cursor && mongoose.Types.ObjectId.isValid(cursor)){
         que={_id:{$lt:new mongoose.Types.ObjectId(cursor)}}
        
    }
    const data=await User.find(que).sort({_id:-1}).limit(limit+1)
    const hasNext=data.length>limit 
    if(hasNext){
        data.pop()
    }
    const hasMore=data.length>0 && hasNext ? data[data.length-1]._id:null
    
    
    return {
        success: true,
        data,
        hasMore,
        hasNext
    }
}
const PostingData=async(body)=>{
    const data=await User.create(body)
    return data
}
const PatchingData=async(id,body)=>{
    const data=await User.findByIdAndUpdate(id,body)
    return data
}
const DeletingData=async(id)=>{
    return await User.findByIdAndDelete(id)
}
const Signup=async(body)=>{
    return await User.create(body)
}
const Login=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("no user with this perticular id found in database")
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("password missedmatch error code fails")
    }
    const AccToken=jwt.sign({id:user._id},"accseckey",{expiresIn:"30m"})
    const RefToken=jwt.sign({id:user._id},"refseckey",{expiresIn:"9d"})

    return{
        user,RefToken,AccToken
    }
}
const Forgot=async(email)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("user not found")
    }
    const resetToken=crypto.randomBytes(32).toString('hex')
    const hashedToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordToken=hashedToken
    user.resetPasswordExpire=Date.now()+1000*60*604
    await user.save()
    return{
        resetToken
    }
}

const Reset=async(token,newPassword)=>{
    
    if(!newPassword){
        throw new Error("newPassword must be enetered")
    }
    const hashedToken=crypto.createHash('sha256').update(token).digest('hex')
    const user=await User.findOne({
        resetPasswordToken:hashedToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        throw new Error("no user")
    }
    user.password=newPassword
    user.resetPasswordToken=null
    user.resetPasswordExpire=null
    await user.save()
    return{
        message:"password reset done"
    }
}


module.exports={
    GetingData,
    PostingData,
    PatchingData,
    DeletingData,
    Signup,
    Login,
    Forgot,
    Reset
}
