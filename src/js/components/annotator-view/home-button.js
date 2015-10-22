var React = require('react');

var HomeButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showFeedView');
  }, 
  render: function() {   
    return (
      <div onClick={this.handleClick}>
        HomeButton!
      </div>
    );
  }
});

module.exports = HomeButton;
