var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var { ContactRouter } = require('./contact/routes');
var { ProductRouter } = require('./product/routes');
var { OrderRouter } = require('./order/routes');

var { ClientRouter } = require('./oauth2/client/routes');
var { UserRouter } = require('./oauth2/user/routes');

mongoose.connect('mongodb://localhost:27017/restarantedb');
let app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
let contactRouter = new ContactRouter(app);
let productRouter = new ProductRouter(app);
let orderRouter = new OrderRouter(app);

let clientRouter = new ClientRouter(app); 
let userRouter = new UserRouter(app); 

var server = app.listen(3000, function () {
    console.log(`Server listening on port ${server.address().port}`);
});