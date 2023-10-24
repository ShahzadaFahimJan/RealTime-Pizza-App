function cartController(){
    return{
        cart (req,res){
            res.render('customers/cart')
        },
    //     update (req,res){
            
    //         if(!req.session.cart){
    //             req.session.cart={
    //                 items:{},
    //                 totalQty:0,
    //                 totalPrice:0,
    //             }
    //             let cart = req.session.cart;
    //            // console.log(cart)
    //         //    console.log(req.body)
    //            if(!cart.items[req.body._id]){
    //             cart.items[req.body._id]={
    //                 item: req.body,
    //                 qty: 1,
    //             }
    //             cart.totalQty = cart.totalQty + 1;
    //             cart.totalPrice = cart.totalPrice + req.body.price;
    //            }
    //            else{
    //             cart.items[req.body._id].qty= cart.items[req.body._id].qty + 1;
    //             cart.totalQty = cart.totalQty + 1;
    //             cart.totalPrice = cart.totalPrice + req.body.price;
    //            }
    //         }
    //         res.json({ totalQty: req.session.cart.totalQty})
           
    //     }
        
    // }

    update(req, res) {
        if (!req.session.cart) {
            req.session.cart = {
                items: {},
                totalQty: 0,
                totalPrice: 0,
            };
        }
        
        const cart = req.session.cart;
        const pizzaId = req.body._id;

        if (!cart.items[pizzaId]) {
            cart.items[pizzaId] = {
                item: req.body,
                qty: 1,
            };
        } else {
            cart.items[pizzaId].qty += 1;
        }

        cart.totalQty += 1;
        cart.totalPrice += req.body.price;

        res.json({ totalQty: cart.totalQty });
    },
};
}
module.exports = cartController