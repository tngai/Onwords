var React = require('react');

var FeedSearchList = React.createClass({
  getInitialState: function() {
    return {
      results: []
    };
  },

  componentDidMount: function() {
  //   var urlPrefix = 'https://onwords-test-server.herokuapp.com/api/users';
  // /*  // var ownId = window.localStorage.getItem('user_id');
  //   // var userIdQS = '?user_id=' + ownId;
  //   // var fullNameQS = '&full_name=' + this.props.fullName;
  //   // var url = urlPrefix + userIdQS + fullNameQS;  */
  //   var fullNameQS = '?full_name=' + this.props.fullName;
  //   var url = urlPrefix + fullNameQS;
  //   console.log('FeedSearchList componentDidMount, right before if condition..., this.props.fullName:', this.props.fullName);
  //   if (this.props.fullName) {
  //     console.log('FeedSearchList componentDidMount, about to call $.get...');
  //     $.get({
  //       url: url,
  //       dataType: 'json',
  //       cache: false,
  //       success: function(data) {
  //         this.setState({results: [data]});
  //       }.bind(this),
  //       error: function(xhr, status, err) {
  //         console.error(url, status, err.toString());
  //       }.bind(this)
  //     });
  //   }

    // var sampleData = [
    //   {
    //     full_name: "Cason Jollins",
    //     pic_url: "http://www.makersquare.com/pictures/people/jasoncollins.jpg",
    //     isFollowing: true
    //   }, {
    //     full_name: "Rati Nodriguez",
    //     pic_url: "http://www.makersquare.com/pictures/people/natirodriguez.png",
    //     isFollowing: false
    //   }
    // ];
    // this.setState({results: sampleData});
  },

  render: function() {
    var feedSearchResults = this.props.resultsData.map(function(result, index) {
      var picUrl = result.pic_url;
      var fullName = result.full_name;
      var description = null;
      if (description === null) {
        description = "I am an annotator!";
      }
      var isFollowing = result.isFollowing;

      var follow = <button className="feed-search-follow">Follow</button>;
      return (
        <li className="feed-search-result" key={index}>
          <div className="feed-search-img"><img src={picUrl} /></div>
          <div className="feed-search-name">{fullName}</div>
          {isFollowing ? <div>✓</div> : <div>+</div>}
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