var React = require('react');

var CommentInput = React.createClass({
  getInitialState: function() {
    return {
      pic: '',
      didPost: false
    };
  },
  componentWillMount: function() {
    var THIS = this;
    chrome.storage.sync.get('user', function(info) {
      THIS.setState({pic: info.user.picUrl});
    }); 
        // <button type='submit' />
  },
  handleSubmit: function(e) {
    var message = $('.comment-input').val();
    var uri = this.props.post.uriLink;
    var user = window.localStorage.user_id;
    var comment = {
      uri: uri,
      user_id: user,
      follower_id: this.props.post.userId,
      message: message 
    };

    // making a post.
    $.ajax({
      url: 'https://test2server.herokuapp.com/api/comments',
      method: 'post',
      data: comment,
      dataType: 'json'
    });
    this.setState({didPost: true});
  },
  render: function() {

    return (
      <div className='comment-main-containers'>
        <div className='comment-pic-container'>
          <img src={this.state.pic} className='comment-pic' />
        </div>
        <input type='text' className='comment-input' placeholder='Write a comment...'/>
        <input type='submit' className='comment-input-button' value='Post' onClick={this.handleSubmit} />
      </div>
    );
  }
});

module.exports = CommentInput;
