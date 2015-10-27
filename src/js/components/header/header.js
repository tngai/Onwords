var React = require('react');

var AnnotatorHead = React.createClass({
  purgeHandler: function() {
    console.log('about to purge chrome.storage');
    chrome.storage.sync.clear()
    console.log('chrome.storage purged');
  }, 

  render: function() {
    return (
      <div className='annotator-head-container'>
        <div className='user-image-container'>
          <img src='http://frsports-bucket-0001.s3.amazonaws.com/wp-content/uploads/sites/6/2015/02/26224056/white-llama.jpg' className='annotator-user-image' />
        </div>
        
        <span>Jihoon Kim</span>
        <span>Hoonthegoon9000</span><br />
        <span onClick={this.purgeHandler}>Purge <code>chrome.storage</code></span>
      </div>
    );
  }
});

module.exports = AnnotatorHead;
