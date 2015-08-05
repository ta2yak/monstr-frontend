var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var PayloadSources = MonstrConstants.PayloadSources;
var ActionTypes = MonstrConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
var _accessToken = sessionStorage.getItem('accessToken');
var _uid = sessionStorage.getItem('uid');
var _client = sessionStorage.getItem('client');
var _expiry = sessionStorage.getItem('expiry');
var _errors = [];
var _successes = [];

var SessionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _accessToken ? true : false;
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getUId: function() {
    return _uid;
  },

  getClient: function() {
    return _client;
  },

  getExpiry: function() {
    return _expiry;
  },

  getSuccesses: function() {
    return _successes;
  },

  isError: function() {
    return _errors.length > 0 ? true : false;
  },

  getErrors: function() {
    return _errors;
  }

});

SessionStore.dispatchToken = MonstrAppDispatcher.register(function(payload) {
  _errors = []
  _successes = [];

  var action = payload.action;

  // reflesh auth on each request
  switch(payload.source) {
    case PayloadSources.SERVER_ACTION:
      if (action.header && action.header['access-token']) {
        _accessToken = action.header['access-token'];
        _uid = action.header.uid;
        _expiry = action.header.expiry;
        _client = action.header.client;

        // Token will always live in the session, so that the API can grab it with no hassle
        sessionStorage.setItem('accessToken', _accessToken);
        sessionStorage.setItem('uid', _uid);
        sessionStorage.setItem('client', _client);
        sessionStorage.setItem('expiry', _expiry);

      }
    break;
  }

  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:

      if (action.errors) {
        _errors = action.errors;
      }else{
        _successes = ["Welcome to Monstr !!"]
      }

      console.log(ActionTypes.LOGIN_RESPONSE)
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _uid = null;
      _expiry = null;
      _client = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('uid');
      sessionStorage.removeItem('client');
      sessionStorage.removeItem('expiry');
      SessionStore.emitChange();
      break;

  }

  return true;
});

module.exports = SessionStore;
