var { OrderModel } = require('./model');
var { Client } = require('../amqp/request_reply');

class OrderController {
    loadOrderById(req, res, next, id) {
        OrderModel.getOrderById(id)
            .then(order => {
                req.order = order;
                return next();
            })
            .catch(e => next(e));
    }

    createOrder(req, res, next) {
        let order = new OrderModel(req.body);
        order.save()
            .then(savedOrder => res.json(savedOrder))
            .catch(e => next(e));
    }

    //console.log('Se guardó ' + order);

    listOrder(query, res, next) {
         if(query.name != null && query.name != undefined){
             OrderModel.getOrderByStatus(query.name)
            .then(orderList => {
                res.json(orderList);
            })
            .catch(e => {
            console.log(e);
            res.send(404, e.message);
            });
        }else{
            const { limit = 50, skip = 0 } = query;
        OrderModel.list({ limit, skip })
            .then(orderList => res.json(orderList))
            .catch(e => next(e));
        }
    }

    updateOrder(persitedOrder, updatedOrderState, res, next) {
        Object.keys(updatedOrderState).filter(propertyName => persitedOrder[propertyName] && propertyName !== '_id' && propertyName !== '__v').forEach(propertyName => {
            persitedOrder[propertyName] = updatedOrderState[propertyName];
        });
        persitedOrder.save()
            .then(savedOrder => res.json(savedOrder))
            .catch(e => next(e));
    }

    deleteOrder(persitedOrder, res, next) {
        persitedOrder.remove()
            .then(deletedOrder => res.json(deletedOrder))
            .catch(e => next(e));
    }
}

exports.orderController = new OrderController();