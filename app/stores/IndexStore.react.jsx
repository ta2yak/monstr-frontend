var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = MonstrConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _indexes = [];
var _errors = [];
var _successes= [];

var IndexStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getIndexes: function() {
    return _indexes;
  },

  getErrors: function() {
    return _errors;
  },

  getSuccesses: function() {
    return _successes;
  }

});

IndexStore.dispatchToken = MonstrAppDispatcher.register(function(payload) {
  _errors = []
  _successes = [];

    var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_INDEX:
      if (action.json) {
        _indexes = action.json.indexes;
        _errors = [];
        _success = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }else{
        _successes = [];
      }
      IndexStore.emitChange();
      break;
  }

  return true;
});

module.exports = IndexStore;
