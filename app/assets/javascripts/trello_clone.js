window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new TrelloClone.Routers.TrelloRouter($('#main'));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
