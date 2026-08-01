const request=require("supertest")
const app = require("../app")



describe("Checking the post route",()=>{
    test(" GET /api/v2/post checking post route ",async()=>{
        const response=await request(app).get("/api/v2/post");
        expect(response.statusCode).toBe(200);
    })
})

describe("checking the post request",()=>{
    test(" POST /api/v2/post checking if the status is correct or not",async()=>{
        const response=await request(app).post("/api/v2/post")
        expect(response.statusCode).toBe(201)
    })
})
