var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = MonstrConstants.ActionTypes;

module.exports = {

  signup: function(email, username, password, passwordConfirmation) {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      username: username,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, username, password, passwordConfirmation);
  },

  login: function(email, password) {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  logout: function() {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
  
};
