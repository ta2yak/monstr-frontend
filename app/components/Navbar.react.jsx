var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');
var SearchActionCreators = require('../actions/SearchActionCreators.react.jsx');

var ENTER_KEY = 13;

var Navbar = React.createClass({

  propTypes: {
    isLoggedIn: React.PropTypes.bool
  },

  _onHandleKeyDown: function (event) {
		if (event.which === ENTER_KEY) {
			this._onSubmit(event);
		}
	},

  _onSubmit: function(e) {
    e.preventDefault();
    var query = this.refs.query.getDOMNode().value;
    SearchActionCreators.search(query);
    this.refs.query.getDOMNode().value = "";
    RouteActionCreators.redirect("welcome");
  },

  render: function() {

    return (

      <div className="row nav-container">

        <div className="navbar">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div className="navbar-collapse collapse navbar-responsive-collapse">
                <form className="navbar-form navbar-left">
                    <input type="text" ref="query" className="form-control" placeholder="Search for..." onKeyDown={this._onHandleKeyDown}/>
                </form>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="welcome">
                      <i className="mdi-action-account-circle"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="welcome">
                      <i className="mdi-action-settings-power"></i>
                    </Link>
                  </li>
                </ul>
            </div>
        </div>

      </div>

    );

  }
});

module.exports = Navbar;
