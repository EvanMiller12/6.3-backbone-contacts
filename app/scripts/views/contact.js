var $ = require('jquery');
var Backbone = require('backbone');

var contactControlTemplate = require('../../templates/contact_control.hbs');
var contactFormTemplate = require('../../templates/contact_form.hbs');
var contactInfoTemplate = require('../../templates/contact_info.hbs');

// $.fn.serializeObject = function(){
//   return this.serializeArray().reduce(function(acum, i){
//     acum[i.name] = i.value;
//     return acum;
//   }, {});
// }

var ContactFormControl = Backbone.View.extend({
  tagName: 'div',
  className: 'form-control-wrapper',
  template: contactControlTemplate,
  
  events: {
    'click .form-toggler': 'toggleContactForm'
  },

  toggleContactForm: function() {
    $('#contact-form').slideToggle();
  },
  
  render: function() {
    this.$el.html(this.template());
    return this;
  }
})

var ContactForm = Backbone.View.extend({
  tagName: 'form',
  id: 'contact-form',
  template: contactFormTemplate,

  events: {
    'submit': 'createContact'
  },

  createContact: function(e){
    e.preventDefault();

    var contacts = {
      firstName: $('#first-name').val(),
      lastName: $('#last-name').val(),
      phoneNumber: $('#c-number').val(),
      email: $('#email').val(),
      linkedin: $('#linkedin').val()
    }
    this.collection.create(contacts);
    
    $('#first-name').val('');
    $('#last-name').val('');
    $('#c-number').val('');
    $('#email').val('');
    $('#linkedin').val();
  },

  render: function(){
    this.$el.html(this.template());
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
  }
});

var ContactInfoView = Backbone.View.extend({
  tagName: 'li',
  className: 'contact-group-info contactInfo',
  template: contactInfoTemplate,

  events: {
    'click .delete-contact': 'deleteContact',
    'click .edit-contact' : 'editContact'
  },

  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
  },

  deleteContact: function(e){
    e.preventDefault();
    this.model.destroy();
  },

  // editContact: function(e) {
  //   e.preventDefault();
    
  //   var currContext = this.model.toJSON();
 
  //   $('#contact-form').show();
  //   $('.edit-contact').hide();
  //   $('.update-contact').show();

  //   $('#first-name').val(currContext.firstName);
  //   $('#last-name').val(currContext.lastName);
  //   $('#c-number').val(currContext.phoneNumber);
  //   $('#email').val(currContext.email);
  //   $('#linkedin').val(currContext.linkedin);

  // },

  //   updateContact: function(e) {
  //   e.preventDefault();
    
  //    var updatedContact = {
  //     firstName: $('#first-name').val(),
  //     lastName: $('#last-name').val(),
  //     phoneNumber: $('#c-number').val(),
  //     email: $('#email').val(),
  //     linkedin: $('#linkedin').val()
  //   }
  //   this.model.set(updatedContact);
  //   console.log('clicked');
  // },

  render: function(){
    var context = this.model.toJSON();
    var contact = this.template(context)
    this.$el.html(contact);
    return this;
  }
})

module.exports = {
  ContactFormControl,
  ContactForm,
  ContactList,
  ContactInfoView
}
