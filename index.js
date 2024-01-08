const express=require('express')
const app=express()
const dotenv=require('dotenv')
const cors=require('cors')
const bodyparser=require('body-parser')
const app1 = require('./routing/userRouters')

// dotenv.config()
const port=4000

app.use(cors({
    origin:"*"
}))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.get("/",(req,res)=>{
    return res.send("homepage")
})


app.use(app1)

app.listen(port,()=>{
    console.log("server is running fine");
})
