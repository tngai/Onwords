var React = require('react');
var MinimizeButton = require('./minimize-button');
var Header = require('../header/header');
var AnnotatorMixin = require('../mixins/annotatormixin');
var SettingsButton = require('./settings-button');

var FeedView = React.createClass({
  getInitialState: function() {
    return {
      showSettingsPage: false,
      showFriendsFeed: true, 
      showMyAnnotations: false
    };
  },
  componentWillMount: function() {
    console.log('FeedView mounted');
    var THIS = this;
    $(document).on('click', 'body', function(e) {
        if($(e.target).attr('data-reactid')){
            e.preventDefault();
            return;
        }
        THIS.props.updateView('showAnnotatorButton');
    });
  },
  componentWillUnmount: function() {
    console.log('FeedView componentWillUnmount');
    $(document).off();
  },
  render: function() {
    return (
      <div className='feed-view-container'>
        <div className='header-container'>
          <MinimizeButton {...this.props} />
          <div>Onwords</div>
          <SettingsButton {...this.props} />
        </div>

        <div className='body-container'>
          <div>settings</div>
          <div>showMyAnnotations</div>
          <div>showFriendsFeed</div>
        </div>

      </div>
    );
  }
});

module.exports = FeedView;
