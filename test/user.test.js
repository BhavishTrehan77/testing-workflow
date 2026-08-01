const request=require("supertest")
const app = require("../app");

describe("checking user",()=>{
    test("GET /api/v1/data checking userdata",async()=>{
        const response=await request(app).get("/api/v1/data")
        expect(response.statusCode).toBe(200)
    })
})

describe("checking the post route for this ",()=>{
    test("POST /api/v2/post checking this",async()=>{
        const response=await request(app).post("/api/v2/post").send({
            name:"Bhavish",
            email:"bhavishtrehan777@gmail.com",
            password:"bhavish@1122"
        })

        expect(response.statusCode).toBe(201)

    })
})
