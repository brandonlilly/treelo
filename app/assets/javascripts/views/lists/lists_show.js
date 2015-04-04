TrelloClone.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],
  tagName: 'li',
  className: 'list',
  events: {},

  initialize: function () {
    this.listenTo(this.model, 'sync remove add', this.render);
    this.listenTo(this.model.cards(), 'sync remove', this.render);
    this.listenTo(this.model.cards(), 'add', this.renderAndFocus);
  },

  render: function () {
    var list = this.model;

    var content = this.template({ list: this.model });
    this.$el.html(content);

    var cards = this.model.cards();
    if (cards) {
      cards.forEach(function (card) {
        var cardView = new TrelloClone.Views.CardsShow({ model: card });
        this.$('.cards').append(cardView.render().$el);
      }.bind(this));
    }

    var card = new TrelloClone.Models.Card({ list_id: list.id });
    var cardsForm = new TrelloClone.Views.CardsForm({
      model: card,
      collection: list.cards(),
    });
    this.$('.cards').append(cardsForm.render().$el);

    return this;
  },

  renderAndFocus: function () {
    this.render();
  },


});
