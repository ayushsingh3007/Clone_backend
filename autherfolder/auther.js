const jwt=require("jsonwebtoken")
// const dotenv=require('dotenv')
// dotenv.config();
const secretkey='cloneproject'
// const cors=require("cors")
const auther=(req,res,next)=>{
    const BToken=req.headers['authorization'];
    console.log("this is bearer", BToken);
    console.log(BToken)
    
    if(BToken){
        const token=BToken.split(" ")[1];
        try{
        const validuser=jwt.verify(token,secretkey)
        if(validuser){
            req.user=validuser;
            next();
        }
    else{
        console.log({msg:"Not Authorized"})
    }
    }
    catch(error){
        console.log({msg:error})
    }
}
else{
    console.log("user not allowed")
}

}
module.exports=auther;