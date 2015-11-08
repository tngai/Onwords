var React = require('react');
var AnnotationLinkComment = require('./feed-friends-annotationlink-comments');

var AnnotationLikeComment = React.createClass({
  handleLikeClick: function() {
    console.log('likeClick!');
    // shange state to true and color image depending on what the current state is
    
    // make api call to server to change it there too.

  },
  handleClick: function() {
    console.log('IT WAS CLICKED!', this.props);
    this.props.handleCommentClick();
  },
  render: function() {
    var THIS = this;
    return (
      <div className='post-likes-and-comments-container'>
        <div className='post-likes-container' onClick={THIS.handleLikeClick}>
          likes : {this.props.post.likes.length}
        </div>

        <div className='post-comments-button-container' onClick={THIS.handleClick}>
          comments : {this.props.post.comments.length} 
        </div>
      </div>
    );
  }
});

module.exports = AnnotationLikeComment;