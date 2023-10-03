// This router file defines the API endpoints and their corresponding controllers for different resources in the backend.
const express = require("express");
const { service, user, cart, purchase } = require("../controllers");
const router = express.Router();

/*  USER ENDPOINTS */

// create new user
router.post("/users", (req, res) => {
  try{
    const {email, hashed_password} = req.body;
    if(email === undefined){
      throw new Error("email is required")
    }
    if(hashed_password === undefined){
      throw new Error("hashed_password is required")
    }
    if(typeof email !== "string"){
      throw new Error("email must be a string")
    }
    if(typeof hashed_password !== "string"){
      throw new Error("hashed_password must be a string")
    }
    if(email.trim() === ""){
      throw new Error("email cannot be empty")
    }
    if(hashed_password.trim() === ""){
      throw new Error("hashed_password cannot be empty")
    }
    
    user.post(req.body) 
    .then((data) => {
      return res.status(201).json({
        confirmation: "success",
        data: data,
      });
    }).catch((error) => {
      return res.status(400).json({
        confirmation: "fail",
        error: error.message
      })
    })
  }
  catch(error){
    return res.status(400).json({
      confirmation: "fail",
      error: error.message
    })
  }
});

//check if account exists
router.get("/users/:email", (req, res) => {
  try{
    const email =req.params.email;
    if(email === undefined){
      throw new Error("email query param is required")
    }
    if(typeof email !== "string"){
      throw new Error("email query param must be a string")
    }
    if(email.trim() === ""){
      throw new Error("email query param cannot be empty")
    }
    user.checkIfAccountExists(email)
    .then((data) => {
      return res.status(200).json({
        confirmation: "success",
        data: data,
      });
    }).catch((error) => {
      return res.status(400).json({
        confirmation: "fail",
        error: error.message
      })
    })
  }catch(error){
    return res.status(400).json({
      confirmation:"fail",
      error:error.messsage
    })
  }
});


// login
router.post("/users/login", (req, res) => {
  try{
    const{email,hashed_password}=req.body;
    if(email === undefined){
      throw new Error("email is required")
    }
    if(hashed_password === undefined){
      throw new Error("hashed_password is required")
    }
    if(typeof email !== "string"){
      throw new Error("email must be a string")
    }
    if(typeof hashed_password !== "string"){
      throw new Error("hashed_password must be a string")
    }
    if(email.trim() === ""){
      throw new Error("email cannot be empty")
    }
    if(hashed_password.trim() === ""){
      throw new Error("hashed_password cannot be empty")
    }
    user.authenticate(req.body)
    .then((data) => {
      return res.status(200).json({
        confirmation: "success",
        data: data,
      });
    }).catch((error) => {
      return res.status(400).json({
        confirmation: "fail",
        error: error.message
      })
    })
  }catch(error){
    return res.status(400).json({
      confirmation:"fail",
      error:error.messsage
    })
  }
});

/*  SERVICE ENDPOINTS */

router.get("/services", (req, res) => {
  service.get()
  .then((data) => {
    return res.status(200).json({
      confirmation: "success",
      data: data,
    });
  }).catch((error) => {
    return res.status(400).json({
      confirmation: "fail",
      error: error.message
    })
  })
});

/*  CART ENDPOINTS */

//read services
router.get("/carts/:user_email",(req,res)=>{
  try{
    const user_email = req.params.user_email;
    if(user_email === undefined){
      throw new Error("email query param is required")
    }
    if(typeof user_email !== "string"){
      throw new Error("email query param must be a string")
    }
    if(user_email.trim() === ""){
      throw new Error("email query param cannot be empty")
    }
    cart.get(user_email)
    .then((data)=>{
      return res.status(200).json({
        confirmation:"success",
        data:data
      })
    }).catch((error)=>{
      return res.status(400).json({
        confirmation:"fail",
        error:error.message
      })
    })
  }
  catch(error){
    return res.status(400).json({
      confirmation:"fail",
      error:error.message
    })
  }
})

