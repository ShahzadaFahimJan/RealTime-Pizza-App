const express = require("express")
const router = express.Router();
router.get("/",(req,res)=>{
    res.render("home")
})
router.get("/cart",(req,res)=>{
    res.render('customers/cart')
})
router.get('/login',(req,res)=>{
    res.render('auth/login')
})
router.get('/register',(req,res)=>{
    res.render('auth/register')
})
module.exports = router;