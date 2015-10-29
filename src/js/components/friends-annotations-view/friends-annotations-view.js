var React = require('react');
var HomeButton = require('../annotator-view/home-button');
var AnnotatorMinimizeButton = require('../annotator-view/annotator-minimize-button');
var MyAnnotationsButton = require('./my-annotations-button');
var friendAnnotationList = require('./friends-annotationList');

var FriendsAnnotationsView = React.createClass({
  getInitialState: function() {
    return {
      annotations: [],
      friends: {1: {shown: false, stored: false}, 2: {shown: false, stored: false}}
    }
  },
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

  toggleFriendAnnotations: function(id) {
    var friends = this.state.friends;

    if (!friends[id].shown) {
      if (friends[id].stored) {
        friends[id].shown = true;
      } else {
        var ev = new CustomEvent('showFriendAnnotations', {detail: {userId: id}});
        document.dispatchEvent(ev);
        friends[id].stored = true;
      }
    } else {
      hiddenFriends[id].shown = false;
    }


    //send custom event
      //load annotations in annotator
        //load highlights (annotationloaded)
    //listener in didmount for chrome storage change
      //set 'annotationsLoaded' state to true for specific friend
      //set annotations state
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
          <div data-id={id} onClick={this.toggleFriendAnnotations.bind(null, id)}></div>
        </div>
        {this.state.annotations.length > 0 ? <friendAnnotationList friends={this.state.friends} annotations={this.state.annotations}/> : null}
      </div>
    );
  },

  componentDidMount: function() {
    chrome.storage.onChanged.addListener(function(changes) {
      var uri = window.location.href.split('?')[0];
      
      // if(changes[uri] && changes[uri].newValue) {
      //   for (var i = 0; i < changes[uri].newValue.length; i++) {
      //     var friend = changes[uri].newValue[i].user;
      //     friends[friend].stored = true;
      //   }
        self.setState({annotations: changes[uri].newValue});
    })
  }
});

module.exports = FriendsAnnotationsView;
