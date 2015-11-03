var React = require('react');

var FriendsAnnotationLink = React.createClass({
  render: function() {
    var info = this.props.info
    console.log('INFO!!!', info);

    // mapping data without timestamps
    //    info : users
    var friendsPost = info.forEach(function(user, key) {
      console.log('Users', user, key);
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