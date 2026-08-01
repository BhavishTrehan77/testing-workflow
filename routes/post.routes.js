

const express=require('express')
const { GetPost, Postpost } = require('../controllers/post.controller')

const Postrouter=express.Router()



Postrouter.get("/",GetPost)
Postrouter.post("/",Postpost)



module.exports={
    Postrouter  
}