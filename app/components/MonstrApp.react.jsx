var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Menu = require('../components/Menu.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail()
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
      <div className="app container">
        <div className="row">
          <div className="col-md-1">
            <Menu 
              isLoggedIn={this.state.isLoggedIn}
              email={this.state.email} />
          </div>
          <div className="col-md-10 col-md-offset-1">
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MonstrApp;