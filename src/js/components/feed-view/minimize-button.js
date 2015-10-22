var React = require('react');

var MinimizeButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showAnnotatorView');
  }, 
  render: function() {
    return (
      <div onClick={this.handleClick}>
        MinimizeButton!
      </div>
    );
  }
});

module.exports = MinimizeButton;