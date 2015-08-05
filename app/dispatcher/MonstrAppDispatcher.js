var MonstrConstants = require('../constants/MonstrConstants.js');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = MonstrConstants.PayloadSources;

var MonstrAppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    setTimeout(function(){
      this.dispatch(payload);
    }.bind(this))
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    setTimeout(function(){
      this.dispatch(payload);
    }.bind(this))
  }
});

module.exports = MonstrAppDispatcher;
