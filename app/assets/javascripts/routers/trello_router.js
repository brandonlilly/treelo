TrelloClone.Routers.TrelloRouter = Backbone.Router.extend({

  routes: {
    '': 'index',
    'boards/:id': 'show',
    'boards': 'index',
  },

  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.boards = new TrelloClone.Collections.Boards();
    this.boards.fetch();
  },

  index: function () {
    this.boards.fetch();
    var view = new TrelloClone.Views.BoardsIndex({
      collection: this.boards
    });
    this._swapView(view);
  },

  show: function (id) {
    board = this.boards.getOrFetch(id);
    var view = new TrelloClone.Views.BoardsShow({ model: board });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._current_view && this._current_view.remove()
    this._current_view = view;
    this.$rootEl.html(view.render().$el);
  }

});
