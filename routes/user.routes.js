const express=require('express')
const { GetData, PostData, PatchData, DeleteData, signup, login, forgot, reset, refreshToken, AccToken } = require('../controllers/user.controllers')


const router=express.Router()


router.get("/",GetData)
router.post("/",PostData)
router.patch("/:id",PatchData)
router.delete("/:id",DeleteData)
router.post("/signup",signup)
router.post("/login",login)
router.post("/forget",forgot)
router.post("/reset/:token",reset)
router.post("/accToken",AccToken)

module.exports=router