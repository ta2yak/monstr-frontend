var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var UserActionCreators = require('../../actions/UserActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var UserStore = require('../../stores/UserStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');

var ENTER_KEY = 13;

var LoginPage = React.createClass({

  getInitialState: function() {
    return { errors: [] };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onUserChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onUserChange);
  },

  _onChange: function() {
    if (SessionStore.isError()) {
      this.setState({ errors: SessionStore.getErrors() });
      SessionActionCreators.logout();
    }else{
      if (SessionStore.isLoggedIn()){
        UserActionCreators.getCurrentUser();
      }else{
        this.setState({ errors: ["認証情報が取得できませんでした"] });
      }
    }
  },

  _onUserChange: function() {
    if (UserStore.isError()) {
      this.setState({ errors: UserStore.getErrors() });
      SessionActionCreators.logout();
    }else{
      RouteActionCreators.redirect("welcome");
    }
  },

  _onHandleKeyDown: function (event) {
		if (event.which === ENTER_KEY) {
			this._onSubmit(event);
		}
	},
  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    SessionActionCreators.login(email, password);
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (

      <div className="row spacer">

        {errors}

        <div className="col-md-4 col-md-offset-4">

          <div className="panel panel-default">

            <div className="panel-heading">
              <h3 className="panel-title text-center">Monstr</h3>
            </div>

            <div className="panel-body">
              <div className="inputs">
                <input type="email" ref="email" className="form-control floating-label input-lg" placeholder="Email" onKeyDown={this._onHandleKeyDown}/>
                <br/>
                <input type="password" ref="password" className="form-control floating-label input-lg" placeholder="Password" onKeyDown={this._onHandleKeyDown}/>
              </div>
            </div>

            <div className="panel-footer">
                  <button className="btn btn-flat btn-info btn-block" onClick={this._onSubmit}>Login</button>
            </div>

          </div>

        </div>
      </div>

    );
  }
});

module.exports = LoginPage;
