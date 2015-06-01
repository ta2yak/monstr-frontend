var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = MonstrConstants.ActionTypes;

module.exports = {

	loadPosts: function() {
    	MonstrAppDispatcher.handleViewAction({
      		type: ActionTypes.LOAD_POSTS
    	});
    	WebAPIUtils.loadPosts();
  	},
  
  	loadPost: function(postId) {
    	MonstrAppDispatcher.handleViewAction({
      		type: ActionTypes.LOAD_POST,
      		postId: postId
    	});
    	WebAPIUtils.loadPost(postId);
	},

  	createPost: function(title, body) {
    	MonstrAppDispatcher.handleViewAction({
      		type: ActionTypes.CREATE_POST,
      		title: title,
      		body: body
    	});
    	WebAPIUtils.createPost(title, body);
  	}
  
};
