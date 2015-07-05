var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');

var ActionHelper = require('../actions/ActionHelper.react.jsx');
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
			.set('access-token', sessionStorage.getItem('accessToken'))
      .set('uid', sessionStorage.getItem('uid'))
      .set('expiry', sessionStorage.getItem('expiry'))
      .set('client', sessionStorage.getItem('client'))
      .end(function(error, res){
				if (res.status == "401"){
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
					ActionHelper.dispatch(ActionTypes.RECEIVE_POSTS, error ,res)
        }
      });
	},

	loadPost: function(postId) {
  	MonstrAppDispatcher.handleViewAction({
  		type: ActionTypes.LOAD_POST,
  		postId: postId
  	});

    request.get(APIEndpoints.POSTS + '/' + postId)
      .set('Accept', 'application/json')
			.set('access-token', sessionStorage.getItem('accessToken'))
      .set('uid', sessionStorage.getItem('uid'))
      .set('expiry', sessionStorage.getItem('expiry'))
      .set('client', sessionStorage.getItem('client'))
      .end(function(error, res){
				if (res.status == "401"){
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
					ActionHelper.dispatch(ActionTypes.RECEIVE_POST, error ,res)
        }
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
			.set('access-token', sessionStorage.getItem('accessToken'))
      .set('uid', sessionStorage.getItem('uid'))
      .set('expiry', sessionStorage.getItem('expiry'))
      .set('client', sessionStorage.getItem('client'))
      .send({ post: { title: title, body: body, is_wip: false } })
      .end(function(error, res){
				if (res.status == "401"){
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
					ActionHelper.dispatch(ActionTypes.RECEIVE_CREATED_POST, error ,res)
        }
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
			.set('access-token', sessionStorage.getItem('accessToken'))
      .set('uid', sessionStorage.getItem('uid'))
      .set('expiry', sessionStorage.getItem('expiry'))
      .set('client', sessionStorage.getItem('client'))
      .send({ post: { title: title, body: body, is_wip: true } })
      .end(function(error, res){
				if (res.status == "401"){
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
					ActionHelper.dispatch(ActionTypes.RECEIVE_CREATED_POST, error ,res)
        }
      });
  },

	updateCommitPost: function(postId, title, body) {
  	MonstrAppDispatcher.handleViewAction({
  		type: ActionTypes.UPDATE_POST,
  		title: title,
  		body: body
  	});

    request.put(APIEndpoints.POSTS + '/' + postId)
      .set('Accept', 'application/json')
			.set('access-token', sessionStorage.getItem('accessToken'))
      .set('uid', sessionStorage.getItem('uid'))
      .set('expiry', sessionStorage.getItem('expiry'))
      .set('client', sessionStorage.getItem('client'))
      .send({ post: { title: title, body: body, is_wip: false } })
      .end(function(error, res){
				if (res.status == "401"){
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
					ActionHelper.dispatch(ActionTypes.RECEIVE_UPDATED_POST, error ,res)
        }
      });

	},

  updateWipPost: function(postId, title, body) {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_POST,
      title: title,
      body: body
    });

    request.put(APIEndpoints.POSTS + '/' + postId)
      .set('Accept', 'application/json')
			.set('access-token', sessionStorage.getItem('accessToken'))
      .set('uid', sessionStorage.getItem('uid'))
      .set('expiry', sessionStorage.getItem('expiry'))
      .set('client', sessionStorage.getItem('client'))
      .send({ post: { title: title, body: body, is_wip: true } })
      .end(function(error, res){
				if (res.status == "401"){
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
					ActionHelper.dispatch(ActionTypes.RECEIVE_UPDATED_POST, error ,res)
        }
      });
  },

	deletePost: function(postId) {
    MonstrAppDispatcher.handleViewAction({
      type: ActionTypes.DELETE_POST
    });

    request.del(APIEndpoints.POSTS + '/' + postId)
      .set('Accept', 'application/json')
			.set('access-token', sessionStorage.getItem('accessToken'))
      .set('uid', sessionStorage.getItem('uid'))
      .set('expiry', sessionStorage.getItem('expiry'))
      .set('client', sessionStorage.getItem('client'))
      .end(function(error, res){
				if (res.status == "401"){
          ActionHelper.dispatch(ActionTypes.LOGOUT, error ,res)
        }else{
					ActionHelper.dispatch(ActionTypes.RECEIVE_DELETED_POST, error ,res)
        }
      });
  }

};
