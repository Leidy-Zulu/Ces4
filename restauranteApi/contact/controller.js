var { ContactModel } = require('./model');

class ContactController {
    loadContactById(req, res, next, id) {
        ContactModel.getContactById(id)
            .then(contact => {
                req.contact = contact;
                return next();
            })
            .catch(e => next(e));
    }

    createContact(req, res, next) {
        let contact = new ContactModel(req.body);
        contact.save()
            .then(savedContact => res.json(savedContact))
            .catch(e => next(e));
    }

    listContacts(query, res, next) {
         if(query.name != null && query.name != undefined){
             ContactModel.getContactByName(query.name)
            .then(contact => {
                res.json(contact);
            })
            .catch(e => {
            res.send(404, e.message);
            }
            );
        }else{
        const { limit = 50, skip = 0 } = query;
        ContactModel.list({ limit, skip })
            .then(contactList => res.json(contactList))
            .catch(e => next(e));
        }
    }

    updateContact(persitedContact, updatedContactState, res, next) {
        Object.keys(updatedContactState).filter(propertyName => persitedContact[propertyName] && propertyName !== '_id' && propertyName !== '__v').forEach(propertyName => {
            persitedContact[propertyName] = updatedContactState[propertyName];
        });
        persitedContact.save()
            .then(savedContact => res.json(savedContact))
            .catch(e => next(e));
    }

    deleteContact(persitedContact, res, next) {
        persitedContact.remove()
            .then(deletedContact => res.json(deletedContact))
            .catch(e => next(e));
    }
}

exports.contactController = new ContactController();