var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');

var SessionStore = require('../stores/SessionStore.react.jsx');
var UserStore = require('../stores/UserStore.react.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    currentUser: UserStore.getCurrentUser()
  };
}

var Menu = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  _logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
    RouteActionCreators.redirect('app');
  },

  render: function() {
    var picture = "";
    var name = "";
    if (this.state.currentUser) {
      picture = this.state.currentUser.avatar ? this.state.currentUser.avatar.avatar.thumb.url : "http://lorempixel.com/56/56/people/6";
      name = this.state.currentUser.name;
    }
    var menuItems = this.state.isLoggedIn ? (

      <div className="btn-group-justified">
        <Link to="welcome">
          <button className="btn btn-xs btn-primary btn-block">
            <img className="img-circle" src={picture} alt="icon"/>
          </button>
        </Link>
        <Link to="welcome">
          <button className="btn btn-xs btn-primary btn-block">
            <i className="mdi-action-search"></i>
            <br/>
            Search
          </button>
        </Link>
        <Link to="new-post">
          <button className="btn btn-xs btn-primary btn-block">
            <i className="mdi-action-note-add"></i>
            <br/>
            NEW POST
          </button>
        </Link>
        <Link to="posts">
          <button className="btn btn-xs btn-primary btn-block">
            <i className="mdi-editor-insert-drive-file"></i>
            <br/>
            POSTS
          </button>
        </Link>
        <div className="spacer" />
        <div className="spacer" />
        <Link to="edit-user">
          <button className="btn btn-xs btn-primary btn-block">
            <i className="mdi-action-perm-identity"></i>
            <br/>
            USER
          </button>
        </Link>
        <a onClick={this._logout}>
          <button className="btn btn-xs btn-primary btn-block">
            <i className="mdi-action-settings-power"></i>
            <br/>
            Logout
          </button>
        </a>
      </div>

    ) : (

      <div className="btn-group-justified">
        <div className="spacer" />
        <Link to="welcome">
          <button className="btn btn-xs btn-primary btn-block">
            <i className="mdi-action-search"></i>
            <br/>
            Search
          </button>
        </Link>
        <Link to="posts">
          <button className="btn btn-xs btn-primary btn-block">
            <i className="mdi-editor-insert-drive-file"></i>
            <br/>
            POSTS
          </button>
        </Link>
        <div className="spacer" />
        <div className="spacer" />
        <Link to="login">
          <button className="btn btn-xs btn-primary btn-block">
            <i className="glyphicon glyphicon-log-in"></i>
            <br/>
            Login
          </button>
        </Link>
        <Link to="signup">
          <button className="btn btn-xs btn-primary btn-block">
            <i className="glyphicon glyphicon-fire"></i>
            <br/>
            Signup
          </button>
        </Link>
      </div>

    );

    return (

      <div className="menu well-material-teal-500 fill">
        {menuItems}
      </div>

    );

  }
});

module.exports = Menu;
