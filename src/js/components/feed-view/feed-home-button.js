var React = require('react');

var FeedHomeButton = React.createClass({
  handleClick: function() {
    this.props.updateBodyView('showMyAnnotations');
  },
  render: function() {
    return (
      <div onClick={this.handleClick} >H</div>
    );
  }
});

module.exports = FeedHomeButton;
