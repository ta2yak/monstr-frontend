var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Menu = require('../components/Menu.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');

var MonstrApp = React.createClass({

  render: function() {
    return (
      <div className="app container fill">
        <div className="row fill">
          <div className="col-md-1 menu-container fill">
            <Menu />
          </div>
          <div className="col-md-11 fill content-container">
            <div className="row fill">
              <RouteHandler />
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MonstrApp;
