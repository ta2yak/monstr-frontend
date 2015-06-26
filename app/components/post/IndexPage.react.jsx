var React = require('react');

var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var PostActionCreators = require('../../actions/PostActionCreators.react.jsx');

var SessionStore = require('../../stores/SessionStore.react.jsx');
var PostStore = require('../../stores/PostStore.react.jsx');

var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var SuccessNotice = require('../../components/common/SuccessNotice.react.jsx');
var IndexTree = require('../../components/post/IndexTree.react.jsx');

var markdown = require('markdown').markdown;

var PostIndexPage = React.createClass({

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
    var html = this.state.post.body ? markdown.toHTML(this.state.post.body) : ""

    return (

      <div className="row spacer">

        {errors}

        <div className="col-md-2">
          <IndexTree />
        </div>

        <div className="col-md-8">
          <div className="col-md-12">
            <h1>{this.state.post.title}</h1>
          </div>
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{__html: html}} />
          </div>
        </div>

        <div className="col-md-2">
          {this.state.post.revisions}
        </div>

      </div>

    );
  }
});

module.exports = PostIndexPage;