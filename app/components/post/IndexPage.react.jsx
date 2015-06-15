var React = require('react');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var PostActionCreators = require('../../actions/PostActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var PostStore = require('../../stores/PostStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var SuccessNotice = require('../../components/common/SuccessNotice.react.jsx');
var TreeView = require('../../components/common/TreeView.react.jsx');
var markdown = require('markdown').markdown;

var PostNewPage = React.createClass({

  getInitialState: function() {
    return { post: [], errors: [] };
  },

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) { 
      RouteActionCreators.redirect('app');
    }else{
      PostStore.addChangeListener(this._onChange);
    }
  },

  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
        post: PostStore.getPost(), 
        errors: PostStore.getErrors()
    });
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;

    return (

      <div className="row spacer">

        {errors}

        <div className="col-md-3">
          <TreeView />
        </div>

        <div className="col-md-6">
          BODY
        </div>

        <div className="col-md-3">
          COMMITS
        </div>

      </div>

    );
  }
});

module.exports = PostNewPage;