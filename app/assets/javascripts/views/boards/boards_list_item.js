TrelloClone.Views.BoardsListItem = Backbone.View.extend({
  template: JST['boards/list_item'],
  tagName: 'li',
  className: 'board',
  events: {
    'click': 'showBoard'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync add remove', this.render);
  },

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  showBoard: function (event) {
    Backbone.history.navigate('#/boards/' + this.model.id, { trigger: true });
  },

});
