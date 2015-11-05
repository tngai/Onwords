var React = require('react');

var ArchiveButton = React.createClass({
  handleClick: function() {
    this.props.updateBodyView('showArchiveView');
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className='feed-button'>
        <img className="feed-button" src={chrome.extension.getURL('/assets/archive.png')} />
      </div>
    );
  }
});

module.exports = ArchiveButton;
