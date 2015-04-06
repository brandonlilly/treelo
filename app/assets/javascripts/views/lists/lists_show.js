TrelloClone.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],
  tagName: 'li',
  className: 'list',
  events: {
    'updatelist': 'updateList'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync remove add', this.render);
    this.listenTo(this.model.cards(), 'sync remove add', this.render);
  },

  render: function () {
    var list = this.model;

    var content = this.template({ list: list });
    this.$el.html(content);

    var cards = list.cards();
    if (cards) {
      cards.forEach(function (card) {
        var cardView = new TrelloClone.Views.CardsShow({
          model: card,
          collection: cards
        });
        this.$('.cards').append(cardView.render().$el);
      }.bind(this));
    }

    this.$('.cards').sortable({
      connectWith: '.cards',
      items: '.card',
      update: function(event, ui) {
        ui.item.trigger('cardupdate', ui.item.index());
      }.bind(this),
    });

    var card = new TrelloClone.Models.Card({ list_id: list.id });
    var cardsForm = new TrelloClone.Views.CardsForm({
      model: card,
      collection: cards,
    });
    this.$('.cards').append(cardsForm.render().$el);

    return this;
  },

  updateList: function (event, movedCard, position) {
    var list = this.model;
    var cards = list.cards();

    movedCard.set('list_id', list.id);

    cards.each(function (model, index) {
      var ordinal = index;
      if (index >= position) {
        ordinal += 1;
      }
      model.set('ord', ordinal);
    });

    movedCard.set('ord', position);
    cards.add(movedCard, {at: position});

    cards.each(function (card) {
      card.save();
    });
  },


});