// create a service and update quantity in a user cart (add to cart)
router.post("/carts/:user_email",(req,res)=>{
  try{
    const user_email = req.params.user_email;
    if(user_email === undefined){
      throw new Error("email query param is required")
    }
    if(typeof user_email !== "string"){
      throw new Error("email query param must be a string")
    }
    if(user_email.trim() === ""){
      throw new Error("email query param cannot be empty")
    }
    const{service_title,quantity}=req.body;
    if(service_title===undefined){
      throw new Error("service_title is required")
    }
    if(typeof service_title!=="string"){
      throw new Error("service_title must be a string")
    }
    if(service_title.trim()===""){
      throw new Error("service_title cannot be empty")
    }
    if(quantity===undefined){
      throw new Error("quantity is required")
    }
    if(typeof quantity!=="number"){
      throw new Error("quantity must be a number")
    }
    cart.post(user_email, req.body)
    .then((data)=>{
      return res.status(201).json({
        confirmation:"success",
        data:data
      })
    }).catch((error)=>{
      return res.status(400).json({
        confirmation:"fail",
        error:error.message
      })
    })
  }catch(error){
    return res.status(400).json({
      confirmation:"fail",
      error:error.message
    })
  }
})



// delete a service from a user cart (remove item from cart)
router.delete("/carts/:user_email",(req,res)=>{
  try{
    const user_email = req.params.user_email;
    if(user_email === undefined){
      throw new Error("email query param is required")
    }
    if(typeof user_email !== "string"){
      throw new Error("email query param must be a string")
    }
    if(user_email.trim() === ""){
      throw new Error("email query param cannot be empty")
    }
    const service_title = req.body.service_title;
    if(service_title===undefined){
      throw new Error("service_title is required")
    }
    if(typeof service_title!=="string"){
      throw new Error("service_title must be a string")
    }
    if(service_title.trim()===""){
      throw new Error("service_title cannot be empty")
    }
    cart.delete(user_email, service_title)
    .then((data)=>{
      return res.status(200).json({
        confirmation:"confirmation",
        data: {
          user_email, service_title
        }
      })
    }).catch((error)=>{
      return res.status(400).json({
        confirmation:"fail",
        error:error.message
      })
    })
  }
  catch(error){
    return res.status(400).json({
      confirmation:"fail",
      error:error.message
    })
  }
})

/*  PURCHASE ENDPOINTS */

// read live order (view chosen services)
router.get("/purchases/:user_email",(req,res)=>{
  try{
    const user_email = req.params.user_email;
    if(user_email === undefined){
      throw new Error("email query param is required")
    }
    if(typeof user_email !== "string"){
      throw new Error("email query param must be a string")
    }
    if(user_email.trim() === ""){
      throw new Error("email query param cannot be empty")
    }
    purchase.get(user_email)
    .then((data)=>{
      return  res.status(200).json({
        confirmation:"success",
        data:data
      })
    })
    .catch((error)=>{
      return res.status(400).json({
        confirmation:"fail",
        error:error.message
      })
    })
  }
  catch(error){
    return res.status(400).json({
      confirmation:"fail",
      error:error.message
    })
  }
})

// create live order (checkout)
router.post("/purchases/:user_email",(req,res)=>{
  try{
    const user_email = req.params.user_email;
    if(user_email === undefined){
      throw new Error("email query param is required")
    }
    if(typeof user_email !== "string"){
      throw new Error("email query param must be a string")
    }
    if(user_email.trim() === ""){
      throw new Error("email query param cannot be empty")
    }
    cart.get(user_email).then((data) => {
      if(data.cart.length === 0) throw new Error("cannot checkout an empty cart")
        cart.deleteAll(user_email).then(()=>{
          console.log(data.cart)
          purchase.post(user_email, data.cart)
          .then((data)=>{
            return res.status(201).json({
              confirmation:"success",
              data:data
            })
          })
          .catch((error)=>{
            return res.status(400).json({
              confirmation:"fail",
              error:error.message
            })
          })  
        })
        .catch((error)=>{
          return res.status(400).json({
            confirmation:"fail",
            error:error.message
          })
        })  
      })
      .catch((error)=>{
        return res.status(400).json({
          confirmation:"fail",
          error:error.message
        })  
    })
  }
  catch(error){
    return res.status(400).json({
      confirmation:"fail",
      error:error.message
    })
  }
})

module.exports = router;