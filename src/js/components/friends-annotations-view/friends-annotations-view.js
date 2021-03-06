var React = require('react');
var ReactAddons = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var HomeButton = require('../annotator-view/home-button');
var AnnotatorMinimizeButton = require('../annotator-view/annotator-minimize-button');
var MyAnnotationsButton = require('./my-annotations-button');
var FriendAnnotationList = require('./friends-annotationList');

var FriendsAnnotationsView = React.createClass({
  getInitialState: function() {
    return {
      annotations: [],
      friendsShown: {},
      friendsInfo: {}
    }
  },

  componentWillMount: function() {
    var THIS = this;
    $(document).on('click', 'body', function(e) {
      
      if (e.target.className === 'annotator-button') {
        return;
      }
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


  componentWillReceiveProps: function(nextProps) {
    if (nextProps.annotations !== this.props.annotations) {
      var newFriends = {};
      var oldFriends = this.state.friendsShown;
      if (nextProps.annotations.length > 0) {
        for (var i = 0; i < nextProps.annotations.length; i++) {
          var user = nextProps.annotations[i].user_id;
          newFriends[user] = {shown: true, pic: oldFriends[user].pic, name: oldFriends[user].name};
        }
      }

      for (var friend in oldFriends) {
        if (newFriends[friend] === undefined) {
          newFriends[friend] = {shown: false, pic: oldFriends[friend].pic, name: oldFriends[friend].name};
        }
      }
      this.setState({annotations: nextProps.annotations, friendsShown: newFriends});      
    }
  },
  

  componentWillUnmount: function() {
    $(document).off();
  },

  toggleFriendAnnotations: function(id) {
    var friends = this.state.friendsShown;

    if (!friends[id].shown) {
      var ev = new CustomEvent('getFriendAnnotations', {detail: {userId: id}});
      document.dispatchEvent(ev);
    } else {
      var targetAnnotations = [];
      for (var i = 0; i < this.state.annotations.length; i++) {
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
    var ownId = window.localStorage.getItem('user_id');
    var friendsArray = Object.keys(this.state.friendsShown);
    var friendsObject = this.state.friendsShown;
    var self = this;

    var friendCarousel = friendsArray.map(function(friend, index) {
      if (friend !== ownId) {
        return (
          <img key={index} data-id={friend} onClick={self.toggleFriendAnnotations.bind(null, friend)} className='friends-pic' src={friendsObject[friend].pic} />
        )
      }
    })
    

    return (
      <div className='friends-annotations-view-container'>
        <div className='friends-annotations-header'>
          <div className='friends-annotations-buttons-container'>
            <AnnotatorMinimizeButton {...this.props} />
            <div className='annotations-title'>ANNOTATIONS</div>
            <MyAnnotationsButton toggleFriendAnnotations={this.toggleFriendAnnotations} />
          </div>

          <div className='friends-heading'>People You Follow</div>
          <div className='friends-container'>
            {friendCarousel}
          </div>
        </div>
        <br></br>
          <div className='friends-annotations-list'>
            {this.state.annotations.length > 0 ? <FriendAnnotationList {...this.props} friends={this.state.friendsShown} annotations={this.state.annotations}/> : null}
          </div>
      </div>
    );
  },

  componentDidMount: function() {
    var self = this;
    var ownId = window.localStorage.getItem('user_id');
    var uri = window.location.href.split("?")[0];
    if (uri.substring(uri.length-11) === 'onwords1991') {
      uri = uri.substring(0, uri.length-13);
    } else {
      uri = uri;
    }

    var annotations = [];
    var friendsShown = {};

    $.get('https://test2server.herokuapp.com/api/users/uri/annotations', {uri: uri, user_id: ownId})
      .done(function(data) { 
        var oldAnnotations = self.props.annotations;
        if(oldAnnotations) {
          for (var i = 0; i < oldAnnotations.length; i++) {
            friendsShown[oldAnnotations[i].user_id] = { shown: true };
          }
          annotations = oldAnnotations;
        }
        for (var i = 0; i < data.length; i++) {
          if (friendsShown[data[i].id]) {
            friendsShown[data[i].id] = {shown: true, pic: data[i].pic_url, name: data[i].full_name};
          } else {
            friendsShown[data[i].id] = {shown: false, pic: data[i].pic_url, name: data[i].full_name};
          }
        }
        if (!friendsShown[ownId]) {
          friendsShown[ownId] = {shown: false};
        }
        self.setState({annotations: annotations, friendsShown: friendsShown});
      }) 

  }
});

module.exports = FriendsAnnotationsView;
