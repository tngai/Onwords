var React = require('react');

var MyAnnotations = React.createClass({
  getInitialState: function() {
    return {
      data: null 
    };
  },
  componentWillMount: function() {

  },
  componentDidMount: function() {
    var user = window.localStorage.user_id;
    var uri = window.location.href.split("?")[0];
    var completeUri = 'https://onwords-test-server.herokuapp.com/api/search/users?user_id=' + user;
    $.get(completeUri, function(result) {
      if (this.isMounted()) {
        this.setState({
          data: result
        });
      }
      console.log('it worked!!2', this.state.data);
    }.bind(this));
  },
  render: function() {
    var annotations = this.state.data;
    var myAnnotationsList = annotations.map(function(currentAnnotation, index) {
      console.log(currentAnnotation, index);
    });
    return (
      <div className='feed-my-annotations-container'>
        MyAnnotations!
      </div>
    );
  }
});

module.exports = MyAnnotations;
