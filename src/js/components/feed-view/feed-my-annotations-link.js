var React = require('react');

var MyAnnotationsLink = React.createClass({
  handleClick: function() {
    console.log('Posting!!!!');
  },

  render: function() {
    var handleClick = this.handleClick;
    var info = this.props.info;
    var user = window.localStorage.user_id;
    var urls = info.map(function(annotation, index) {
      console.log('in MyAnnotationsLink', annotation);
      var numberOfLikes = annotation.likes.length;
      var redirectUri = annotation.uri_link;
      console.log(redirectUri)
      return (
        <div key={index} className='my-annotations-link-container'>
          <div className='my-annotations-title-container'>
            <a href={redirectUri} target='blank' className='redirectLink'>{annotation.title}</a>
          </div>
          <div className='my-annotations-likes-container'>
            Likes : {numberOfLikes}
          </div>
          <div className='my-annotations-form-container'>
                <textarea type='text' placeholder='Write a comment...'></textarea>
                <button onClick={handleClick}>Post</button>
          </div>
        </div>
      )
    });
    return (
      <div className='my-annotations-links-container'>
        {urls}
      </div>
    )
  },
  componentDidMount: function() {
    console.log('MyAnnotationsLink - componentDidMount');
    $(document).on('click', '.redirectLink', function(e) {
      var url = $(this).attr('href');
      window.open(url, '_blank');  
    });
  },
  componentWillUnmount: function() {
    console.log('MyAnnotationsLink - componentWillUnmount');
    $(document).off();
  },
});

module.exports = MyAnnotationsLink;
