var React = require('react');

var MinimizeButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showAnnotatorView');
  }, 
  render: function() {
    return (
      <div onClick={this.handleClick} className='minimize-button-container'>
        <img className='minimize-button' src={chrome.extension.getURL('/assets/angle2.png')} />
      </div>
    );
  }
});

module.exports = MinimizeButton;
