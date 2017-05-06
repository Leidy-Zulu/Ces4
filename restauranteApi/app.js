var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var { ContactRouter } = require('./contact/routes');
var { ProductRouter } = require('./product/routes');
var { OrderRouter } = require('./order/routes');

var { ClientRouter } = require('./oauth2/client/routes');
var { UserRouter } = require('./oauth2/user/routes');
var { OAuth2Router } = require('./oauth2/routes');

mongoose.connect('mongodb://localhost:27017/restarantedb');
let app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(session({
    secret: 'euSc5kjNOOqSF8LLNl5U',
    saveUninitialized: true,
    resave: true
}));
let contactRouter = new ContactRouter(app);
let productRouter = new ProductRouter(app);
let orderRouter = new OrderRouter(app);

let clientRouter = new ClientRouter(app);
let userRouter = new UserRouter(app);
let oauth2Router = new OAuth2Router(app);

var server = app.listen(3000, function () {
    console.log(`Server listening on port ${server.address().port}`);
});