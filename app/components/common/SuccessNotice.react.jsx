var React = require('react');

var SuccessNotice = React.createClass({
  render: function() {
    return (

      <div className="alert alert-dismissable alert-success">
          <button type="button" className="close" data-dismiss="alert">×</button>
          <h4>Success!</h4>
          {this.props.successes.map(function(success, index){
            return <p key={"success-"+index}>{success}</p>;
          })}
      </div>

    );
  }
});

module.exports = SuccessNotice;