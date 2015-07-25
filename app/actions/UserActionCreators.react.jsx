var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ActionHelper = require('../actions/ActionHelper.react.jsx');
var request = require('superagent');

var APIEndpoints = MonstrConstants.APIEndpoints;
var ActionTypes = MonstrConstants.ActionTypes;

module.exports = {

	getCurrentUser: function() {
  	MonstrAppDispatcher.handleViewAction({
  		type: ActionTypes.LOAD_CURRENT_USER
  	});

    ActionHelper.setAuthority(request.get(APIEndpoints.USERS))
			.set('Accept', 'application/json')
      .end(function(error, res){
				if (res.status == "401"){
          console.log("User Fetch Action 401");
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
					console.log("User Fetch Action 200");
					ActionHelper.dispatch(ActionTypes.RECEIVE_CURRENT_USER, error ,res)
        }
      });
	},

	update: function(name, avatar) {
  	MonstrAppDispatcher.handleViewAction({
  		type: ActionTypes.UPDATE_USER,
  		name: name,
			avatar: avatar
  	});

		if (avatar) {

			ActionHelper.setAuthority(request.put(APIEndpoints.USERS))
	      .set('Accept', 'application/json')
				.field('user[name]', name)
				.attach('user[avatar]', avatar, avatar.name)
	      .end(function(error, res){
					if (res.status == "401"){
	          console.log("User Update Action 401");
	          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
	        }else{
						console.log("User Update Action 200");
						ActionHelper.dispatch(ActionTypes.RECEIVE_UPDATED_USER, error ,res)
	        }
	      });

		}else{

			ActionHelper.setAuthority(request.put(APIEndpoints.USERS))
	      .set('Accept', 'application/json')
				.field('user[name]', name)
	      .end(function(error, res){
					if (res.status == "401"){
	          console.log("User Update Action 401");
	          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
	        }else{
						console.log("User Update Action 200");
						ActionHelper.dispatch(ActionTypes.RECEIVE_UPDATED_USER, error ,res)
	        }
	      });

		}

	},

	delete: function() {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.DELETE_USER
    });

    ActionHelper.setAuthority(request.del(APIEndpoints.USERS))
      .set('Accept', 'application/json')
      .end(function(error, res){
				if (res.status == "401"){
          console.log("User Delete Action 401");
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
					console.log("User Delete Action 200");
					ActionHelper.dispatch(ActionTypes.RECEIVE_DELETED_USER, error ,res)
        }
      });
  }

};
