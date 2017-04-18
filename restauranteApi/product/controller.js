var { ProductModel } = require('./model');

class ProductController {
    loadProductById(req, res, next, id) {
        ProductModel.getProductById(id)
            .then(product => {
                req.product = product;
                return next();
            })
            .catch(e => next(e));
    }



    createProduct(req, res, next) {
        let product = new ProductModel(req.body);
        product.save()
            .then(savedProduct => res.json(savedProduct))
            .catch(e => next(e));
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
            .then(productList => res.json(productList))
            .catch(e => next(e));
        }
        
    }

    updateProduct(persitedProduct, updatedProductState, res, next) {
        Object.keys(updatedProductState).filter(propertyName => persitedProduct[propertyName] && propertyName !== '_id' && propertyName !== '__v').forEach(propertyName => {
            persitedProduct[propertyName] = updatedProductState[propertyName];
        });
        persitedProduct.save()
            .then(savedProduct => res.json(savedProduct))
            .catch(e => next(e));
    }

    deleteProduct(persitedProduct, res, next) {
        persitedProduct.remove()
            .then(deletedProduct => res.json(deletedProduct))
            .catch(e => next(e));
    }
}

exports.productController = new ProductController();