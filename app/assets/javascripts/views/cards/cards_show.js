TrelloClone.Views.CardsShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: 'li',
  className: 'card',
  events: {},

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },


});
