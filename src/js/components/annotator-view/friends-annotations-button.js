var React = require('react');

var FriendsAnnotationsButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showFriendsAnnotations');
  }, 
  render: function() {   
    return (
      <div onClick={this.handleClick} className='friends-annoataions-button-container'>
        <img className='friends-annotations-button' src={chrome.extension.getURL('/assets/angle.png')} />
      </div>
    );
  }
});

module.exports = FriendsAnnotationsButton;
