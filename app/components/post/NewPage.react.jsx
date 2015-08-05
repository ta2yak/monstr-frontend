var React = require('react');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var PostActionCreators = require('../../actions/PostActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var PostStore = require('../../stores/PostStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var SuccessNotice = require('../../components/common/SuccessNotice.react.jsx');
var markdown = require('markdown').markdown;

var PostNewPage = React.createClass({

  getInitialState: function() {
    return { markdownString: 'Type to Left Textarea  **Markdown**  .', errors: [], successes: [] };
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
    if (PostStore.isError()){
      this.setState({errors: PostStore.getErrors()});
    }else{
      RouteActionCreators.redirect('posts');
    }
  },

  _onUpdateMarkdown: function(event){
      this.setState({markdownString: event.target.value});
  },

  _onCommit: function(e) {
    e.preventDefault();
    this.setState({ errors: [], successes: [] });
    var title = this.refs.title.getDOMNode().value;
    var body = this.refs.body.getDOMNode().value;
    PostActionCreators.createCommitPost(title, body);
  },

  _onWIP: function(e) {
    e.preventDefault();
    this.setState({ errors: [], successes: [] });
    var title = this.refs.title.getDOMNode().value;
    var body = this.refs.body.getDOMNode().value;
    PostActionCreators.createWipPost(title, body);
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var successes = (this.state.successes.length > 0) ? <SuccessNotice successes={this.state.successes}/> : <div></div>;
    var html = markdown.toHTML(this.state.markdownString)
    return (

      <div className="row spacer">

        {successes}
        {errors}

        <div className="col-md-6">

          <div className="col-md-12">
            <input type="text"　ref="title" className="form-control floating-label input-lg" placeholder="title (/ により階層分類が可能です ex. Application/Setup/Install)" />
          </div>

          <div className="col-md-12 spacer">
            <textarea　ref="body" className="form-control floating-label" placeholder="Markdown Text" onInput={this._onUpdateMarkdown} rows="30" />
          </div>

          <div className="col-md-12">
            <div className="col-md-6 col-md-offset-6">
              <button className="btn btn-info pull-right" type="button" onClick={this._onWIP}>WIP</button>
              <button className="btn btn-primary pull-right" type="button" onClick={this._onCommit}>登録</button>
            </div>
          </div>

        </div>

        <div className="col-md-6">
          <div className="preview">
            <div dangerouslySetInnerHTML={{__html: html}} />
          </div>
        </div>

      </div>

    );
  }
});

module.exports = PostNewPage;
