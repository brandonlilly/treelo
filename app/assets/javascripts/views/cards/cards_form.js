TrelloClone.Views.CardsForm = Backbone.View.extend({
  template: JST['cards/form'],
  tagName: 'li',
  className: 'card-form',
  events: {
    'submit form': 'create',
    'keypress form': 'checkEnter'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },

  create: function (event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();

    this.model.save(attributes, {
      success: function (model, response) {
        this.collection.add(model);
        this.$('textarea').focus();
      }.bind(this)
    });

  },

  checkEnter: function (event) {
    if (event.which === 13) {
      $(event.currentTarget).submit();
    }
  }


});
