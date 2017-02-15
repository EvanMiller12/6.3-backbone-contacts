var $ = require('jquery');
var Backbone = require('backbone');

var contactFormTemplate = require('../../templates/contact_form.hbs');
var contactInfoTemplate = require('../../templates/contact_info.hbs');

var ContactForm = Backbone.View.extend({
  tagName: 'form',
  id: 'contact-form',
  class: 'well',

  events: {
    'submit': 'createContact'
  },

  createContact: function(event){
    event.preventDefault();

    var contacts = {
      contactName: $('#contactName').val(),
      contactNumber: $('#number').val(),
      contactEmail: $('#email').val(),
      contactLinkedin: $('#linkedin').val()
    }
    this.collection.create(contacts);
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

  renderContactInfo: function(info){
    var contactInfo = new ContactInfoView({model: info});
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

  deleteContact: function(){
    this.model.destroy();
  },

  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    return this;
  }
})

module.exports = {
  ContactForm: ContactForm,
  ContactList: ContactList,
  ContactInfoView: ContactInfoView
}
