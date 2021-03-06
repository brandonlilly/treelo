TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],

  events: {
    'focus input': 'removePlaceholder',
    'blur input': 'addPlaceholder',
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync remove add', this.render);
  },

  render: function () {
    var content = this.template({ boards: this.collection });
    this.$el.html(content);

    this.collection.forEach(function (board) {
      var listItem = new TrelloClone.Views.BoardsListItem({
        model: board
      });
      this.$('.boards').append(listItem.render().$el);
    }.bind(this));

    var board = new TrelloClone.Models.Board();
    var boardsForm = new TrelloClone.Views.BoardsForm({
      model: board,
      collection: this.collection,
    });
    this.$('.boards').append(boardsForm.render().$el);

    return this;
  },

  removePlaceholder: function (event) {
    var input = $(event.currentTarget);
    input.attr('placeholder', '');
  },

  addPlaceholder: function (event) {
    var input = $(event.currentTarget);
    input.attr('placeholder', "Create a new tree...");
  },


});
