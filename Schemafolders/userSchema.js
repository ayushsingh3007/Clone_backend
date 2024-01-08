const mongoose=require("mongoose");
const RegisterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    passyear:{
        type:Number,
        required:true
    }
    
})
const reg=mongoose.model('register', RegisterSchema);
module.exports={reg}