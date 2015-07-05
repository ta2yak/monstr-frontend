var React = require('react');
var SearchActionCreators = require('../../actions/SearchActionCreators.react.jsx');
var PostActionCreators = require('../../actions/PostActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var PostStore = require('../../stores/PostStore.react.jsx');

var Result = React.createClass({
  onSelect: function(){
    PostActionCreators.loadPost(this.props.post.id);
    RouteActionCreators.redirect("posts");
  },
  render: function() {
    var post = this.props.post;
    return (
      <div className="col-md-10 col-md-offset-1">
        <h2><a onClick={this.onSelect}>{post.title}</a></h2>
        <p className="lead">{post.body}</p>
      </div>
    )
  }
});


var SearchResults = React.createClass({
  render: function() {

    var existsResult = this.props.posts.length > 0 ? true : false;
    return existsResult ? (

      <div className="jumbotron">
        <div className="row spacer posts">

          {this.props.posts.map(function(post, index){
            return (

              <Result post={post} key={post.id} />

            );
          })}

        </div>
      </div>

    ) : (

      <div className="jumbotron">
        <div className="row spacer noresult">
          <div className="col-md-10 col-md-offset-1">
            <p className="text-muted text-center">No Results</p>
          </div>
        </div>
      </div>

    );
  }
});

var WelcomePage = React.createClass({

  getInitialState: function() {
    return { posts: [] };
  },

  componentDidMount: function() {
    PostStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ posts: PostStore.getPosts() });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ posts: [] });
    var query = this.refs.query.getDOMNode().value;
    SearchActionCreators.search(query);
  },

  render: function() {
    return (

      <div className="row spacer">

        <div className="jumbotron">
          <div className="row spacer">

            <div className="col-md-6 col-md-offset-3">
              <input type="text" ref="query" className="form-control" placeholder="Search for..."/>
              <div className="col-md-4 col-md-offset-4">
                <button className="btn btn-primary" type="button" onClick={this._onSubmit}>Knowledge 検索</button>
              </div>
            </div>

          </div>
        </div>

        <SearchResults posts={this.state.posts}/>

      </div>

    );
  }
});

module.exports = WelcomePage;
