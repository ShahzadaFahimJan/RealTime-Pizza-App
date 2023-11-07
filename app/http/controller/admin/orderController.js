
const order = require("../../../models/order");

function orderController() {
    return {
        async index(req, res) {
            try {
                const orders = await order.find({ status: { $ne: 'completed' } })
                    .sort({ createdAt: -1 })
                    .populate('customerId', '-password')
                    .exec();

                if (req.xhr) {
                    return res.json(orders);
                } else {
                    return res.render('admin/orders', { orders: orders });
                }
            } catch (error) {
                // Handle the error, e.g., send an error response to the client
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        }
    };
}

module.exports = orderController;
