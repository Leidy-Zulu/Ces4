var { Router, Route } = require('../router');
var { orderController } = require('./controller');
var { OrderModel } = require('./model');
var authController = require('../oauth2/auth');

class OrderRouter extends Router {

    constructor(app) {
        super(app);
        app.param('orderId', orderController.loadOrderById);
    }

    get routes() {
        return {
            '/order': [
                new Route("get", [authController.isAuthenticated,"getOrderList"]),
                new Route("post","createOrder")
            ],
            '/order/:orderId': [
                new Route("get", [authController.isAuthenticated,"getOrder"]),
                new Route("put", [authController.isAuthenticated, "updateOrder"]),
                new Route("delete", [authController.isAuthenticated, "deleteOrder"])
            ]
        };
    }

    createOrder(req, res, next) {
        if(authController.validateRole(["admin"], req.user)){
          orderController.createOrder(req, res, next);
        }else{
            res.send(401, "Unauthorized");
        }          
    }

    getOrderList(req, res, next) {
         if(authController.validateRole(["admin","delivery"], req.user)){
           orderController.listOrder(req.query, res, next);
        }else{
            res.send(401, "Unauthorized");
        }        
    }

    getOrder(req, res, next) {
        if(authController.validateRole(["admin","delivery"], req.user)){
           return res.json(req.order);
        }else{
            res.send(401, "Unauthorized");
        }        
    }

    updateOrder(req, res, next) {
        if(authController.validateRole(["admin"], req.user)){
           orderController.updateOrder(req.order, req.body, res, next);
        }else{
            res.send(401, "Unauthorized");
        } 
        
    }

    deleteOrder(req, res, next) {
        if(authController.validateRole(["admin"], req.user)){
           orderController.deleteOrder(req.order, res, next);
        }else{
            res.send(401, "Unauthorized");
        }         
    }
}
exports.OrderRouter = OrderRouter;