var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var WelcomePage = React.createClass({

  render: function() {
    return (

      <div className="row spacer">

        <div className="jumbotron">
          <h1>Monstr is Knowledge Base!</h1>
          <p>知を与えて、より強く育む</p>
          <p>
          <Link to="login">
            <button className="btn btn-primary btn-lg">Login to Monstr</button>
          </Link>
          </p>
        </div>

      </div>

    );
  }
});

module.exports = WelcomePage;