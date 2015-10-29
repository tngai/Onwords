var React = require('react');

var FeedHomeButton = React.createClass({
  handleClick: function() {
    this.props.updateBodyView('showMyAnnotations');
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className='feed-home-button-container'>
        <img className='feed-home-button' src='http://www.clker.com/cliparts/T/W/F/L/n/h/home-png-md.png' />
      </div>
    );
  }
});

module.exports = FeedHomeButton;
