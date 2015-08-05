var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ActionHelper = require('../actions/ActionHelper.react.jsx');
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
        if (res.status == "401"){
          console.log("Session Signup Action 401");
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
          console.log("Session Signup Action 200");
          ActionHelper.dispatch(ActionTypes.LOGIN_RESPONSE, error ,res);
        }
      });

  },

  login: function(email, password) {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });

    request.post(APIEndpoints.LOGIN)
      .send({
        email: email,
        password: password
      })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res.status == "401"){
          console.log("Session Login Action 401");
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
          console.log("Session Login Action 200");
          ActionHelper.dispatch(ActionTypes.LOGIN_RESPONSE, error ,res);
        }
      });
  },

  logout: function() {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });

    ActionHelper.setAuthority(request.del(APIEndpoints.LOGOUT))
      .set('Accept', 'application/json')
      .end(function(error, res){
        console.log("Session Logout Action");
        ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res);
      });

  }

};
