var React = require('react');

var AnnotationLinkComment = React.createClass({
  getInitialState: function() {
    return {
      comments: [] 
    };
  },
  componentWillMount: function() {
    
  },
  componentDidMount: function() {
    console.log('AnnotationLinkComment componentDidMount');
    var THIS = this;
    var uri = this.props.post.uriLink;
    var userID = this.props.post.userId;
    var requestUrl =  'https://test2server.herokuapp.com/api/homefeed/comments?user_id=' + userID + '&uri=' + uri;
    
    $.get(requestUrl, function(comments) {
      console.log('COMMENTS!!', comments);
      if (THIS.isMounted()) {
        THIS.setState({
          comments: comments
        });
      }
    }.bind(this));
  },
  render: function() {
    var allComments = this.state.comments.map(function(comment, key) {
      console.log('EACH COMMENT', comment);
      return (
        <div  className='comment-containers' key={key}>
          <div className='comment-header'>
            <div className='comment-pic-container'>
              <img src={comment.pic_url} className='comment-pic' />
            </div>
            <div className='comment-username'>
              {comment.full_name}
            </div>
          </div>

          <div className='comment-message'>
            {comment.message}
          </div>
        </div>
      );
    });

    return (
      <div className='comment-container'>
        {allComments}
      </div>
    );
  }
});

module.exports = AnnotationLinkComment;