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
var moment = require('moment');

var PostIndexPage = React.createClass({

  getInitialState: function() {
    return { post: null, errors: [] };
  },

  componentDidMount: function() {
    PostStore.addChangeListener(this._onChange);
    this.setState({
        post: PostStore.getPost()
    });
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
    var title = this.state.post ? this.state.post.title : "";
    var html = this.state.post ? markdown.toHTML(this.state.post.body) : "";
    var editButton = (SessionStore.isLoggedIn() && this.state.post) ? (
      <Link to="edit-post">
        <button className="btn btn-primary pull-right" type="button">修正する</button>
      </Link>
    ) : <div></div>;
    var actions = (
      <div className="col-md-6 col-md-offset-6">
        {editButton}
        <button type="button" className="btn btn-default pull-right" data-toggle="modal" data-target=".bs-rev-modal-lg">Revisions</button>
      </div>
    );

    var revisions = this.state.post ? this.state.post.revisions.map(function(revision, index){

      var diffs = revision.diff_text.split('\n').map(function(text, i){
          return (
            <p key={i}><small>{text}</small></p>
          )
      });

      var picture = revision.user.avatar ? revision.user.avatar.avatar.thumb.url : "http://lorempixel.com/56/56/people/6";

      return (

      <div>
        <div className="list-group-item" key={index}>

          <div className="row-picture">
            <img className="circle" src={picture} alt="icon"/>
          </div>

          <div className="row-content">
            <div className="least-content">{moment(revision.created_at).fromNow()}</div>
            <h4 className="list-group-item-heading">
              <a data-toggle="collapse" href={"#collapse"+index} aria-expanded="false" aria-controls={"collapse"+index}>
                {revision.headline}
              </a>
            </h4>
            <div className="list-group-item-text collapse" id={"collapse"+index}>
              {diffs}
            </div>
          </div>

        </div>
        <div className="list-group-separator"></div>
      </div>

      )
    }) : <div></div>;

    return (

      <div className="fill">

        {errors}

        <div className="col-md-2 fill well-material-grey-100">
          <div className="spacer">
            <IndexTree/>
          </div>
        </div>

        <div className="col-md-10 fill content-container">

          <div className="col-md-12">
            {actions}
          </div>

          <div className="col-md-12">
            <h1>{title}</h1>
            <hr/>
            <div dangerouslySetInnerHTML={{__html: html}} />
          </div>

          <div className="col-md-12">
            {actions}
          </div>

        </div>

        <div className="modal fade bs-rev-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myRevModalLabel">
          <div className="modal-dialog modal-lg">
            <div classNmae="modal-content">
              <div className="panel panel-default">
                <div className="panel-heading clearfix">
                  <h3 className="panel-title pull-left">Revisions</h3>
                </div>
                <div className="spacer"/>
                <div className="list-group">
                {revisions}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
});

module.exports = PostIndexPage;
