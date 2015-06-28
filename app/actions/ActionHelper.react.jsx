var MonstrAppDispatcher = require('../dispatcher/MonstrAppDispatcher.js');

var getErrors = function(json){
  if (json['errors']) {
    var errorMsgs = [];
    return json['errors']['full_messages'];
  }
  return null;
}

module.exports = {

  dispatch: function(actionType, error, res){

    header = res.header;
    json = JSON.parse(res.text);
    errors = getErrors(json);

    MonstrAppDispatcher.handleServerAction({
      type: actionType,
      header: header,
      json: json,
      errors: errors
    });

  }

};
