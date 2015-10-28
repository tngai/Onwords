var React = require('react');

var MyAnnotationsButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showAnnotatorView');
  }, 
  render: function() {   
    return (
      <div onClick={this.handleClick} className='my-annoataions-button-container'>
        <img className='my-annotations-button' src='http://frsports-bucket-0001.s3.amazonaws.com/wp-content/uploads/sites/6/2015/02/26224056/white-llama.jpg' />
      </div>
    );
  }
});

module.exports = MyAnnotationsButton;
