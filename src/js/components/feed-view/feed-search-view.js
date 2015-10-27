var React = require('react');

var FeedSearchView = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var inputVal = React.findDOMNode(this.refs.input).value;
    console.log('Search:', inputVal);
  },
  render: function() {
    return (
      <div className='search-view-container'>
        <form onSubmit={this.handleSubmit} className='form-search-container'>
          <input type='text' ref='input' placeholder='Search' />
        </form>
      </div>
    );
  }
});

module.exports = FeedSearchView;
