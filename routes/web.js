const express = require("express")
const router = express.Router();
const homeController = require('../app/http/controller/homeController')
const authController = require('../app/http/controller/authController')
const cartController = require('../app/http/controller/customers/cartController')
// router.get("/",(req,res)=>{
//     res.render("home")
// })
router.get('/',homeController().index)
router.get("/cart",cartController().cart)
router.get('/login',authController().login)
router.get('/register',authController().register)
module.exports = router;