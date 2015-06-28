var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = MonstrConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _posts = [];
var _errors = [];
var _successes= [];
var _post = { title: "", body: "", user: { username: "" } };

var PostStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getPosts: function() {
    return _posts;
  },

  getPost: function() {
    return _post;
  },

  getErrors: function() {
    return _errors;
  },

  getSuccesses: function() {
    return _successes;
  }

});

PostStore.dispatchToken = MonstrAppDispatcher.register(function(payload) {
  _errors = []
  _successes = [];

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.SEARCH_RESPONSE:
      // 検索結果からPOST情報のみを取得しイベントを通知する
      _posts = action.json.posts;
      PostStore.emitChange();
      break;

    case ActionTypes.RECEIVE_POSTS:
      _posts = action.json.posts;
      PostStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_POST:
      if (action.errors) {
        _errors = action.errors;
      }else{
        _successes = ["登録しました"];
      }
      PostStore.emitChange();
      break;

    case ActionTypes.RECEIVE_POST:
      if (action.json) {
        _post = action.json.post;
        _errors = [];
        _success = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }else{
        _successes = [];
      }
      PostStore.emitChange();
      break;

  }

  return true;
});

module.exports = PostStore;
