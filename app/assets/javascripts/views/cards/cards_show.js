TrelloClone.Views.CardsShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: 'li',
  className: 'card',
  events: {
    'cardupdate': 'update',
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },

  update: function (event, index) {
    this.collection.remove(this.model, { silent: true });
    this.$el.trigger('updatelist', [this.model, index]);
  },

});
