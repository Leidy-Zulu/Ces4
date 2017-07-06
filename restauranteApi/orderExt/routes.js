var { Router, Route } = require('../router');
var { orderExtController } = require('./controller');
var { OrderExtModel } = require('./model');
var authController = require('../oauth2/auth');

class OrderExtRouter extends Router {

    constructor(app) {
        super(app);
        app.param('orderExtId', orderExtController.loadOrderExtById);
    }

    get routes() {
        return {
            '/orderExt': [
                new Route("post","sendOrder"),
                new Route("get","getProducts")
            ]
        };
    }

    sendOrder(req, res, next){
        orderExtController.sendOrder(req, res, next);
    }

    sendOrderText(req, res, next){
        orderExtController.sendOrderText(req, res, next);
    }

    getProducts(req, res, next) {
        orderExtController.listProduct(req.query, res, next);
    }
}
exports.OrderExtRouter = OrderExtRouter;