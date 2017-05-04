var { Router, Route } = require('../../router');
var { clientController } = require('./controller');

class ClientRouter extends Router {
    constructor(app) {
        super(app);
    }

    get routes() {
        return {
            '/client': [
                new Route("post", "createClient")
            ],
            '/client/:clientId': [
                new Route("get", "getClient")
            ]
        };
    }

    createClient(req, res, next) {
        clientController.createClient(req, res, next);
    }

    getClient(req, res, next) {
        clientController.getClientById(req, res, next);
    }
}

exports.ClientRouter = ClientRouter;