var React = require('react');

var FriendsAnnotationLink = React.createClass({
  render: function() {
    var info = this.props.info
    console.log('INFO!!!', info);

    // mapping data without timestamps
    //    info : users
    var allPosts = [];
    info.forEach(function(user, key1) {
      var userName = user.full_name;
      var picUrl = user.pic_url ? user.pic_url : 'http://register.adviceiq.com/img/empty_profile.png';
      var allArticles = user.articles;
      var userId = user.user_id;
      console.log('Users', user, userName, picUrl);

      // render all annotations for each user.
      var post = allArticles.map(function(article, key2) {
        var title = article.title;
        var likes = article.likes.length;
        // var general_post = article.general_post;
        // var comments = article.commentsOnGeneralPost.forEach(function(){});

        var redirectUri = article.uri_link + '#' + userId + 'onwords1991';
        console.log('Article', redirectUri, likes, title);

        return (
          <div key={key1 + key2}>
            hello
          </div>
        ); 
      });

      allPosts.concat(post);
      console.log('ALL POST',allPosts);
    });
    // var redirectUri = info.uri + '#' + info.user_id + 'onwords1991';
    // console.log('REDIRECT LINK',redirectUri)
    // return (
    //   <div>
    //     <img className='friends-pic' src={info.profPic}/>
    //     <p>{info.name}</p>
    //     <a href={redirectUri} target='blank' className='redirectLink'>{info.title}</a>
    //   </div>
    // )
    return (
      <div>hello</div>
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