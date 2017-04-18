var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ProductSchema = new Schema({
    description: String,
    name: String,
    price: Number,
    quantity: Number
});


ProductSchema.statics = {
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .exec();
    },
    getProductById(id) {
        return this.findById(id)
            .exec()
            .then((product) => {
                if (product) {
                    return product;
                }
                const err = new Error(`No existe producto con id ${id}`);
                return Promise.reject(err);
            });
    },

    getProductByName(nameProduct){
        console.log(nameProduct);
        return this.find({name: new RegExp(nameProduct, 'i')})
            .exec()
            .then((product) => {
                if (product.length) {
                  console.log(product.length);
                    return Promise.resolve(product);
                }
                const err = new Error(`No existe producto con el nombre ${nameProduct}`);
                return Promise.reject(err);
            });
    }
};
const ProductModel = mongoose.model('Product', ProductSchema);
exports.ProductModel = ProductModel;