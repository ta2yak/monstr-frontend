var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ActionTypes = MonstrConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    MonstrAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveSearchResults: function(json, errors) {
    MonstrAppDispatcher.handleServerAction({
      type: ActionTypes.SEARCH_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveCreatedPost: function(json, errors) {
    MonstrAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_POST,
      json: json,
      errors: errors
    });
  }  
};
