const express = require("express")
const router = express.Router();
const homeController = require('../app/http/controller/homeController')
const authController = require('../app/http/controller/authController')
const cartController = require('../app/http/controller/customers/cartController')
const guest = require('../app/http/middlewares/guest')
// router.get("/",(req,res)=>{
//     res.render("home")
// })
router.get('/',homeController().index)
router.get('/cart',cartController().cart)
router.get('/login',guest, authController().login)
router.post('/login',authController().postLogin)
router.get('/register',guest, authController().register)
router.post('/update-card',cartController().update)
router.post('/register',authController().postRegister)
router.post('/logout',authController().logout)
module.exports = router;