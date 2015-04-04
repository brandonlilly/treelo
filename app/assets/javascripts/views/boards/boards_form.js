TrelloClone.Views.BoardsForm = Backbone.View.extend({
  template: JST['boards/form'],
  tagName: 'li',
  className: 'board-form',
  events: {
    'submit form': 'create'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    return this;
  },

  create: function (event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();

    this.model.save(attributes, {
      success: function (model, response) {
        this.collection.add(model);
      }.bind(this)
    });

  }


});
