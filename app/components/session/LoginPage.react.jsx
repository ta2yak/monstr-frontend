var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');

var LoginPage = React.createClass({

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
              <h3 className="panel-title">Monstr Login</h3>
            </div>

            <div className="panel-body">
              <div className="inputs">
                <input type="email" ref="email" className="form-control floating-label" placeholder="email"/>
                <br/>
                <input type="password" ref="password" className="form-control floating-label" placeholder="password"/>
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