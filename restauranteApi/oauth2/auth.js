var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy
var User = require('../user/model');
var Client = require('../client/model');
var Token = require('../token/model');

passport.use(new BasicStrategy(
    function (username, password, callback) {
        User.findOne({ username: username })
            .exec()
            .then((user) => {

                if (!user) { return callback(null, false); }

                user.verifyPassword(password, function (err, isMatch) {
                    if (err) { return callback(err); }

                    if (!isMatch) { return callback(null, false); }

                    return callback(null, user);
                });
            }).catch(e => callback(e));
    }
));

passport.use('client-basic', new BasicStrategy(
    function (clientId, secret, callback) {
        Client.findOne({ id: clientId })
            .exec()
            .then((client) => {

                if (!client) { return callback(null, false); }

                client.verifySecret(secret, function (err, isMatch) {
                    if (err) { return callback(err); }

                    if (!isMatch) { return callback(null, false); }

                    return callback(null, client);
                });
            }).catch(e => callback(e));
    }
));

passport.use(new BearerStrategy(
    function (accessToken, callback) {
        Token.findOne({ value: accessToken })
            .exec()
            .then((token) => {

                if (!token) { return callback(null, false); }

                User.findOne({ _id: token.userId })
                    .exec()
                    .then((user) => {

                        if (!user) { return callback(null, false); }

                        callback(null, user, { scope: '*' });
                    }).catch(e => callback(e));
            }).catch(e => callback(e));
    }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });