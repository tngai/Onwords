var React = require('react');

var FeedSearchList = React.createClass({
  getInitialState: function() {
    return {
      results: []
    };
  },

  componentDidMount: function() {
    var urlPrefix = 'https://onwords-test-server.herokuapp.com/api/user';
    var ownId = window.localStorage.getItem('user_id');
    var userIdQS = '?user_id=' + ownId;
    var fullNameQS = '&full_name=' + this.props.fullName;
    var url = urlPrefix + userIdQS + fullNameQS;

    $.get({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({results: [data]});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var feedSearchResults = this.state.results.map(function(result, index) {
      var picUrl = result.pic_url;
      var fullName = result.full_name;
      var isFollowing = result.isFollowing;

      return (
        <li className="feed-search-result" key={index}>
          <span><img src={picUrl} /></span>
          <span>{fullName}</span>
          {isFollowing ? <span>&check;</span> : <span>&plus;</span>}
        </li>
      );
    });

    return (
      <ul className='feed-search-results'>
        {feedSearchResults}
      </ul>
    );
  }
});

module.exports = FeedSearchList;