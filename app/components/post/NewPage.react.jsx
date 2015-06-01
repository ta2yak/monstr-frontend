var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var markdown = require('markdown').markdown;

var PostNewPage = React.createClass({

  getInitialState: function() {
    return { markdownString: 'Type to Left Textarea  **Markdown**  .', errors: [] };
  },

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) { 
      RouteActionCreators.redirect('app');
    }
  },

  _onUpdateMarkdown: function(event){
      this.setState({markdownString: event.target.value});
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var html = markdown.toHTML(this.state.markdownString)
    return (

      <div className="row spacer">

        {errors}

        <div className="col-md-6">
          <input type="text" className="form-control floating-label" placeholder="title (/ により階層分類が可能 ex. /2015/06/01/日報)" />
          <br/>
          <textarea className="form-control floating-label" placeholder="Markdown Text" onInput={this._onUpdateMarkdown} rows="40" />
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