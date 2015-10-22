var React = require('react');

var HomeButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showFeedView');
  }, 
  render: function() {   
    return (
      <div onClick={this.handleClick}>
        <img className='home-button' src='https://image.freepik.com/free-icon/home_318-42210.png' />
      </div>
    );
  }
});

module.exports = HomeButton;
