var React = require('react');
var AnnotationLink = require('./feed-friends-annotationslink');

var FriendsAnnotationLink = React.createClass({
  render: function() {
    var info = this.props.info
    var allSharedPost = [];
    // sort data based on isShared into an array(allSharedPost)
    info.forEach(function(user, key1) {
      var userName = user.full_name;
      var picUrl = user.pic_url ? user.pic_url : 'http://register.adviceiq.com/img/empty_profile.png';
      var userId = user.user_id; 
    
      var allArticles = user.articles;
      allArticles.forEach(function(article, key2) {
        if(article.is_shared){
          var uriLink = article.uri_link;
          var title = article.title;
          var generalPost = article.general_post;
          var redirectUri = article.uri_link + '#' + userId + 'onwords1991';
          var isShared = article.is_shared;
          var time = article.updated_at;

          var comments = article.commentsOnGeneralPost.map(function(comment, key) {
            return comment;
          });

          var likes = article.likes.map(function(like, key) {
            return like;
          });

          // check if its liked by me
          var liked = false;
          var myID = window.localStorage.user_id;
          if(likes.length >= 1){
            var isLikedByMe = article.likes.forEach(function(curr, i) {
              if(curr.follower_id === myID){
                liked = true;
              }
            });
          }

          var currentTime = new Date();
          var postMinute = Number(time.slice(8,10));
          var currentMinute = Number(currentTime.toUTCString().slice(20,22));
          var postHour = Number(time.slice(11, 13));
          var currentHour = Number(currentTime.toUTCString().slice(17,19));
          var postDate = Number(time.slice(8, 10));
          var currentDate = Number(currentTime.toUTCString().slice(5,7));
          var diff, message;

          if (postDate === currentDate) {
              if (postHour === currentHour) {
                  diff = currentMinute - postMinute;
                  message = diff + ' minutes ago'
              } else {
                  diff = currentHour - postHour;
                  message = diff + ' hours ago'
              }
          } else {
              diff = currentDate - postDate;
              message = diff + ' days ago'
          }

          allSharedPost.push({
            picUrl: picUrl,
            userName: userName,
            userId: userId,
            uriLink: uriLink,
            title: title,
            generalPost: generalPost,
            redirectUri: redirectUri,
            isShared: isShared,
            time: message,
            comments: comments,
            likes: likes,
            liked: liked
          });
        }
      });
    });

    // creating react elements for all allSharedPost
    var allPost = allSharedPost.map(function(post, key) {
      console.log('POST: ', post, key);
      return (
        <div className='feed-friends-annotations-post' key={key}>
          <AnnotationLink post={post} key={key}/>
        </div>
      )
    }, this);

    return (
      <div className='feed-friends-annotations-container'>
        {allPost}
      </div>
    )
  },
  componentDidMount: function() {
    $('.redirectLink').click(function(e) {
      e.preventDefault();
      var url = $(this).attr('href');
      window.open(url, '_blank');
    })
  }
});

module.exports = FriendsAnnotationLink;