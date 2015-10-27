var React = require('react');

var FeedSearchButton = React.createClass({
  handleClick: function() {
    this.props.updateBodyView('showSearchView');
  },
  render: function() {
    return (
      <div onClick={this.handleClick} >S-btn</div>
    );
  }
});

module.exports = FeedSearchButton;
