var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ActionHelper = require('../actions/common/ActionHelper.react.jsx');
var request = require('superagent');

var APIEndpoints = MonstrConstants.APIEndpoints;
var ActionTypes = MonstrConstants.ActionTypes;

module.exports = {

	loadPosts: function() {
  	MonstrAppDispatcher.handleViewAction({
  		type: ActionTypes.LOAD_POSTS
  	});

    request.get(APIEndpoints.POSTS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        ActionHelper.dispatch(ActionTypes.RECEIVE_POSTS, error ,res)
      });
	},

	loadPost: function(postId) {
  	MonstrAppDispatcher.handleViewAction({
  		type: ActionTypes.LOAD_POST,
  		postId: postId
  	});

    request.get(APIEndpoints.POSTS + '/' + postId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        ActionHelper.dispatch(ActionTypes.RECEIVE_POST, error ,res)
      });
	},

	createCommitPost: function(title, body) {
  	MonstrAppDispatcher.handleViewAction({
  		type: ActionTypes.CREATE_POST,
  		title: title,
  		body: body
  	});

    request.post(APIEndpoints.POSTS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ post: { title: title, body: body, is_commit: true } })
      .end(function(error, res){
        ActionHelper.dispatch(ActionTypes.RECEIVE_CREATED_POST, error ,res)
      });

	},

  createWipPost: function(title, body) {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_POST,
      title: title,
      body: body
    });

    request.post(APIEndpoints.POSTS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ post: { title: title, body: body, is_commit: false } })
      .end(function(error, res){
        ActionHelper.dispatch(ActionTypes.RECEIVE_CREATED_POST, error ,res)
      });
  }

};
