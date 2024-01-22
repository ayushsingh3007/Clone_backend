const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const { course } = require('../Schemafolders/courseSchema');
const { str } = require('../Schemafolders/backendSchema');
const pastmock=require('../controller/data.js');
const { reg } = require('../Schemafolders/UserSchema.js');
const saltround=10;
const secretkey="cloneproject"
const stripe=require("stripe")("sk_test_51OK7daSAg3lXy8qLZhheRgo3J3APhi6R52IAFx3uP0NwcRhA5MXL1WkNx9p73iwoMSHmNRsEJ6LyVwnhkcrQYGIB00X6Jf63tM")


let course1=""
const prepcourses=async (req,res)=>{
    for(let i=0;i<pastmock.length;i++){
        let usercourse=await course.create(pastmock[i])
    }
    return res.send('course has been created successfully')
}

const completestore=async(req,res)=>{
    let arr1=await str.find({})
    return res.send(arr1)
}


// const books=async(req,res)=>{
//     return res.send(arr)
// }







////registration controller here 
const registerController=async(req,res)=>{
    const user=req.body
    try{
        const findemail=await reg.findOne({email:{$eq:user.email}})
        if(findemail){
            console.log('user already registered ')
            return res.send({msg:"user already exists"})
        }
        else{
            user.password=bcrypt.hashSync(user.password,saltround)
            console.log(user.password)
            const createuser= await reg.create(user)
            console.log(createuser)
            const token=jwt.sign({user:user.email},secretkey,{expiresIn:'300000'})
            console.log(token)
            return res.send({msg:"user registerd successfully",token:token})
        }
    }
    catch(error){
        console.log(error)
    }
}

const loginController=async(req,res)=>{
      const loginuser=await req.body
      try{
        console.log(loginuser)
         
        const verifieduser=await reg.findOne({email:{$eq:loginuser.email}})
        console.log(verifieduser);
        if(verifieduser){
            course1=loginuser.email
            console.log(course1);
        let comparedetails=bcrypt.compareSync(loginuser.password,verifieduser.password)
        console.log(comparedetails)

       if(comparedetails){
        const token = jwt.sign({ email: loginuser.email }, secretkey);
        console.log(token);
        return res.send({msg:"login successfully", userdetail: { name: verifieduser.name, email: verifieduser.email },          token: token,
        token: token,

    })
       }
       else{
        return res.send({msg:"incorrect password"})
       }


    }
    else{
        return res.send({msg:"try to login first"})
    }
      }
      catch(err){
        console.log(err);
      }

}



const auth=async (req,res)=>{
    const user=req.user;
    if(user && user.email){
        try{
            const userinfo=await reg.findOne({email:user.email})
            if(userinfo){
                res.send({msg:"USER AUTHORIZED",userdata:userinfo})
            }
            else{
                res.status(404).send("user not found")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    console.log("user authorized");
}



const createcheckout= async (req, res) => {
    console.log("hiiiii")
  const  {products}  = await req.body;

  console.log(products);
  console.log(typeof(products))


    const storeitem=products.map((prod1)=>({
            email:prod1.email,
            id:prod1.id,
            catdivd:prod1.catdivd,
            course_name:prod1.course_name,
            img:prod1.img,
            date:prod1.date,
            cat1:prod1.cat1,
            participants:prod1.participants,
            cat2:prod1.cat2,
            duration:prod1.duration,
            cat3:prod1.cat3,
            price:prod1.price

}))
    const ressee=course.create(storeitem[0])
     console.log(ressee)


const lineItems = products.map((prod) => ({
    price_data: {
        currency: "inr",
        product_data: {
            name: prod.course_name,
        },
        unit_amount: prod.price*100,
    },
    quantity: 1,
}));
    
    

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: "payment",
      
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const buy=async (req,res)=>{
    const buyingcourses=await  course.find({})
    console.log(buyingcourses)
    
    return res.send(buyingcourses)
}




module.exports={registerController,loginController,auth,createcheckout,buy,prepcourses,completestore}