var React = require('react');
var FeedSearchList = require('./feed-search-list');

var FeedSearchView = React.createClass({
  getInitialState: function() {
    return {
      text: '',
      results: []
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var inputVal = React.findDOMNode(this.refs.input).value;
    if (inputVal === '') { return; }
    console.log('handleSubmit value:', inputVal);
    // this.setState({text: inputVal});

    var urlPrefix = 'https://onwords-test-server.herokuapp.com/api/users';
    var fullNameQS = '?full_name=' + inputVal;
    var url = urlPrefix + fullNameQS;
    $.get(url, function(data) {
      this.setState({results: data.rows});
    }.bind(this));

  },

  render: function() {
    console.log('feed-search-view being rendered! here’s state:', this.state);
    return (
      <div className='search-view-container'>
        <form onSubmit={this.handleSubmit} className='form-search-container'>
          <input type='text' ref='input' placeholder='Find people to follow...' />
        </form>
      <FeedSearchList resultsData={this.state.results} />
      </div>
    );
  }
});

module.exports = FeedSearchView;
