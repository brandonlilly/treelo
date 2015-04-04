TrelloClone.Views.BoardsShow = Backbone.View.extend({
  template: JST['boards/show'],

  events: {

  },

  initialize: function () {
    this.listenTo(this.model, 'sync remove add', this.render);
    this.listenTo(this.model.lists(), 'sync remove add', this.render);
  },

  render: function () {
    var board = this.model;

    var content = this.template({ board: board });
    this.$el.html(content);

    var lists = this.model.lists();
    if (lists) {
      lists.forEach(function (list) {
        var listView = new TrelloClone.Views.ListsShow({
          model: list
        });
        this.$('.lists').append(listView.render().$el);
      }.bind(this));
    }

    var list = new TrelloClone.Models.List({ board_id: board.id });
    var listsForm = new TrelloClone.Views.ListsForm({
      model: list,
      collection: board.lists(),
    });
    this.$('.lists').append(listsForm.render().$el);

    return this;
  },


});
