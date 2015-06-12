var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');

var Menu = React.createClass({

  propTypes: {
    isLoggedIn: React.PropTypes.bool,
    email: React.PropTypes.string
  },

  _logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
    RouteActionCreators.redirect('app');
  },

  render: function() {

    var menuItems = this.props.isLoggedIn ? (

      <div className="btn-group-vertical btn-group-justified" role="group">
        <Link to="welcome">
          <button className="btn btn-xs btn-primary btn-flat btn-block">
            <i className="glyphicon glyphicon-home"></i>
            <br/>
            Home
          </button>
        </Link>
        <Link to="new-post">
          <button className="btn btn-xs btn-primary btn-flat btn-block">
            <i className="mdi-action-note-add"></i>
            <br/>
            NEW POST
          </button>
        </Link>
        <Link to="posts">
          <button className="btn btn-xs btn-primary btn-flat btn-block">
            <i className="mdi-editor-insert-drive-file"></i>
            <br/>
            POSTS
          </button>
        </Link>
        <hr/>
        <a onClick={this._logout}>
          <button className="btn btn-xs btn-primary btn-flat btn-block">
            <i className="mdi-action-settings-power"></i>
            <br/>
            Logout
          </button>
        </a>
      </div>

    ) : (

      <div className="btn-group-vertical btn-group-justified" role="group">
        <Link to="welcome">
          <button className="btn btn-xs btn-primary btn-flat btn-block">
            <i className="glyphicon glyphicon-home"></i>
            <br/>
            Home
          </button>
        </Link>
        <Link to="login">
          <button className="btn btn-xs btn-primary btn-flat btn-block">
            <i className="glyphicon glyphicon-log-in"></i>
            <br/>
            Login
          </button>
        </Link>
        <Link to="signup">
          <button className="btn btn-xs btn-primary btn-flat btn-block">
            <i className="glyphicon glyphicon-fire"></i>
            <br/>
            Signup
          </button>
        </Link>
      </div>

    );

    return (

      <div className="menu spacer">
        {menuItems}
      </div>

    );

  }
});

module.exports = Menu;
