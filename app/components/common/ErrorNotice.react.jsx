var React = require('react');

var ErrorNotice = React.createClass({
  render: function() {
    return (

      <div className="alert alert-dismissable alert-danger">
          <button type="button" className="close" data-dismiss="alert">×</button>
          <h4>Error!</h4>
          {this.props.errors.map(function(error, index){
            return <p key={"error-"+index}>{error}</p>;
          })}
      </div>

    );
  }
});

module.exports = ErrorNotice;