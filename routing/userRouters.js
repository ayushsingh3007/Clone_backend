const express=require('express')
const { registerController, loginController, prepcourses, completestore, books, auth, createcheckout, success, cancel, buy } = require('../controller/userController')
 const app1=express.Router()

 app1.post("/register",registerController)
 app1.post("/login",loginController)
 app1.post("/storecourse",completestore)
 app1.post("/createCheckout",createcheckout)
 app1.post("/books",books)
 app1.get("/course",prepcourses)
 app1.get("/auth",auth)
 app1.get("/sucess",success)
 app1.get("/cancel",cancel)
 app1.get("/buy",buy)



module.exports=app1;
