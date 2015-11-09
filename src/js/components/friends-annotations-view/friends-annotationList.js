var React = require('react');
var ReactAddons = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var AnnotationComment = require('../annotator-view/annotationComment');
var FriendAnnotationComment = require('./friends-annotationComment');


var friendsAnnotationList = React.createClass({
  getInitialState: function() {
    return {
      annotations: [],
      spotlight: '',
      spotlightOn: false,
      mounted: false,
      userInfo: {}
    }
  },

  deleteAnn: function(annotation) {
    var ev = new CustomEvent('deleteAnnotation', {detail: {
      targetAnnotation: annotation
    }});
    document.dispatchEvent(ev);
  },

  unhighlight: function() {
    var oldSpotlight = this.state.spotlight.id;
    var oldSpotlightColorWithUmph = $('span[data-annotation-id="' + oldSpotlight + '"]').css('background-color'); 
    if (oldSpotlightColorWithUmph) {
      var oldSpotlightColor = oldSpotlightColorWithUmph.slice(0, oldSpotlightColorWithUmph.length - 1) + ', 0.25)';
      var defaultColor = $('body').css('color');
      oldSpotlightColor = oldSpotlightColor.slice(0, oldSpotlightColor.indexOf('(')) + 'a' + oldSpotlightColor.slice(oldSpotlightColor.indexOf('('));
      var styles = {
        backgroundColor: oldSpotlightColor,
        color: defaultColor
      }
      $('span[data-annotation-id="' + oldSpotlight + '"]').css(styles);  
    }
  },

  highlight: function(annotation) {
    $('html, body').animate({
      scrollTop: annotation.offsetTop - 200
    }, 350);

    var newSpotlightColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color'); 

    var newSpotlightColorWithUmph = newSpotlightColor.slice(0, newSpotlightColor.lastIndexOf(',') + 1) + ' 1)';
    var styles = {
      backgroundColor: newSpotlightColorWithUmph,
      color: "black"
    }
    $('span[data-annotation-id="' + annotation.id + '"]').css(styles);  
  },

  clickHandler: function(annotation) {
    this.props.changeSpotlight(annotation);
    
  },

  componentWillMount: function() {
    var newSpotlight = '';
    if (this.props.spotlight !== '') {
      newSpotlight = this.props.spotlight;
      this.highlight(newSpotlight);
    };
    this.setState({annotations: this.props.annotations, spotlight: newSpotlight});
  },

  componentWillReceiveProps: function(nextProps) {

    if (nextProps.spotlight !== this.state.spotlight) {
      if (this.state.spotlight !== '') {
        this.unhighlight();
      }
      if (nextProps.spotlight !== '') {
        this.highlight(nextProps.spotlight);
      }

    }
    this.setState({annotations: nextProps.annotations, spotlight: nextProps.spotlight});
  },

  componentWillUnmount: function() {
    if (this.state.spotlight !== '') {
      this.unhighlight();
      this.props.changeSpotlight('');
    }
  },

  componentDidMount: function () {
    chrome.storage.sync.get('user',function(data){
      var info = {
        pic_url: data.user.picUrl,
        username: data.user.fullName,
        description: data.user.description || 'OnWords  !!  '
      }
      this.setState({userInfo: info});  
    }.bind(this));
  },

  render: function() {
    var ownId = window.localStorage.getItem('user_id');
    var friends = this.props.friends;
    var annotations = this.state.annotations;
    var self = this;


    var annotationList = annotations.map(function(annotation, index) {
      var user = annotation.user_id;
        if (friends[user]) {
          console.log('friend is', friends[user]);
          return (
            <div key={index}>
              <li className="annotationListItem">
                {user.toString() === ownId ? 
                  <AnnotationComment userInfo={self.state.userInfo} clickHandler={self.clickHandler} user={annotation.user_id} annotation={annotation} deleteAnn={self.deleteAnn} />
                : <FriendAnnotationComment username={friends[user].name} userpic={friends[user].pic} spotlight={self.state.spotlight} clickHandler={self.clickHandler} user={annotation.user} annotation={annotation}/>
                }
              </li>
              <br></br>
            </div>
          )
        }
    });


    return (
        <ReactCSSTransitionGroup transitionName='annotationList' transitionAppear={true} transitionAppearTimeout={100}>
          <div className="annotationList">
            {annotationList}
          </div>
        </ReactCSSTransitionGroup>
    )
  }
});

module.exports = friendsAnnotationList;
