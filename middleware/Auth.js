const jwt=require('jsonwebtoken')

async function AuthMiddleware(req,resp,next){
    const AuthHeaders=req.headers.authorization
    if(!AuthHeaders||!AuthHeaders.startsWith("Bearer ")){
        throw new Error("header not found")
    }
    const token=AuthHeaders.split(" ")[1]
    const decoded=jwt.verify(token,"accseckey")
    if(!decoded){
        throw new Error("token failed")
    }
    req.user=decoded
    return next()
}


module.exports={
    AuthMiddleware
}