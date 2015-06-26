var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var request = require('superagent');


var APIEndpoints = MonstrConstants.APIEndpoints;
var ActionTypes = MonstrConstants.ActionTypes;

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

function _getSuccesses(res) {
  var successMsgs = ["Suucessful !!"];
  if ((json = JSON.parse(res.text))) {
    if (json['successes']) {
      successMsgs = json['successes'];
    } else if (json['success']) {
      successMsgs = [json['success']];
    }
  }
  return successMsgs;
}



module.exports = {

  loadIndex: function() {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_INDEX
    });

    request.get(APIEndpoints.INDEX + "/all")
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveIndexResults(json);
        }
      });
  }

  
};
