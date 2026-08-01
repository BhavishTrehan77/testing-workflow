const { validationResult } = require('express-validator')
const ServiceData=require('../services/user.services')
const jwt=require('jsonwebtoken')

const GetData=async(req,resp)=>{
    try{
    
    const data=await ServiceData.GetingData(req.query)
    resp.json(data)
    }catch(err){
        return resp.json({
            success:false,
            message:err.message
        })
    }
}
const PostData=async(req,resp)=>{
    try{
        const errors=validationResult(req)
    if(!errors.isEmpty()){
        return resp.json({
            success:false,
            message:errors.array()
        })
    }
    const data=await ServiceData.PostingData(req.body)
    resp.json(data)
    }catch(err){
        return resp.json({
            success:false,
            message:err.message
        })
    }
}
const PatchData=async(req,resp)=>{
    try{
    const data=await ServiceData.PatchingData(req.params.id,req.body)
    resp.json(data)
    }catch(err){
        return resp.json({
            success:false,
            message:err.message
        })
    }
}
const DeleteData=async(req,resp)=>{
    try{

    
    const data=await ServiceData.DeletingData(req.params.id)
    resp.json(data)
    }catch(err){
        return resp.json({
            success:false,
            message:err.message
        })
    }
}
const signup=async(req,resp)=>{
    try{
    const data=await ServiceData.Signup(req.body)
    resp.json(data)
    }catch(err){
        return resp.json({
            success:false,
            message:err.message
        })
    }
}
const login=async(req,resp)=>{
    try{
    const data=await ServiceData.Login(req.body.email,req.body.password)
    resp.json(data)
    }catch(err){
        return resp.json({
            success:false,
            message:err.message
        })
    }
}
const forgot=async(req,resp)=>{
    try{
    const data=await ServiceData.Forgot(req.body.email)
    resp.json(data)
    }catch(err){
        return resp.json({
            success:false,
            message:err.message
        })
    }
}
const reset=async(req,resp)=>{
    try{
    const data=await ServiceData.Reset(req.params.token,req.body.newPassword)
    resp.json(data)
    }catch(err){
        return resp.json({
            success:false,
            message:err.message
        })
    }
}
const AccToken=async(req,resp)=>{
    const AuthHeader=req.headers.authorization
    if(!AuthHeader || !AuthHeader.startsWith("Bearer ")){
        throw new Error("not exists")
    }
    const token=AuthHeader.split(" ")[1]
    const decode=jwt.verify(token,"refseckey")
    const newAccToken=jwt.sign({id:decode.id,role:decode.role},"accsecckey",{expiresIn:"90d"})
    resp.json({
        newAccToken
    })
}

module.exports={
    GetData,
    PostData,
    PatchData,
    DeleteData,
    signup,
    login,
    forgot,
    reset,
    AccToken
}