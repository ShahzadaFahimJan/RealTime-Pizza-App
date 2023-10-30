const Order = require('../../../models/order')
function orderController(){
    return{
        // index(req,res){
        //     Order.find({status: {$ne: 'completed'}},null,{sort: {'createdAt': -1}}).
        //     populate('customerId','-password').exec((orders)=>{
        //         res.render('admin/orders')
        //     });

        // }
        async index(req, res) {
            try {
                const orders = await Order.find({ status: { $ne: 'completed' } })
                    .sort({ createdAt: -1 })
                    .exec();
                if(req.xhr){
                    return res.json(orders)
                }
               return res.render('admin/orders', { orders: orders });
            } catch (error) {
                // Handle the error, e.g., send an error response to the client
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        }
        
        
    }
}
module.exports = orderController;