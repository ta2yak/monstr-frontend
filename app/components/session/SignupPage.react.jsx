var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');

var SignupPage = React.createClass({

  getInitialState: function() {
    return { errors: [] };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var email = this.refs.email.getDOMNode().value;
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var passwordConfirmation = this.refs.passwordConfirmation.getDOMNode().value;
    if (password !== passwordConfirmation) {
      this.setState({ errors: ['Password and password confirmation should match']});
    } else {
      SessionActionCreators.signup(email, username, password, passwordConfirmation);
    }
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (

      <div className="row spacer">

        {errors}

        <div className="col-md-4 col-md-offset-4">

          <div className="panel panel-default">

            <div className="panel-heading">
              <h3 className="panel-title">Monstr Signup</h3>
            </div>

            <div className="panel-body">
              <div className="inputs">
                <input type="email" ref="email" className="form-control floating-label" placeholder="email"/>
                <br/>
                <input type="text" ref="username" className="form-control floating-label" placeholder="username"/>
                <br/>
                <input type="password" ref="password" className="form-control floating-label" placeholder="password"/>
                <br/>
                <input type="password" ref="passwordConfirmation" className="form-control floating-label" placeholder="password confirm"/>
              </div>
            </div>

            <div className="panel-footer">
                  <button className="btn btn-flat btn-info btn-block" onClick={this._onSubmit}>Signup</button>
            </div>

          </div>

        </div>
      </div>

    );
  }
});

module.exports = SignupPage;
