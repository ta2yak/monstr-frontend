var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Menu = require('../components/Menu.react.jsx');
var Navbar = require('../components/Navbar.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn()
  };
}

var MonstrApp = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    return (
      <div className="app container fill">
        <div className="row fill">
          <div className="col-md-1 menu-container fill">
            <Menu isLoggedIn={this.state.isLoggedIn} />
          </div>
          <div className="col-md-11">
            <div className="row">
              <Navbar isLoggedIn={this.state.isLoggedIn} />
            </div>
            <div className="row">
              <RouteHandler />
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MonstrApp;
