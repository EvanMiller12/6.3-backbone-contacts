var $ = require('jquery');
var Backbone = require('backbone');

var contactFormTemplate = require('../../templates/contact_form.hbs');
var contactInfoTemplate = require('../../templates/contact_info.hbs');

// $.fn.serializeObject = function(){
//   return this.serializeArray().reduce(function(acum, i){
//     acum[i.name] = i.value;
//     return acum;
//   }, {});
// }

var ContactForm = Backbone.View.extend({
  tagName: 'form',
  id: 'contact-form',
  className: 'well',

  events: {
    'submit .submit-button': 'createContact'
  },

  createContact: function(event){
    event.preventDefault();

    var contacts = {
      contactName: $('#contactName').val(),
      number: $('#number').val(),
      email: $('#email').val(),
      linkedin: $('#linkedin').val()
    }
    this.collection.create({contacts});

  },
  render: function(){
    this.$el.html(contactFormTemplate());
    return this;
  }
});

var ContactList = Backbone.View.extend({
  tagName:'ul',
  className: 'contact-group',

  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderContactInfo);
  },
  renderContactInfo: function(contact){
    var contactInfo = new ContactInfoView({model: contact});
    this.$el.append(contactInfo.render().el);
  },
  render: function(){
    return this;
  }
});

var ContactInfoView = Backbone.View.extend({
  tagName: 'li',
  className: 'contact-group-info contactInfo',
  template: contactInfoTemplate,

  events: {
    'click .delete-contact': 'deleteContact'
  },

  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
  },

  deleteContact: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  render: function(){
    var context = this.model.toJSON();
    var contact = this.template(context)
    this.$el.html(contact);
    return this;
  }
})

module.exports = {
  ContactForm: ContactForm,
  ContactList: ContactList,
  ContactInfoView: ContactInfoView
}
