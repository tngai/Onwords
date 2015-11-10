var React = require('react');
var AnnotationLinkComment = require('./feed-friends-annotationlink-comments');

var AnnotationLikeComment = React.createClass({
  getInitialState: function() {
    return {
      liked: false,
      likeCount: ''
    };
  },
  handleLikeClick: function() {
    console.log('likeClick!',this.state.likeCount );
    if(this.state.liked){
      var currentCount = this.state.likeCount;
      currentCount--;
      this.setState({liked: false});
      this.setState({likeCount: currentCount});
      // // make api call  
      var uri = this.props.post.uriLink;
      var user = window.localStorage.user_id;
      var likeInfo = {
        uri: uri,
        user_id: this.props.post.userId,
        follower_id: user,
        likeToggle: false
      };
      console.log('WE ARE un LIKING IT');
      $.ajax({
        url: 'https://test2server.herokuapp.com/api/likes',
        method: 'post',
        data: likeInfo,
        dataType: 'json'
      });
    } else {
      var currentCount = this.state.likeCount;
      currentCount++;
      this.setState({liked: true});
      this.setState({likeCount: currentCount});
      // make api call
      var uri = this.props.post.uriLink;
      var user = window.localStorage.user_id;
      var likeInfo = {
        uri: uri,
        user_id: this.props.post.userId,
        follower_id: user,
        likeToggle: true
      };
      console.log('WE ARE LIKING IT');
      $.ajax({
        url: 'https://test2server.herokuapp.com/api/likes',
        method: 'post',
        data: likeInfo,
        dataType: 'json'
      });
    }

  },
  handleClick: function() {
    console.log('IT WAS CLICKED!', this.props);
    this.props.handleCommentClick();
  },
  componentWillMount: function() {
    console.log('PORPS COMMING IN', this.props.post.likes.length);
    this.setState({liked: this.props.post.liked});
    this.setState({likeCount: this.props.post.likes.length});
  },
  render: function() {
    var THIS = this;
    return (
      <div className='post-likes-and-comments-container'>
        <div className='post-likes-container' onClick={THIS.handleLikeClick}>
          {this.state.liked ? <img src={chrome.extension.getURL('/assets/heart-red.png')} className='heart-icon' /> : <img src={chrome.extension.getURL('/assets/heart.png')} className='heart-icon' />}  {this.state.likeCount}
        </div>

        <div className='post-comments-button-container' onClick={THIS.handleClick}>
          <img src={chrome.extension.getURL('/assets/comment.png')} className='comment-icon' />  {this.props.post.comments.length} 
        </div>
      </div>
    );
  }
});

module.exports = AnnotationLikeComment;