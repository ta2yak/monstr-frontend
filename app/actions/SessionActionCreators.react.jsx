var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ActionHelper = require('../actions/common/ActionHelper.react.jsx');
var request = require('superagent');

var APIEndpoints = MonstrConstants.APIEndpoints;
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

    request.post(APIEndpoints.REGISTRATION)
      .send({
        email: email,
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      })
      .set('Accept', 'application/json')
      .end(function(error, res) {
        ActionHelper.dispatch(ActionTypes.LOGIN_RESPONSE, error ,res)
      });

  },

  login: function(email, password) {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });

    request.post(APIEndpoints.LOGIN)
      .send({ username: email, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res){
        ActionHelper.dispatch(ActionTypes.LOGIN_RESPONSE, error ,res)
      });
  },

  logout: function() {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }

};
