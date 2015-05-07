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
    var attributes = $(event.currentTarget).serializeJSON();

    this.model.save(attributes, {
      success: function (model, response) {
        this.collection.add(model);
        this.$('textarea').focus();
      }.bind(this)
    });

  },

  checkEnter: function (event) {
    var $form = $(event.currentTarget);
    if (event.which === 13 && $form.val() !== '') {
      if ($form.val() === '') {
        event.preventDefault();
      } else {
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
    textarea.attr('placeholder', "Add a card...");
  },


});
