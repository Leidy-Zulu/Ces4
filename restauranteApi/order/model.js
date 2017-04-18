var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OrderSchema = new Schema({
    idContact: String,
    address: String,
    status: Number,
    listProducts: [
        {
            idProduct: String,
            quantity: Number
        }
    ]
});

OrderSchema.statics = {
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
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