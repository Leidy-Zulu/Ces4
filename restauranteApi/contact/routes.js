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
        if(authController.validateRole(["admin"], req.user)){
           contactController.createContact(req, res, next);
        }else{
            res.send(401, "Unauthorized");
        }         
    }

    getContactList(req, res, next) {
        if(authController.validateRole(["admin","delivery"], req.user)){
           contactController.listContacts(req.query, res, next);
        }else{
            res.send(401, "Unauthorized");
        }          
    }

    getContact(req, res, next) {
        if(authController.validateRole(["admin","delivery"], req.user)){
           return res.json(req.contact);
        }else{
            res.send(401, "Unauthorized");
        }         
    }

    updateContact(req, res, next) {
        if(authController.validateRole(["admin"], req.user)){
           contactController.updateContact(req.contact, req.body, res, next);
        }else{
            res.send(401, "Unauthorized");
        }         
    }

    deleteContact(req, res, next) {
        if(authController.validateRole(["admin"], req.user)){
           contactController.deleteContact(req.contact, res, next);
        }else{
            res.send(401, "Unauthorized");
        }         
    }
}
exports.ContactRouter = ContactRouter;