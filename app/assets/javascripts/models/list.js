TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: '/api/lists',

  cards: function () {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], { list: this });
    }
    return this._cards;
  },

  parse: function (response) {
    // debugger
    if (response.cards) {
      // debugger
      this.cards().set(response.cards);
      delete response.cards;
    }
    return response;
  }

});
