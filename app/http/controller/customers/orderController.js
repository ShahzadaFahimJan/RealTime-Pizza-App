const Order = require('../../../models/order')
const moment = require("moment")
const stripe = require('stripe')('sk_test_51O9P58DoWRpk1o2xpMJFB4e8RpDWMuGQjJoxo9IMR0bDn0l1WdrFPGBkBl5G3Ky4uH2VtKkSL18ZDzoIlesi6k9I00oTjedpUX')
function orderController(){
    return{
        // store(req,res){

        //     const {phone, address, stripeToken,paymentType} = req.body;
        //     if(!phone || !address){
        //         return res.json({message:'All fields are required'})
        //         // return res.redirect('/cart')
        //     }
        //     const order = new Order({
        //         customerId: req.user._id,
        //         items: req.session.cart.items,
        //         phone,
        //         address
        //     })
        //     order.save().then(result =>{
                
        //         // req.flash('order placed successfully')
        //         // delete req.session.cart;
        //         //stripe payment 
        //         if(paymentType === 'card')
        //         {
        //             stripe.charges.create({
        //                 amount: req.session.totalPrice * 100,
        //                 source: stripeTocken,
        //                 currency: 'inr',
        //                 description: `Pizza order ${placeOrder._id}`,
        //             }).then(()=>{
        //                 placeOrder.paymentStatus = true;
        //                 placeOrder.save().then((ord)=>{
        //                     const eventEmitter = req.app.get('eventEmitter');
        //                     eventEmitter.emit('orderPlaced',ord)
        //                     delete req.session.cart;
        //                     return res.json({message:'payment successfull, order placed successfully'})
        //                     // console.log(r)
        //                 }).catch((err)=>{
        //                     console.log(err)
        //                 })

        //             }).catch((err)=>{
        //                 delete req.session.cart;
        //                 return res.json({message:'order placed successfully, but payment failed'})
        //             })
                    
        //         }
                

        //         //emit
        //         // const eventEmitter = req.app.get('eventEmitter');
        //         // eventEmitter.emit('orderPlaced',result)

        //         // return res.json({message:'order placed successfully'})
        //         // return res.redirect('/')
                
        //     }).catch(err=>{
        //         // req.flash('error','SomeThing went wrong')
        //         // return res.redirect('/cart')
        //         return res.json({message:'something went wrong'})
        //     })
        // },
        store(req, res) {
            // Validate request
            const { phone, address, stripeToken, paymentType } = req.body;
            if (!phone || !address) {
                return res.status(422).json({ message: 'All fields are required' });
            }
        
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address,
            });
        
            order.save()
                .then((result) => {
                    return Order.populate(result, { path: 'customerId' });
                })
                .then((placedOrder) => {
                    // Stripe payment
                    if (paymentType === 'card') {
                        return stripe.charges.create({
                            amount: req.session.cart.totalPrice * 100,
                            source: stripeToken,
                            currency: 'inr',
                            description: `Pizza order: ${placedOrder._id}`,
                        })
                        .then(() => {
                            placedOrder.paymentStatus = true;
                            placedOrder.paymentType = paymentType;
                            return placedOrder.save();
                        });
                    } else {
                        placedOrder.paymentStatus = false;
                        placedOrder.paymentType = paymentType;
                        return placedOrder.save();
                    }
                })
                .then((ord) => {
                    // Emit
                    const eventEmitter = req.app.get('eventEmitter');
                    eventEmitter.emit('orderPlaced', ord);
                    delete req.session.cart;
                    return res.json({ message: 'Payment successful, Order placed successfully' });
                })
                .catch((err) => {
                    console.error(err);
                    delete req.session.cart;
                    return res.status(500).json({ message: 'Order placement and payment failed. You can pay at delivery time.' });
                });
        },
        
        

        async index(req, res) {
            if (!req.user || !req.user._id) {
                
                return res.redirect('/login')
            }
        
            const orders = await Order.find({ customerId: req.user._id },
                null,
                {sort: {'createdAt': -1 }}
                );
            res.render('customers/orders', { orders: orders,moment:moment,});
          //  console.log(orders);
        },
        
       async show(req,res)
        {
           const order = await Order.findById(req.params.id)
           if(req.user._id.toString() === order.customerId.toString()){
           return res.render('customers/singleOrder',{order})
           }
           else{
           return res.redirect('/')
           }
        }
    }
}
module.exports = orderController;