var $ = require('jquery');

var models = require('./models/contact.js');
var views = require('./views/contact.js');

$(function(){

  var contacts = new models.ContactCollection();

  var contactForm = new views.ContactForm({collection: contacts});
  $('.home').append(contactForm.render().el);

  var contactList = new views.ContactList({collection: contacts});
  $('.app').append(contactList.render().el);

  contacts.fetch();

});
