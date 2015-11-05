var React = require('react');
var AnnotationLink = require('./feed-friends-annotationlink');

var FriendsAnnotations = React.createClass({
  getInitialState: function() {
    return {
      info: []
    }
  },
  render: function() {
    return (
      <AnnotationLink info={this.state.info} />
    );
  },
  componentWillUnmount: function() {
    console.log('MyAnnotationsLink - componentWillUnmount');
    $(document).off();
  },
  componentDidMount: function() {
    console.log('FriendsAnnotations - componentDidMount');
    var user = window.localStorage.user_id;
    var completeUri = 'https://test2server.herokuapp.com/api/homefeed?user_id=' + user;

    $.get(completeUri, function(result) {
      console.log('RESULT FROM API: ',result);
      if (this.isMounted()) {
        this.setState({
          info: result
        });
      }
      console.log('FriendsAnnotations state:INFO = ', this.state.info);
    }.bind(this));

    $(document).on('click', '.redirectLink', function(e) {
      var url = $(this).attr('href');
      window.open(url, '_blank');  
    });
  }
});

module.exports = FriendsAnnotations;
