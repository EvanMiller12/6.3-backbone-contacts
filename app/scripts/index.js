var $ = require('jquery');

var models = require('./models/contact.js');
var views = require('./views/contact.js');

$(function(){

  var contactCollection = new models.ContactCollection();

  var contactForm = new views.ContactForm({collection: contactCollection});
  $('.form-input').append(contactForm.render().el);

  var contactList = new views.ContactList({collection: contactCollection});
  $('.app').append(contactList.render().el);

  contactCollection.fetch();

});
