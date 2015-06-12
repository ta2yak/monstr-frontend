var React = require('react');
var moment = require('moment');

var ErrorNotice = React.createClass({
  render: function() {

    var timestamp = moment().format("x");    

    return (

      <div className="alert alert-dismissable alert-danger">
          <button type="button" className="close" data-dismiss="alert">×</button>
          <h4>Error!</h4>
          {this.props.errors.map(function(error, index){
            return <p key={"error-" + timestamp + "-" + index}>{error}</p>;
          })}
      </div>

    );
  }
});

module.exports = ErrorNotice;