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
    // var completeUri = '?uri=' + 
    console.log('USER!!!',user, uri);
    // $.get('https://onwords-test-server.herokuapp.com/api/search?uri=http://alistapart.com/topic/javascript&user=1', function(result) {
    //   console.log('it worked!!', this.state.data);
    //   if (this.isMounted()) {
    //     this.setState({
    //       data: result
    //     });
    //   }
    //   console.log('it worked!!2', this.state.data);
    // }.bind(this));
  },
  render: function() {
    return (
      <div className='feed-my-annotations-container'>
        MyAnnotations!
      </div>
    );
  }
});

module.exports = MyAnnotations;
