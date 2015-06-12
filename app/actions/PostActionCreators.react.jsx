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

	loadPosts: function() {
  	MonstrAppDispatcher.handleViewAction({
  		type: ActionTypes.LOAD_POSTS
  	});

    request.get(APIEndpoints.POSTS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receivePosts(json);
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
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receivePost(json);
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
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ post: { title: title, body: body, is_commit: true } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedPost(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedPost(json, null);
          }
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
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ post: { title: title, body: body, is_commit: false } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedPost(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedPost(json, null);
          }
        }
      });
  }
  
};
