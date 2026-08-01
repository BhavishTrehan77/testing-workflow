

const Rbac=async(req,resp,next)=>{
    if(req.user.role=="admin"){
        return next()
    }
    else{
        throw new Error("user is not authorized")
    }
}
module.exports={
    Rbac
}