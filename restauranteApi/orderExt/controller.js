var { OrderExtModel } = require('./model');
var { Client } = require('../amqp/request_reply');
var { ProductModel } = require('../product/model');

class OrderExtController {
    loadOrderExtById(req, res, next, id) {
        OrderExtModel.getOrderExtById(id)
            .then(orderExt => {
                req.orderExt = orderExt;
                return next();
            })
            .catch(e => next(e));
    }

    sendOrder(req, res, next) {
        //Se crea la instancia de cliente que sera usada para realizar la peticion
           let client = new Client('amqp://ces4:ces4@localhost:5672','Cola');
            /**
             * Se envia la peticion, el primer parametro es el mensaje que sera enviado como peticion,
             * el segundo parametro es el callback que sera invocado cuando sea recibida la respuesta
             */

            client.sendRequest(JSON.stringify(req.body), function(reply){
                console.log(`Respuesta recibida con exito ${reply}`);
            });
    }

    listProduct(query, res, next) {
        if(query.name != null && query.name != undefined){
             ProductModel.getProductByName(query.name)
            .then(product => {
                console.log(product);
                res.json(product);
            })
            .catch(e => {
            console.log(e);
            res.send(404, e.message);
            }
            
            );
        
        }else{
            const { limit = 50, skip = 0 } = query;
            ProductModel.list({ limit, skip })
            .then(function(productList){
                console.log(productList[0])
                let client = new Client('amqp://ces4:ces4@localhost:5672','Cola');
                /**
                 * Se envia la peticion, el primer parametro es el mensaje que sera enviado como peticion,
                 * el segundo parametro es el callback que sera invocado cuando sea recibida la respuesta
                 */

                client.sendRequest(JSON.stringify(productList), function(reply){
                    console.log(`Respuesta recibida con exito ${reply}`);
                });
                res.json(productList);
                })
            .catch(e => next(e));
        }
    }
}
exports.orderExtController = new OrderExtController();