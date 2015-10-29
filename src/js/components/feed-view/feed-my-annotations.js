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
    $.get('https://onwords-test-server.herokuapp.com/api/search/user_uri?user=1', function(result) {
      console.log('it worked!!', this.state.data);
      if (this.isMounted()) {
        this.setState({
          data: result
        });
      }
      console.log('it worked!!2', this.state.data);
    }.bind(this));
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
