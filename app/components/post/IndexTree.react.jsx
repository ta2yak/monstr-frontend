var React = require('react');

var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var IndexActionCreators = require('../../actions/IndexActionCreators.react.jsx');
var PostActionCreators = require('../../actions/PostActionCreators.react.jsx');

var SessionStore = require('../../stores/SessionStore.react.jsx');
var IndexStore = require('../../stores/IndexStore.react.jsx');
var PostStore = require('../../stores/PostStore.react.jsx');

var PostIndexTree = React.createClass({
  getInitialState: function() {
      return {data: [], currentPost: {}};
  },

  componentDidMount: function() {
    PostStore.addChangeListener(this._onPostChange);
    IndexStore.addChangeListener(this._onIndexChange);
    IndexActionCreators.loadIndex();
    this.setState({
        currentPost: PostStore.getPost()
    });
  },

  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._onPostChange);
    IndexStore.removeChangeListener(this._onIndexChange);
  },

  _onIndexChange: function() {
    this.setState({
        data: IndexStore.getIndexes()
    });
  },

  _onPostChange: function() {
    this.setState({
        currentPost: PostStore.getPost()
    });
  },

  _genNode: function(nodes){

    var selectedPostID = this.state.currentPost ? this.state.currentPost.id : null;

    var navTree = function(nodes, depth){

      var onSelect = function(id){
        PostActionCreators.loadPost(id);
      }

      var indents = [];
      for (var i = 0; i < depth - 1; i++) {
        indents.push(<span className='indent' key={i}></span>);
      }

      return nodes.map(function(node, index){

        if (node.type == "node") {

          return (
            <div className="accordion-group" key={node.id}>
              <div className="accordion-heading">
                {indents}
                <small>
                <a className="accordion-toggle" data-toggle="collapse" href={"#collapse-"+node.id}>
                  <i className="mdi-file-folder-open"></i> {node.title}
                </a>
                </small>
              </div>
              <div id={"collapse-"+node.id} className="accordion-body collapse in">
                {navTree(node.nodes, depth + 1)}
              </div>
            </div>
          );

        }else{

          // ここで selectedPostID が存在しない場合は1つめのPostを表示する
          if (!selectedPostID){
            selectedPostID = node.post;
            PostActionCreators.loadPost(selectedPostID);
          }

          var selected = (selectedPostID == node.post) ? "selected" : ""
          return (
            <div className="accordion-inner" key={node.id}>
              {indents}
              <small>
              <a className={selected} onClick={onSelect.bind(this, node.post)}>
                <i className="mdi-action-description"></i> {node.title}
              </a>
              </small>
            </div>
          );

        }

      });

    }

    return navTree(nodes, 1);

  },

  render: function() {

    var treeCollapse = this._genNode(this.state.data);

    return (

          <div className="accordion treeview">
            {treeCollapse}
          </div>

    );
  }
});

module.exports = PostIndexTree;
