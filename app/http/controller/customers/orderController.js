const Order = require('../../../models/order')
const moment = require("moment")
function orderController(){
    return{
        store(req,res){

            const {phone, address} = req.body;
            if(!phone || !address){
                req.flash('error','All fields are required')
                return res.redirect('/cart')
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            order.save().then(result =>{
                req.flash('order placed successfully')
                delete req.session.cart;
                return res.redirect('/')

            }).catch(err=>{
                req.flash('error','SomeThing went wrong')
                return res.redirect('/cart')
            })
        },
        // async index(req,res){
        //     const orders = await Order.find({customerId: req.user._id})
        //     res.render('customers/orders',{orders: orders})
        //     console.log(orders)
        // }
        async index(req, res) {
            if (!req.user || !req.user._id) {
                // handle the case where req.user is not defined or does not have _id property
                // return an error response, redirect the user, or handle it according to your use case
               // return res.status(401).send('Unauthorized');
                return res.redirect('/login')
            }
        
            const orders = await Order.find({ customerId: req.user._id },
                null,
                {sort: {'createdAt': -1 }}
                );
            res.render('customers/orders', { orders: orders,moment:moment,});
            console.log(orders);
        }
        
    }
}
module.exports = orderController;