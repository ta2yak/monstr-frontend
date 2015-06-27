var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ActionHelper = require('../actions/common/ActionHelper.react.jsx');
var request = require('superagent');

var APIEndpoints = MonstrConstants.APIEndpoints;
var ActionTypes = MonstrConstants.ActionTypes;

module.exports = {

  loadIndex: function() {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_INDEX
    });

    request.get(APIEndpoints.INDEX + "/all")
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        ActionHelper.dispatch(ActionTypes.RECEIVE_INDEX, error ,res)
      });
  }


};
