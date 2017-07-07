var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var { ContactRouter } = require('./contact/routes');
var { ProductRouter } = require('./product/routes');
var { OrderRouter } = require('./order/routes');
var { OrderExtRouter } = require('./orderExt/routes');
var { Server } = require('./amqp/request_reply');

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
let orderExtRouter = new OrderExtRouter(app);

let clientRouter = new ClientRouter(app);
let userRouter = new UserRouter(app);
let oauth2Router = new OAuth2Router(app);

var server = app.listen(3000, function () {
    console.log(`Server listening on port ${server.address().port}`);
});

let server1 = new Server('amqp://ces4:ces4@localhost:5672','Cola');
/**
 * El servidor es un listener, por tal motivo se inicia para que escuche por peticiones
 * el metodo start recibe un handler que tienen el metodo processRequestMessage, dicho metodo debe retornar
 * una instancia de promise, dicha instancia debe invocar la funcion resolve pasando como parametro la cadena de
 * texto que sera enviada como respuesta
 */
server1.start({
    processRequestMessage: function(message){
        return new Promise(function(resolve) {
            console.log(`Peticion recibida con exito ${message}`); 
            orderRouter.createOrder(message);
            resolve('Respuesta');
        });
    }
});