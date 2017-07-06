var { Router, Route } = require('../router');
var { orderController } = require('./controller');
var { OrderModel } = require('./model');
var authController = require('../oauth2/auth');

class OrderRouter extends Router {

    constructor(app) {
        super(app);
        console.log(orderController.loadOrderById);
        app.param('orderId', orderController.loadOrderById);
    }

    get routes() {
        return {
            '/order': [
                new Route("get", [authController.isAuthenticated, "getOrderList"]),
                new Route("post","createOrder"),
                new Route("post","prueba")
            ],
            '/order/:orderId': [
                new Route("get","getOrder"),
                new Route("put", [authController.isAuthenticated, "updateOrder"]),
                new Route("delete", [authController.isAuthenticated, "deleteOrder"])
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

    prueba(req, res, next){
        return res.json(req.order);
    }
}
exports.OrderRouter = OrderRouter;