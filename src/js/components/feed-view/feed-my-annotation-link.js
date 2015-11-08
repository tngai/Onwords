var React = require('react');

var MyLink = React.createClass({
  getInitialState: function() {
    return {
      showComments: false,
      showLikes: false,  
      annotation: {},
      generalPost: ''
    };
  },
  componentWillMount: function() {
    this.setState({annotation: this.props.annotation, generalPost: this.props.annotation.general_post});
  },
  handleClick: function(e) {
    e.preventDefault();
    // console.log('stuff',this);
    debugger;
    var message = $('.inputContent#'+this.props.index).val();
    var uri = this.state.annotation.uri_link;
    var user = window.localStorage.user_id;
    console.log('USER ID!!!', user, message, uri);
    var generalPost = {
      uri: uri,
      user_id: user,
      generalPost: message 
    };

    // making it shared.
    $.ajax({
      url: 'https://test2server.herokuapp.com/api/personalfeed/share?user_id='+ user +' &uri='+ uri +'&is_shared='+'true',
      method: "put",
      dataType: 'json'
    });

    // updating general post.
    $.ajax({
      url: 'https://test2server.herokuapp.com/api/uri/gp',
      method: "post",
      data: generalPost,
      dataType: 'json'
    });
    this.setState({generalPost: generalPost.generalPost});
// /api/personalfeed/share?user_id=INTEGER&uri=STRING&is_shared=BOOLEAN
  },
  render: function() {
    console.log('in MyAnnotationsLink', this.state.annotation);
    debugger;
    var annotation = this.state.annotation;
    var numberOfLikes = annotation.likes.length;
    var redirectUri = annotation.uri_link;
    var generalPost = this.state.generalPost;

    console.log(redirectUri);
    return (
      <div key={this.props.index} className='my-annotations-link-container'>
        <div className='my-annotations-title-container'>
          <a href={redirectUri} ref='uri' target='blank' className='redirectLink'>{annotation.title}</a>
        </div>
        
        {!generalPost ? 
          <div className='my-annotations-form-container'>
            <form autocomplete='off' onSubmit={this.handleClick}>
                <textArea id={this.props.index} className='inputContent' type='text' placeholder='Write a comment...' ref='postContent' />
                <button className='my-annotations-submit-button' onClick={this.handleClick}>Submit</button>
            </form>
          </div>
        : <div className='my-annotations-general-post'>{generalPost}</div>
        }

      </div>
    )
  }

});

module.exports = MyLink;
