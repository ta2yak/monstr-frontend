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

	    request.post(APIEndpoints.SEARCH)
	      .set('Accept', 'application/json')
				.send({ search: { word: query } })
	      .end(function(error, res){
					if (res.status == "401"){
	          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
	        }else{
						ActionHelper.dispatch(ActionTypes.SEARCH_RESPONSE, error ,res)
	        }
	      });

	}

};
