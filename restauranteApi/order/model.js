
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const OrderSchema = new Schema({
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    },
    address: String,
    status: Number,
    listProducts: [
        {
            quantity: Number,
            product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }

        }
    ]
});

OrderSchema.statics = {
    list({ skip = 0, limit = 50 } = {}) {
        return this.find().populate("contact listProducts.product")
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .exec();
    },
    getOrderById(id) {
        return this.findById(id)
            .exec()
            .then((order) => {
                if (order) {
                    return order;
                }
                const err = new Error(`No existe order con id ${id}`);
                return Promise.reject(err);
            });
    },

    getOrderByStatus(status){
        console.log(status);
        return this.find({status: status})
            .exec()
            .then((order) => {
                if (order.length) {
                  console.log(order.length);
                    return Promise.resolve(order);
                }
                const err = new Error(`No existe orden con el estado ${status}`);
                return Promise.reject(err);
            });
    }
};


const OrderModel = mongoose.model('Order', OrderSchema);
exports.OrderModel = OrderModel;