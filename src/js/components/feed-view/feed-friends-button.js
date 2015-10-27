var React = require('react');

var FeedFriendsButton = React.createClass({
  handleClick: function() {
    this.props.updateBodyView('showFriendsAnnotations');
  },
  render: function() {
    return (
      <div onClick={this.handleClick}>F</div>
    );
  }
});

module.exports = FeedFriendsButton;
