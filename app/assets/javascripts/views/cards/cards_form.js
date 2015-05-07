TrelloClone.Views.CardsForm = Backbone.View.extend({
  template: JST['cards/form'],
  tagName: 'li',
  className: 'card-form',
  events: {
    'submit form': 'create',
    'keypress form': 'checkEnter',
    'focus textarea': 'removePlaceholder',
    'blur textarea': 'addPlaceholder',
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },

  create: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var attributes = $form.serializeJSON();

    var ord = 0
    if (this.collection.length > 0) {
      var lastCard = this.collection.max(function (card) {
        return card.get('ord');
      });
      ord = lastCard.get('ord') + 1
    }
    attributes.ord = ord;

    if ($form.find('textarea').val() !== '') {
      this.model.save(attributes, {
        success: function (model, response) {
          this.collection.add(model);
          this.$('textarea').focus();
        }.bind(this)
      });
    }
  },

  checkEnter: function (event) {
    var $form = $(event.currentTarget);
    if (event.which === 13) {
      event.preventDefault();
      if ($form.find('textarea').val() !== '') {
        $form.submit();
      }
    }
  },

  removePlaceholder: function (event) {
    var textarea = $(event.currentTarget);
    textarea.attr('placeholder', '');
  },

  addPlaceholder: function (event) {
    var textarea = $(event.currentTarget);
    textarea.attr('placeholder', "Add a leaf...");
  },


});
