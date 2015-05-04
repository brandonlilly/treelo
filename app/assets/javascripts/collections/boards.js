TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: '/api/boards',
  model: TrelloClone.Models.Board,

  getOrFetch: function (id) {
    var boards = this;

    var board = this.get(id);
    if (board) {
      board.fetch();
    } else {
      board = new TrelloClone.Models.Board({ id: id });
      board.fetch({
        success: function() {
          boards.add(board);
        }
      });
    }

    return board;
  }
});
