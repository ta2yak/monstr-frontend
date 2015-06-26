var React = require('react');

var IndexActionCreators = require('../../actions/IndexActionCreators.react.jsx');
var PostActionCreators = require('../../actions/PostActionCreators.react.jsx');

var IndexStore = require('../../stores/IndexStore.react.jsx');

var PostIndexTree = React.createClass({
  getInitialState: function() {
      return {data: []};
  },

  componentDidMount: function() {
    IndexStore.addChangeListener(this._onChange);
    IndexActionCreators.loadIndex();
  },

  componentWillUnmount: function() {
    IndexStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
        data: IndexStore.getIndexes()
    });
  },

  _genNode: function(nodes){

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
              <a onClick={onSelect.bind(this, node.post)}>
                <i className="mdi-action-description"></i> {node.title}
              </a>
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
