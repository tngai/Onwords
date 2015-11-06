var React = require('react');

var AnnotationComment = React.createClass({
  getInitialState: function() {
    return {
      showComments: false,
      showLike: false 
    };
  },
  handleCommentClick: function(e) {
    console.log('showComments');
    // show comments
  },
  handleLikeClick: function() {
    console.log('likeClick!');
    // shange state to true and color image

    // make api call to server to change it there too.

  },
  render: function() {
    return (
      <div>
        <div>
          <div className='post-likes-container'>
            likes : {this.props.post.likes.length}
          </div>

          <div className='post-comments-container'>
            comments : {this.props.post.comments.length} 
          </div>
        </div>

        <div>
          
        </div>
      </div>
    );
  }
});

module.exports = AnnotationComment;