var { Router, Route } = require('../router');
var { orderController } = require('./controller');
var { OrderModel } = require('./model');

class OrderRouter extends Router {

    constructor(app) {
        super(app);
        app.param('orderId', orderController.loadOrderById);
    }

    get routes() {
        return {
            '/order': [
                new Route("get", "getOrderList"),
                new Route("post", "createOrder")
            ],
            '/order/:orderId': [
                new Route("get", "getOrder"),
                new Route("put", "updateOrder"),
                new Route("delete", "deleteOrder")
            ]
        };
    }

    createOrder(req, res, next) {
        orderController.createOrder(req, res, next);
    }

    getOrderList(req, res, next) {
        orderController.listOrder(req.query, res, next);
    }

    getOrder(req, res, next) {
        return res.json(req.order);
    }

    updateOrder(req, res, next) {
        orderController.updateOrder(req.order, req.body, res, next);
    }

    deleteOrder(req, res, next) {
        orderController.deleteOrder(req.order, res, next);
    }
}
exports.OrderRouter = OrderRouter;