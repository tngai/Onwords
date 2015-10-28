var React = require('react');
var HomeButton = require('../annotator-view/home-button');
var AnnotatorMinimizeButton = require('../annotator-view/annotator-minimize-button');
var MyAnnotationsButton = require('./my-annotations-button');

var FriendsAnnotationsView = React.createClass({
  componentWillMount: function() {
    console.log('friends annotaions mounted');
    var THIS = this;
    $(document).on('click', 'body', function(e) {
      console.log('e is : ', e);
      // highlighter click check
      if(getSelection().toString()) {
        return;
      }
      if($(e.target).attr('data-reactid')) {
        e.preventDefault();
        return;
      }
      if($(e.target).is('[class^="annotator-"]') || $(e.target).is('[id^="annotator-"]')) {
          e.preventDefault();
          return;
      }
      THIS.props.updateView('showAnnotatorButton');
    });
  },
  componentWillUnmount: function() {
    console.log('friends annotaions mounted unmounted');
    $(document).off();
  },
  render: function() {
    return (
      <div className='friends-annotations-view-container'>
        <div className='friends-annotations-buttons-container'>
          <AnnotatorMinimizeButton {...this.props} />
          <MyAnnotationsButton {...this.props} />
          <HomeButton {...this.props} />
        </div>

        <div className='friends-container'>
          <div className='friends-pic'></div>
          <div className='friends-pic'></div>
        </div>

        FRIENDS ANNOTATIONS HERE BRO!
      </div>
    );
  }
});

module.exports = FriendsAnnotationsView;
