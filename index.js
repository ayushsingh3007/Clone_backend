const express=require("express")
const dotenv=require("dotenv")
const stripe=require("stripe")("sk_test_51OMERySJb30zHYKXRtntVAOMPx8ClokJnGOlIPN1IBbaP06OUAf0e4jFlBPAnUsEPy6uK7zORnT48RFKNRH14DC2002ZAtE6HX")
const cors=require("cors");
const bodyParser=require("body-parser")
const { Connection } = require("./Dbconnection/connection");
const router1 = require("./userControl/regloginrouter");
const port=4000
//dotenv.config()
const app=express();
app.use(cors({
    origin:"*"
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    return res.send("homepage")
})
app.use(router1)
app.listen(port, async ()=>{
    try{
        await Connection();
        console.log("server is running with",port)
    }
    catch(error){
        console.log(error)
    }

})