var { Router, Route } = require('../router');
var { productController } = require('./controller');
var { ProductModel } = require('./model');

class ProductRouter extends Router {

    constructor(app) {
        super(app);
        app.param('productId', productController.loadProductById);
    
    }

    get routes() {
        return {
            '/product': [
                new Route("get", "getProductList"),
                new Route("post", "createProduct")
            ],
            '/product/:productId': [
                new Route("get", "getProduct"),
                new Route("put", "updateProduct"),
                new Route("delete", "deleteProduct")
            ]
        };
    }

    createProduct(req, res, next) {
        productController.createProduct(req, res, next);
    }

    getProductList(req, res, next) {
        console.log(req);
        productController.listProduct(req.query, res, next);
    }


    getProduct(req, res, next) {
        return res.json(req.product);
    }

    updateProduct(req, res, next) {
        productController.updateProduct(req.product, req.body, res, next);
    }

    deleteProduct(req, res, next) {
        productController.deleteProduct(req.product, res, next);
    }
}
exports.ProductRouter = ProductRouter;