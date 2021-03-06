var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');
var MonstrConstants = require('../constants/MonstrConstants.js');
var ActionTypes = MonstrConstants.ActionTypes;

var getErrors = function(json){
  if (json['errors']) {
    var errorMsgs = [];
    return json['errors']['full_messages'];
  }
  return null;
}

module.exports = {

  setAuthority: function(request){
    request.set('access-token', sessionStorage.getItem('accessToken'))
           .set('uid', sessionStorage.getItem('uid'))
           .set('expiry', sessionStorage.getItem('expiry'))
           .set('client', sessionStorage.getItem('client'))
    return request;
  },

  dispatch: function(actionType, error, res){

    header = res.header;
    status = res.status;
    json = JSON.parse(res.text);
    errors = getErrors(json);

    if (status == "401"){
      MonstrAppDispatcher.handleServerAction({
        type: ActionTypes.LOGOUT,
        status: status,
        header: header,
        json: json,
        errors: errors
      });
    }else{
      MonstrAppDispatcher.handleServerAction({
        type: actionType,
        status: status,
        header: header,
        json: json,
        errors: errors
      });
    }

  }

};
