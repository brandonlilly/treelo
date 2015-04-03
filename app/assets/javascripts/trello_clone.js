window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("Backbone starting");
    new TrelloClone.Routers.TrelloRouter($('#main'));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
