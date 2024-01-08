const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    catdivd:{
        type:String,
        required:true
    },
    course_name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    cat1:{
        type:String,
        required:true
    },
    participants:{
        type:Number,
        required:true
    },
    cat2:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    cat3:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },

})

const course=mongoose.model('usercourses', courseSchema);
module.exports={course}