var { Router, Route } = require('../router');
var { contactController } = require('./controller');
var { ContactModel } = require('./model');

class ContactRouter extends Router {

    constructor(app) {
        super(app);
        app.param('contactId', contactController.loadContactById);
    }

    get routes() {
        return {
            '/contacts': [
                new Route("get", "getContactList"),
                new Route("post", "createContact")
            ],
            '/contacts/:contactId': [
                new Route("get", "getContact"),
                new Route("put", "updateContact"),
                new Route("delete", "deleteContact")
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