const express=require('express')
const cookieparser=require('cookie-parser')
const app=express()
app.use(express.json())
app.use(cookieparser())

const product=require("./routes/productroutes")
const user=require("./routes/userroutes")
const order=require("./routes/orderroutes")
app.use("/api/v1",product)
app.use("/api/v1",user)

app.use("/api/v1",order)

module.exports=app 