const bcrypt = require("bcrypt");

const jwt=require("jsonwebtoken");
const { reg } = require("../schemamodel/registermodel");
const {course}=require('../Schemafolders/courseSchema')
const {str}=require('../Schemafolders/backendSchema')

const pastmock=require("./alldata");



const stripe=require("stripe")("sk_test_51OMERySJb30zHYKXRtntVAOMPx8ClokJnGOlIPN1IBbaP06OUAf0e4jFlBPAnUsEPy6uK7zORnT48RFKNRH14DC2002ZAtE6HX")
const saltround=10;
const secretkey="cloneproject"

let course1=""



const prepcourses= (req,res)=>{
    for(let i=0;i<pastmock.length;i++){
        let rt=await .create(pastmock[i])

    }
    return res.send("successfully stored")

}

const completestore= async(req,res)=>{
    let arr1=await str.find({})
    return res.send(arr1)
}

const books=async(req,res)=>{
    return res.send(arr)
}



const registerController=async (req,res)=>{
    const user=req.body;
    try{
    const samemail=await reg.findOne({email:{$eq:user.email}})
    if(samemail){
        console.log({msg:"email already exists"})
        return res.send({msg:"email already exists"})
    }
    else{
        // const gen=bcrypt.genSaltSync(saltround)
        user.password=bcrypt.hashSync(user.password,saltround)
        console.log(user.password)
        const dbres1=await reg.create(user)
        console.log(dbres1)
        const token= jwt.sign({user:user.email},secretkey,{expiresIn:'300000'})
        console.log(token)
        // arr.push(user)
        
        return res.send({msg:"user successfully registered",token:token})
    }
    
}
catch(error){
    console.log(error)
}
}



const loginController=async (req,res)=>{
    const logindetails= await req.body;

    try{    
        console.log(logindetails,"----------1111")
    
        const validmaildetails= await reg.findOne({email:{$eq:logindetails.email}})
        console.log(validmaildetails,"----------")
        if(validmaildetails){
            // console.log({msg:"email already exists"}) 
            course1=logindetails.email
            console.log(course1)
            
    
            const comparedetails= bcrypt.compareSync(logindetails.password,validmaildetails.password)
        
            console.log(comparedetails)
            if(comparedetails)

                {
                    const token = jwt.sign({ email: logindetails.email }, secretkey, { expiresIn: "360000" });
                    console.log("token:", token);
                    return res.send({ msg: "your login successfully", token: token, userdetail: validmaildetails });
        
            // return res.send({msg:"your login successfully"})
                }
            else{
                return res.send({msg:"your password is wrong"})
            }
        }
    
        else{
            return res.send({msg:"first you have to register or check your credentials"})

        }
}
catch(error){
    return res.send({msg:error})
} 
}



const auth=async (req, res) => {
    const user = req.user;
    console.log(user);
    if (user && user.email) {
        try {
            const userinfo = await reg.findOne({ email: user.email });
            if (userinfo) {
                res.send({ msg: "User Authorized", userdata: userinfo })
            }
            else {
                res.status(404).send("User not found");
            }
        }
        catch (err) {
            console.log("Error fetching user detail from db:", err);
        }
    }
   console.log("user authorized")
   
}


// router1.get("/mobdata",async (req,res)=>{
    
   
//     const dbres4=await dumy.find({})
//     console.log(dbres4)
    
//     return res.send(dbres4)
// })

// const htmlsuccesspage = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f0f0f0;
//         }
//         h1 {
//             color: blue;
//             margin-left:15%;
//             margin-bottom:30px;
            
//         }
//         .cont{
//             display:flex;
//             align-items:center;
//             flex-direction:column;
//             border:2px;
            
//         }
//        button{
            
//             margin:40%;
//             margin-top:30px;
//        }
//     </style>
//     <title>payment</title>
// </head>
// <body>
// <div className="cont">
// <div>
//     <h1>Payment successfull and course confirmed</h1>
//     <div>
//     // <a href="https://moonlit-cranachan-da39c6.netlify.app/">
//      <button className=" bot1"><NavLink to="/">continue with your course</NavLink></button>
//     </div>
//     </div>
//     </body>
// </html>
// `;
const createcheckout= async (req, res) => {
    console.log("hiiiii")
  const  {products}  = await req.body;
//   const num=parseInt(products)
//   const specificdata=arr.filter((item)=>{item.id==num})
  console.log(products,"-------------------------------");
  console.log(typeof(products))

//   course1={useremail:mailid,
//             bookname:specificdata.bookname,
//             price:specificdata.price
//         }
//     const ressee=coursestr.create(course1)
//     console.log(ressee)
    //const dbres1=await reg.create(user)
    const storeitem=products.map((prod1)=>({
            useremail:prod1.email,
            id:prod1.id,
            catdivd:prod1.catdivd,
            nameofthecourse:prod1.course_name,
            imgsrc:prod1.img,
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
        unit_amount: prod.price,
    },
    quantity: 1,
}));
    
    

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: "payment",
      
      success_url: "https://prepbytesclonebackend.onrender.com/Success",
      cancel_url: "https://prepbytesclonebackend.onrender.com/Cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// router1.get("/Success",(req,res)=>{
//     return res.send(htmlsuccesspage)
   
// })

const buy=async (req,res)=>{
    const buyingcourses=await course.find({email:{$eq:course1}})
    console.log(buyingcourses)
    
    return res.send(buyingcourses)
}


module.exports={registerController,loginController,auth,createcheckout,buy,prepcourses,completestore,books}