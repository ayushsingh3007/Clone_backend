const mongoose=require("mongoose")
mongoose.set("strictQuery",true);
const mongocloudUrl="mongodb+srv://ayushsingh6394:mrayush123@cluster0.3caz3os.mongodb.net/";
const Connection=async ()=>{
    try{
        await mongoose.connect(mongocloudUrl);
        console.log("Connected Successfully")
    }
catch(err){
    console.log("something wrong in cnnection process:",err)
}
}
module.exports={Connection}
