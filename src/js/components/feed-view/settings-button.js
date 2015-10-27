var React = require('react');

var SettingsButton = React.createClass({
  handleClick: function() {
    this.props.updateBodyView('showSettingsPage');
  },
  render: function() {
    return (
      <div onClick={this.handleClick}>
        ST
      </div>
    );
  }
});

module.exports = SettingsButton;
