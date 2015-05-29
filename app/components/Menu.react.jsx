var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');

var Menu = React.createClass({

  propTypes: {
    isLoggedIn: React.PropTypes.bool,
    email: React.PropTypes.string
  },

  _logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },

  render: function() {

    var menuItems = this.props.isLoggedIn ? (

      <ul id="sidebar" className="nav nav-stacked">
        <li>

          <div className="btn-group-vertical" role="group">
            <Link to="new-post">
              <button className="btn btn-primary btn-flat btn-block">
                <i className="mdi-action-note-add"></i>
                <br/>
                NEW POST
              </button>
            </Link>
            <button className="btn btn-primary btn-flat btn-block" onClick={this._logout}>
              <i className="mdi-action-settings-power"></i>
              <br/>
              Logout
            </button>
          </div>

        </li>
      </ul>

    ) : (

      <ul id="sidebar" className="nav nav-stacked">
        <li>

          <div className="btn-group-vertical" role="group">
            <Link to="login">
              <button className="btn btn-primary btn-flat btn-block">
                <i className="mdi-action-settings-power"></i>
                <br/>
                Login
              </button>
            </Link>
            <Link to="signup">
              <button className="btn btn-primary btn-flat btn-block">
                <i className="mdi-action-settings-power"></i>
                <br/>
                Signup
              </button>
            </Link>
          </div>

        </li>
      </ul>

    );

    return (

      <div>
        {menuItems}
      </div>

    );

  }
});

module.exports = Menu;
