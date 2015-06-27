
var getErrors = function(res){
  var errorMsgs = ["Something went wrong, please try again"];
  //if ((json = JSON.parse(res.text))) {
  //  if (json['errors']) {
  //    errorMsgs = json['errors'];
  //  } else if (json['error']) {
  //    errorMsgs = [json['error']];
  //  }
  //}
  return errorMsgs;
}

module.exports = {

  dispatch: function(actionType, error, res){

    if(error){
      errors = getErrors(res);
    }else{
      json = JSON.parse(res.text);
    }

    MonstrAppDispatcher.handleServerAction({
      type: actionType,
      json: json,
      errors: errors
    });

  }

};
