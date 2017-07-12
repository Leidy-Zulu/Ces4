var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PhoneSchema = new Schema({
    descripcion: String,
    number: String,
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    }
});
PhoneSchema.index({ location: '2dsphere' });

const ContactSchema = new Schema({
    name: String,
    surname: String,
    phoneList: [PhoneSchema]
});

ContactSchema.statics = {
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .exec();
    },
    getContactById(id) {
        return this.findById(id)
            .exec()
            .then((contact) => {
                if (contact) {
                    return contact;
                }
                const err = new Error(`No existe contacto con id ${id}`);
                return Promise.reject(err);
            });
    },

    getContactByName(nameContact){
        console.log(nameContact);
        return this.find({name: new RegExp(nameContact, 'i')})
            .exec()
            .then((contact) => {
                if (contact.length) {
                  console.log(contact.length);
                    return Promise.resolve(contact);
                }
                const err = new Error(`No existe contacto con el nombre ${nameContact}`);
                return Promise.reject(err);
            });
    }
};
const ContactModel = mongoose.model('Contact', ContactSchema);
exports.ContactModel = ContactModel;