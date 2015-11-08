var React = require('react');
var AnnotationLikeComment = require('./feed-friends-annotationlink-like-comment');
var AnnotationLinkComment = require('./feed-friends-annotationlink-comments');

var AnnotationLink = React.createClass({
  getInitialState: function() {
    return {
      showComments: false 
    };
  },
  handleCommentClick: function() {
    console.log('showComments');
    if(this.state.showComments === false){
      this.setState({showComments: true});
    } else {
      this.setState({showComments: false});
    }
  },
  render: function() {
    console.log('PROPS!', this.props.post)
    var THIS = this;
    return (
      <div className='comment-main-container'>
        <div className='post-pic-container'>
          <img src={this.props.post.picUrl} className='post-pic' />
        </div>

        <div className='post-body-container'>
          <div className='post-header-container'>
            <div className='post-name-container'>
              {this.props.post.userName}
            </div>

            <div className='post-time-container'>
              {this.props.post.time}
            </div>
          </div>

          <div className='post-title-container'>
            <a href={this.props.post.redirectUri} target='blank' className='redirectLink'>{this.props.post.title}</a>
          </div>

          <div className='post-general-post-container'>
            {this.props.post.generalPost}
          </div>

          <div className='post-like-comment-container'>
            <AnnotationLikeComment post={this.props.post} key={this.props.key} handleCommentClick={this.handleCommentClick}/>            
          </div>
        </div>
  
        {this.state.showComments ? <AnnotationLinkComment post={this.props.post} /> : null}

      </div>
    );
  }
});

module.exports = AnnotationLink;