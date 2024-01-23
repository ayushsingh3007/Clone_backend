const mongoose=require("mongoose");
const RegisterSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
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
    passingyear:{
        type:Number,
        required:true
    }
    
})
const reg=mongoose.model('register', RegisterSchema);
module.exports={reg}