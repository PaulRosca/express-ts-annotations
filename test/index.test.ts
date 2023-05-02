import app from "."
import request from "supertest"

it("Should work", async() => {
    const res = await request(app).get("/greeting/greet")
    console.log("RES", res)
})
