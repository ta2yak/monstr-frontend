var React = require('react');
var PostActionCreators = require('../../actions/PostActionCreators.react.jsx');
var PostStore = require('../../stores/PostStore.react.jsx');

var TreeView = React.createClass({
  getInitialState: function() {
      return {data: []};
  },

  componentDidMount: function() {
    PostStore.addChangeListener(this._onChange);
    PostActionCreators.loadTree();
  },

  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
        data: PostStore.getTree()
    });
  },

  _genNode: function(nodes){

    var navTree = function(nodes, depth){

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
                <a className="accordion-toggle" data-toggle="collapse" href={"#collapse-"+node.id}>
                  <i className="mdi-file-folder-open"></i> {node.title}
                </a>
              </div>
              <div id={"collapse-"+node.id} className="accordion-body collapse">
                {navTree(node.nodes, depth + 1)}
              </div>
            </div>
          );

        }else{

          return (
            <div className="accordion-inner" key={node.id}>
              {indents}
              <i className="mdi-action-description"></i> {node.title}
            </div>
          );
        }

      });

    }

    return navTree(nodes, 1);

  },

  render: function() {

    var treeCollapse = this._genNode(this.state.data);
    console.log(treeCollapse)

    return (

      <div className="accordion treeview">
        {treeCollapse}
      </div>

    );
  }
});

module.exports = TreeView;