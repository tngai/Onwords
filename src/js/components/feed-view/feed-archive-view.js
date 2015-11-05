var React = require('react');
var ArchiveView = require('./feed-search-list');

var ArchiveView = React.createClass({
  getInitialState: function() {
    return {
      results: ''
    };
  },

  // didComponentMount:
  render: function() {
    console.log('FeedSearchView rendered');
    var ownId = window.localStorage.getItem('user_id');
    return (
      <div className='search-view-container'>
        <form onSubmit={this.handleSubmit} className='form-search-container'>
          <input type='text' ref='input' placeholder='Find people to follow...' />
        </form>
        <FeedSearchList
         fullName={this.state.text}
         updateBodyView={this.props.updateBodyView}
         ownId={ownId} />
      </div>
    );
  }
});

module.exports = ArchiveView;
