var React = require('react');
var MyAnnotationsLink = require('./feed-my-annotations-link');

var MyAnnotations = React.createClass({
  getInitialState: function() {
    return {
      info: []
    };
  },
  componentWillMount: function() {

  },
  componentDidMount: function() {
    var user = window.localStorage.user_id;
    var uri = window.location.href.split("?")[0];
    var completeUri = 'https://onwords-test-server.herokuapp.com/api/search/users?user_id=' + user;
    console.log('1!!!!!!!!');
    $.get(completeUri, function(result) {
      if (this.isMounted()) {
        console.log('info!', result.rows);
        this.setState({
          info: result.rows
        });
      }
      console.log('it worked!!2', this.state.info);
    }.bind(this));
  },
  render: function() {
    return (
      <div className='feed-my-annotations-container'>
        <MyAnnotationsLink info={this.state.info} />
      </div>
    );
  }
});

module.exports = MyAnnotations;
