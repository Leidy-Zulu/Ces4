var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var { ContactRouter } = require('./contact/routes');
var { ProductRouter } = require('./product/routes');
var { OrderRouter } = require('./order/routes');
var { AmqpReceiver } = require('./amqp/receiver');
var { AmqpSender } = require('./amqp/sender');

mongoose.connect('mongodb://localhost:27017/restarantedb');
let app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
let contactRouter = new ContactRouter(app);
let productRouter = new ProductRouter(app);
let orderRouter = new OrderRouter(app);


var server = app.listen(3000, function () {
    console.log(`Server listening on port ${server.address().port}`);
});