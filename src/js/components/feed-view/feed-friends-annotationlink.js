var React = require('react');

var FriendsAnnotationLink = React.createClass({
  render: function() {
    var info = this.props.info
    var allSharedPost = [];
    console.log('INFO FROM API CALL', info);

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

          allSharedPost.push({
            picUrl: picUrl,
            userName: userName,
            userId: userId,
            uriLink: uriLink,
            title: title,
            generalPost: generalPost,
            redirectUri: redirectUri,
            isShared: isShared,
            time: time,
            comments: comments,
            likes: likes
          });
        }
      });
    });

    console.log('allSharedPost', allSharedPost);

    // creating react elements for all allSharedPost
    var allPost = allSharedPost.map(function(post, key) {
      console.log('POST: ', post, key);
      return (
        <div className='feed-friends-annotations-post' key={key}>
          <div className='post-pic-container'>
            <img src={post.picUrl} className='post-pic' />
          </div>

          <div className='post-body-container'>
            <div className='post-header-container'>
              <div className='post-name-container'>
                {post.userName}
              </div>

              <div className='post-time-container'>
                {post.time}
              </div>
            </div>

            <div className='post-title-container'>
              <a href={post.redirectUri} target='blank' className='redirectLink'>{post.title}</a>
            </div>

            <div className='post-like-comment-container'>
              <div className='post-likes-container'>
                likes : {post.likes.length}
              </div>

              <div className='post-comments-container'>
                comments : {post.comments.length}
              </div>
            </div>

          </div>
        </div>
      )
    });



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