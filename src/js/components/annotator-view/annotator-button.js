var React = require('react');

var AnnotatorButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showAnnotatorView');
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className='annotator-button'>
        BTN!
      </div>
    );
  }
});

module.exports = AnnotatorButton;
