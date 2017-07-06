var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OrderExtSchema = new Schema({
    ubicacion_entrega: [
        {
            direccion: String,
            location: [
                {
                    type: String,
                    coordinates: Number
                }
            ]
        }
    ],
    cliente: [
        {
            id: String,
            cedula: String,
            nombres: String,
            apellidos: String,
            sexo: String,
            diaMesAnioCumple: String,
            correo: String,
            empresa: [
                {
                    nombre: String,
                    nit: Number,
                    celular: String,
                    email: String,
                    ubicacion: [
                        {
                            direccion: String,
                            location: [
                                {
                                    type: String,
                                    coordinates: Number
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    observaciones: String
});

OrderExtSchema.statics = {
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .exec();
    },
    getOrderExtById(id) {
        return this.findById(id)
            .exec()
            .then((orderExt) => {
                if (orderExt) {
                    return orderExt;
                }
                const err = new Error(`No existe orderExt con id ${id}`);
                return Promise.reject(err);
            });
    },

    getOrderExtByStatus(status){
        console.log(status);
        return this.find({status: status})
            .exec()
            .then((orderExt) => {
                if (orderExt.length) {
                  console.log(orderExt.length);
                    return Promise.resolve(orderExt);
                }
                const err = new Error(`No existe orden con el estado ${status}`);
                return Promise.reject(err);
            });
    }
};
const OrderExtModel = mongoose.model('OrderExt', OrderExtSchema);
exports.OrderExtModel = OrderExtModel;

