var React = require('react');

var FeedSearchButton = React.createClass({
  handleClick: function() {
    this.props.updateBodyView('showSearchView');
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className='search-button-container'>
        <img className='search-button' src={chrome.extension.getURL('/assets/search.png')} />
      </div>
    );
  }
});

module.exports = FeedSearchButton;
