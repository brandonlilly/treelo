TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: '/api/lists',
  model: TrelloClone.Models.List,
  // comparator: 'ord',
  comparator: function (list) {
    return list.get('ord');
  },
  initialize: function (models, options) {
    this.board = options.board;
  },


});
