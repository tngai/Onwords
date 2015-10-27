var React = require('react');

var AnnotatorMinimizeButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showAnnotatorButton');

    // image rendering from files
    // src={chrome.extension.getURL('/assets/right-copy.png')} 
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className='annotator-my-view-button-container' >
        <img className='annotator-my-view-button' src='http://frsports-bucket-0001.s3.amazonaws.com/wp-content/uploads/sites/6/2015/02/26224056/white-llama.jpg' />
      </div>
    );
  }
});

module.exports = AnnotatorMinimizeButton;