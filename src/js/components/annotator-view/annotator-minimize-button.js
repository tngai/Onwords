var React = require('react');

var AnnotatorMinimizeButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showAnnotatorButton');
  },
  render: function() {
    return (
      <div onClick={this.handleClick}>
        Minimize!
      </div>
    );
  }
});

module.exports = AnnotatorMinimizeButton;