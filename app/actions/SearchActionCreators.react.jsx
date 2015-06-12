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

	search: function(query) {
	  	MonstrAppDispatcher.handleViewAction({
	  		type: ActionTypes.SEARCH
	  	});

	    request.get(APIEndpoints.SEARCH)
	      .set('Accept', 'application/json')
	      .end(function(error, res){
	        if (res) {
	          json = JSON.parse(res.text);
	          ServerActionCreators.receiveSearchResults(json);
	        }
	      });

	}
  
};
