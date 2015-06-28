var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ActionHelper = require('../actions/ActionHelper.react.jsx');
var request = require('superagent');

var APIEndpoints = MonstrConstants.APIEndpoints;
var ActionTypes = MonstrConstants.ActionTypes;


module.exports = {

	search: function(query) {
	  	MonstrAppDispatcher.handleViewAction({
	  		type: ActionTypes.SEARCH
	  	});

	    request.get(APIEndpoints.SEARCH)
	      .set('Accept', 'application/json')
	      .end(function(error, res){
          ActionHelper.dispatch(ActionTypes.SEARCH_RESPONSE, error ,res)
	      });

	}

};
