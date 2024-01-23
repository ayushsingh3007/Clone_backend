const express=require("express")
const dotenv=require("dotenv")
const stripe=require("stripe")("sk_test_51OK7daSAg3lXy8qLZhheRgo3J3APhi6R52IAFx3uP0NwcRhA5MXL1WkNx9p73iwoMSHmNRsEJ6LyVwnhkcrQYGIB00X6Jf63tM")
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