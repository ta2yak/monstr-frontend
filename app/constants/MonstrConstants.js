
var APIRoot = "http://localhost:8888";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/api/v1/auth",
    REGISTRATION:   APIRoot + "/api/v1/auth",
    POSTS:        APIRoot + "/api/v1/posts"
  },

  PayloadSources: {
    SERVER_ACTION: "SERVER_ACTION",
    VIEW_ACTION: "VIEW_ACTION"
  },

  ActionTypes: {
    // Session
    SIGNUP_REQUEST: "SIGNUP_REQUEST",
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_RESPONSE: "LOGIN_RESPONSE",
    LOGOUT: "LOGOUT",

    // Routes
    REDIRECT: "REDIRECT",

    // Posts
    CREATE_POST: "CREATE_POST",
    LOAD_POSTS: "LOAD_POSTS",
    RECEIVE_POSTS: "RECEIVE_POSTS",
    LOAD_POST: "LOAD_POST",
    RECEIVE_POST: "RECEIVE_POST",
    RECEIVE_CREATED_POST: "RECEIVE_CREATED_POST"
  }

};