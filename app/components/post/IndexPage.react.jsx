var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

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
      this.setState({
          post: PostStore.getPost()
      });
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
    var editButton = this.state.post.title ? (
      <Link to="edit-post">
        <button className="btn btn-primary pull-right" type="button">修正する</button>
      </Link>
    ) : <div></div>;

    var revisions = this.state.post.title ? this.state.post.revisions.map(function(revision, index){

      var diffs = revision.diff_text.split('\n').map(function(text, i){
          return (
            <p key={i}><small>{text}</small></p>
          )
      });

      return (

        <div className="panel panel-default" key={index}>
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">{revision.headline}</h3>
          </div>
          <div className="panel-body">
            {diffs}
          </div>
          <div className="panel-footer">
            <small>{revision.created_at}</small>
          </div>
        </div>

      )
    }) : <div></div>;

    return (

      <div className="row spacer">

        {errors}

        <div className="col-md-2">
          <IndexTree/>
        </div>

        <div className="col-md-6">

          <div className="col-md-12">
            <h1>{this.state.post.title}</h1>
          </div>

          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{__html: html}} />
          </div>

          <div className="col-md-12">
            <div className="col-md-6 col-md-offset-6">
              {editButton}
            </div>
          </div>

        </div>

        <div className="col-md-4">
          <h3>Revisions.</h3>
          {revisions}
        </div>

      </div>

    );
  }
});

module.exports = PostIndexPage;
