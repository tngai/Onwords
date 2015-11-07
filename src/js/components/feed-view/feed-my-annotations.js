var React = require('react');
var MyAnnotationsLink = require('./feed-my-annotations-link');

var MyAnnotations = React.createClass({
  getInitialState: function() {
    return {
      info: [],
      user: {},
      showHeader: false
    };
  },
  componentDidMount: function() {
    console.log('MyAnnotations - componentDidMount');
    var user = window.localStorage.user_id;
    var uri = window.location.href.split("?")[0];
    var completeUri = 'https://test2server.herokuapp.com/api/personalfeed?user_id=' + user;
    var self = this;
    $('#annotation-header').slideUp('fast', function() {
      $.get(completeUri, function(result) {
        if (self.isMounted()) {
          self.setState({
            info: result
          });
        }
        console.log('MyAnnotations state:INFO = ', self.state.info);
        self.setState({showHeader: true});
      });
    });


    chrome.storage.sync.get('user',function(data){
      var userInfo = {
        pic_url: data.user.picUrl,
        username: data.user.fullName,
        description: data.user.description || 'OnWords  !!  '
      };
      this.setState({user: userInfo});
    }.bind(this));

    $(document).on('click', '.redirectLink', function(e) {
      var url = $(this).attr('href');
      window.open(url, '_blank');  
    });
  },
  componentWillUnmount: function() {
    $('#annotation-header').slideDown('fast');
    console.log('MyAnnotationsLink - componentWillUnmount');
    $(document).off();
  },
  render: function() {
    return (
      <div className='feed-my-annotations-container'>
       
        <div className='banner-pic-container'>
          <img className='banner-pic' src={this.state.user.pic_url} />
        </div>
        <MyAnnotationsLink info={this.state.info} />
      </div>
    );
  }
});

module.exports = MyAnnotations;
