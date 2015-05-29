
var APIRoot = "http://localhost:8888";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/api/v1/auth",
    REGISTRATION:   APIRoot + "/api/v1/auth",
    STORIES:        APIRoot + "/v1/stories"
  },

  PayloadSources: {
    SERVER_ACTION: "SERVER_ACTION",
    VIEW_ACTION: "VIEW_ACTION"
  },

  ActionTypes: {
    // Session
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_RESPONSE: "LOGIN_RESPONSE",

    // Routes
    REDIRECT: "REDIRECT"
  }

};