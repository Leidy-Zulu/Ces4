var { Router, Route } = require('../router');
var { contactController } = require('./controller');
var { ContactModel } = require('./model');
var authController = require('../oauth2/auth');

class ContactRouter extends Router {

    constructor(app) {
        super(app);
        app.param('contactId', contactController.loadContactById);
    }

    get routes() {
        return {
            '/contacts': [
                new Route("get", [authController.isAuthenticated, "getContactList"]),
                new Route("post", [authController.isAuthenticated, "createContact"])
            ],
            '/contacts/:contactId': [
                new Route("get", [authController.isAuthenticated, "getContact"]),
                new Route("put", [authController.isAuthenticated, "updateContact"]),
                new Route("delete", [authController.isAuthenticated, "deleteContact"])
            ]
        };
    }

    createContact(req, res, next) {
        contactController.createContact(req, res, next);
    }

    getContactList(req, res, next) {
        contactController.listContacts(req.query, res, next);
    }

    getContact(req, res, next) {
        return res.json(req.contact);
    }

    updateContact(req, res, next) {
        contactController.updateContact(req.contact, req.body, res, next);
    }

    deleteContact(req, res, next) {
        contactController.deleteContact(req.contact, res, next);
    }
}
exports.ContactRouter = ContactRouter;