var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = MonstrConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentUser = sessionStorage.getItem('currentUser');
var _errors = [];
var _successes= [];

var UserStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCurrentUser: function() {
    console.log(_currentUser);
    return JSON.parse(_currentUser);
  },

  isError: function() {
    return _errors.length > 0 ? true : false;
  },

  getErrors: function() {
    return _errors;
  },

  getSuccesses: function() {
    return _successes;
  }

});

UserStore.dispatchToken = MonstrAppDispatcher.register(function(payload) {
  _errors = []
  _successes = [];

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_CURRENT_USER:
      // 検索結果からPOST情報のみを取得しイベントを通知する
      _currentUser = JSON.stringify(action.json.user);
      sessionStorage.setItem('currentUser', _currentUser);
      UserStore.emitChange();
      break;

    case ActionTypes.RECEIVE_UPDATED_USER:
      if (action.errors) {
        _errors = action.errors;
      }else{
        _currentUser = JSON.stringify(action.json.user);
        sessionStorage.setItem('currentUser', _currentUser);
        _successes = ["更新しました"];
      }
      UserStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _currentUser = null;
      sessionStorage.removeItem('currentUser');
      UserStore.emitChange();
      break;

  }

  return true;
});

module.exports = UserStore;
