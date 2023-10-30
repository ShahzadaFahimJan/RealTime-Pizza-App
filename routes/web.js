const express = require("express")
const router = express.Router();
const homeController = require('../app/http/controller/homeController')
const authController = require('../app/http/controller/authController')
const cartController = require('../app/http/controller/customers/cartController')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')
const orderController = require('../app/http/controller/customers/orderController')
const AdminOrderController = require('../app/http/controller/admin/orderController')
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
//customer route
router.post('/orders',auth,orderController().store)
router.get('/customer/orders',auth,orderController().index)
//Admin 
router.get('/admin/orders', admin ,AdminOrderController().index)
module.exports = router;