var { Router, Route } = require('../router');
var { productController } = require('./controller');
var { ProductModel } = require('./model');
var authController = require('../oauth2/auth');

class ProductRouter extends Router {

    constructor(app) {
        super(app);
        app.param('productId', productController.loadProductById);
    
    }

    get routes() {
        return {
            '/product': [
                new Route("get", [authController.isAuthenticated, "getProductList"]),
                new Route("post", [authController.isAuthenticated, "createProduct"])
            ],
            '/product/:productId': [
                new Route("get", [authController.isAuthenticated, "getProduct"]),
                new Route("put", [authController.isAuthenticated, "updateProduct"]),
                new Route("delete", [authController.isAuthenticated, "deleteProduct"])
            ]
        };
    }

    createProduct(req, res, next) {
        if(authController.validateRole(["admin"], req.user)){
           productController.createProduct(req, res, next);
        }else{
            res.send(401, "Unauthorized");
        }  
        
    }

    getProductList(req, res, next) {
        if(authController.validateRole(["admin","delivery"], req.user)){
            productController.listProduct(req.query, res, next);
        }else{
            res.send(401, "Unauthorized");
        }
    }


    getProduct(req, res, next) {
        if(authController.validateRole(["admin","delivery"], req.user)){
            return res.json(req.product);
        }else{
            res.send(401, "Unauthorized");
        }        
    }

    updateProduct(req, res, next) {
        if(authController.validateRole(["admin"], req.user)){
           productController.updateProduct(req.product, req.body, res, next);
        }else{
            res.send(401, "Unauthorized");
        }        
    }

    deleteProduct(req, res, next) {
        if(authController.validateRole(["admin"], req.user)){
           productController.deleteProduct(req.product, res, next);
        }else{
            res.send(401, "Unauthorized");
        }        
    }
}
exports.ProductRouter = ProductRouter;