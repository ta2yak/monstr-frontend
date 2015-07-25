var React = require('react');
var Dropzone = require('react-dropzone');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var UserActionCreators = require('../../actions/UserActionCreators.react.jsx');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var UserStore = require('../../stores/UserStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var SuccessNotice = require('../../components/common/SuccessNotice.react.jsx');

var UserEditPage = React.createClass({

  getInitialState: function() {
    return { user:UserStore.getCurrentUser(),
             selectedAvatarFile: null,
             errors: [],
             successes: [] };
  },

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('app');
    }else{
      UserStore.addChangeListener(this._onChange);
    }
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    if (UserStore.isError()){
      this.setState({errors: UserStore.getErrors()});
    }else{
      this.setState({
                      successes: UserStore.getSuccesses(),
                      user:UserStore.getCurrentUser()
                    });
    }
  },

  _onUpdate: function(e) {
    e.preventDefault();
    this.setState({ errors: [], successes: [] });
    var name = this.refs.name.getDOMNode().value;
    var avatar = this.state.selectedAvatarFile;
    UserActionCreators.update(name, avatar);
  },

  _onDrop: function(files) {
    this.setState({ errors: [], successes: [], selectedAvatarFile: files[0] });
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var successes = (this.state.successes.length > 0) ? <SuccessNotice successes={this.state.successes}/> : <div></div>;
    var preview = (this.state.selectedAvatarFile) ? <img className="img-thumbnail" src={this.state.selectedAvatarFile.preview} /> : <div>ここに画像をドロップ</div>;
    var currentAvatar = (this.state.user.avatar) ? <img className="img-thumbnail" src={this.state.user.avatar.avatar.thumb.url} /> : <div></div>;

    return (

      <div className="row spacer">

        {successes}
        {errors}

        <div className="col-md-6 col-md-offset-3">

          <div className="col-md-3">
            <Dropzone onDrop={this._onDrop} size={150} >
              {preview}
            </Dropzone>
          </div>

          <div className="col-md-9">
            <div className="col-md-12">
              {currentAvatar}
              <input type="text"　ref="name" defaultValue={this.state.user.name} className="form-control floating-label" placeholder="名前" />
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary pull-right" type="button" onClick={this._onUpdate}>更新</button>
            </div>
          </div>

        </div>
      </div>

    );
  }
});

module.exports = UserEditPage;
