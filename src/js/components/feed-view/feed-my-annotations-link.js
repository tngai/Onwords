var React = require('react');

var MyAnnotationsLink = React.createClass({
  componentDidMount: function() {
    $('.redirectLink').click(function(e) {
      e.preventDefault();
      console.log('WE ARE INSIDE DUDE', this);
      var url = $(this).attr('href');
      window.open(url, '_blank');
    })
  },
  render: function() {
    var info = this.props.info
    var urls = info.map(function(annotation, index) {
      console.log('in MyAnnotationsLink', annotation);

      var redirectUri = annotation.uri + '#' + annotation.user_id + 'onwords1991';
      console.log(redirectUri)
      return (
        <div>
          <a href={redirectUri} key={index} target='blank' className='redirectLink'>Website title</a>
        </div>
      )
    });

    return (
      <div>
        {urls}
      </div>
    )
  }
});

module.exports = MyAnnotationsLink;
