
//var APIRoot = "http://localhost:8888"; // Local Mock Server
var APIRoot = "http://localhost:3000";   // Local Backend Server

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/api/v1/auth/sign_in",
    REGISTRATION:   APIRoot + "/api/v1/auth",
    SEARCH:         APIRoot + "/api/v1/search",
    INDEX:          APIRoot + "/api/v1/index",
    POSTS:          APIRoot + "/api/v1/posts"
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

    // Search
    SEARCH: "SEARCH",
    SEARCH_RESPONSE: "SEARCH_RESPONSE",

    // Posts
    CREATE_POST: "CREATE_POST",
    RECEIVE_CREATED_POST: "RECEIVE_CREATED_POST",
    UPDATE_POST: "UPDATE_POST",
    RECEIVE_UPDATED_POST: "RECEIVE_UPDATED_POST",
    DELETE_POST: "DELETE_POST",
    RECEIVE_DELETED_POST: "RECEIVE_DELETED_POST",

    LOAD_POSTS: "LOAD_POSTS",
    RECEIVE_POSTS: "RECEIVE_POSTS",

    LOAD_POST: "LOAD_POST",
    RECEIVE_POST: "RECEIVE_POST",

    LOAD_INDEX: "LOAD_INDEX",
    RECEIVE_INDEX: "RECEIVE_INDEX"
  }

};
