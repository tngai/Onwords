var React = require('react');
var HomeButton = require('../annotator-view/home-button');
var AnnotatorMinimizeButton = require('../annotator-view/annotator-minimize-button');
var MyAnnotationsButton = require('./my-annotations-button');
var FriendAnnotationList = require('./friends-annotationList');

var FriendsAnnotationsView = React.createClass({
  getInitialState: function() {
    return {
      annotations: [],
      friends: {1: {shown: false}, 2: {shown: false}}
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
    console.log('toggleFriendAnnotations: ', id)
    var friends = this.state.friends;

    if (!friends[id].shown) {
      var ev = new CustomEvent('getFriendAnnotations', {detail: {userId: id}});
      document.dispatchEvent(ev);
      friends[id].shown = true;
      console.log(friends[id], ' stored in chrome now')
    } else {
      friends[id].shown = false;
      var targetAnnotations = [];
      for (var i = 0; i < this.state.annotations.length; i++) {
        console.log(this.state.annotations[i]);
        if (this.state.annotations[i].user_id.toString() === id) {
          targetAnnotations.push(this.state.annotations[i]);
        }
      }
      var ev = new CustomEvent('deleteRender', {detail: {
        targetAnnotations: targetAnnotations
      }});
      document.dispatchEvent(ev);
    }
  },

  render: function() {
    var friendsArray = Object.keys(this.state.friends);
    var self = this;

    var friendCarousel = friendsArray.map(function(friend, index) {
      return (
        <div className='friends-pic' data-id={friend} onClick={self.toggleFriendAnnotations.bind(null, friend)}></div>
      )
    })

    console.log('inside-friendsview, annotations:', this.state.annotations)

    return (
      <div className='friends-annotations-view-container'>
        <div className='friends-annotations-buttons-container'>
          <AnnotatorMinimizeButton {...this.props} />
          <MyAnnotationsButton {...this.props} />
          <HomeButton {...this.props} />
        </div>

        <div className='friends-container'>
          {friendCarousel}
        </div>
        <div className='friends-annotations-list'>
          {this.state.annotations.length > 0 ? <FriendAnnotationList friends={this.state.friends} annotations={this.state.annotations}/> : null}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    console.log('friend annotations view mounted');
    var self = this;
    chrome.storage.onChanged.addListener(function(changes) {
      console.log('chrome storage changed mothafucka')
      debugger;
      var uri = window.location.href.split('?')[0];
        self.setState({annotations: changes[uri].newValue});
    })
  }
});

module.exports = FriendsAnnotationsView;
