var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ActionTypes = MonstrConstants.ActionTypes;

module.exports = {

  /** AUTH **/
  receiveLogin: function(json, errors) {
    MonstrAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  /** SEARCH **/
  receiveSearchResults: function(json, errors) {
    MonstrAppDispatcher.handleServerAction({
      type: ActionTypes.SEARCH_RESPONSE,
      json: json,
      errors: errors
    });
  },

  /** INDEX MENU **/
  receiveIndexResults: function(json, errors) {
    MonstrAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_INDEX,
      json: json,
      errors: errors
    });
  },

  /** POST **/
  receivePost: function(json, errors) {
    MonstrAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_POST,
      json: json,
      errors: errors
    });
  },

  receivePosts: function(json, errors) {
    MonstrAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_POSTS,
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
