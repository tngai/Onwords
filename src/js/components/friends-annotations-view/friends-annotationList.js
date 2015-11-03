var React = require('react');
var AnnotationComment = require('../annotator-view/annotationComment');
var FriendAnnotationComment = require('./friends-annotationComment');


var friendsAnnotationList = React.createClass({
  getInitialState: function() {
    return {
      spotlight: '',
      spotlightOn: false
    }
  },

  deleteAnn: function(annotation) {
    var ev = new CustomEvent('deleteAnnotation', {detail: {
      targetAnnotation: annotation
    }});
    document.dispatchEvent(ev);
  },

  unhighlight: function() {
    debugger;
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
    debugger;
    var newSpotlightColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color'); 

    var newSpotlightColorWithUmph = newSpotlightColor.slice(0, newSpotlightColor.lastIndexOf(',') + 1) + ' 1)';
    var styles = {
      backgroundColor: newSpotlightColorWithUmph,
      color: "black"
    }
    $('span[data-annotation-id="' + annotation.id + '"]').css(styles);  
    this.setState({spotlight: annotation});
  },

  clickHandler: function(annotation) {
    debugger;
    $('html, body').animate({
      scrollTop: annotation.offsetTop - 200
    }, 300);

    if (this.state.spotlight !== '' && this.state.spotlight.id !== annotation.id) {
      this.unhighlight();
    }

    if (this.state.spotlight.id === annotation.id) {
      if (!this.state.spotlightOn) {
        this.highlight(annotation);
        this.setState({spotlightOn: true});
      } 
    } else {
      this.highlight(annotation);
    }
  },

  componentWillMount: function() {
    debugger;
    if (this.props.spotlight !== '') {
      this.setState({spotlight: this.props.spotlight});
    }
  },

  componentDidMount: function() {
    debugger;
    if (this.state.spotlight !== '') {
      this.clickHandler(this.state.spotlight);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    debugger;
    this.clickHandler(nextProps.spotlight);
  },

  componentWillUnmount: function() {
    if (this.state.spotlight !== '') {
      this.unhighlight();
    }
  },

  render: function() {
    console.log('hellloooooo, friendsAnnotationList:', this.props.friends);
    debugger;
    var ownId = window.localStorage.getItem('user_id');
    var friends = this.props.friends;
    var annotations = this.props.annotations;
    var self = this;

    var annotationList = annotations.map(function(annotation, index) {
      var user = annotation.user_id;
      console.log('INSIDE FRIEND ANNOTATION LIST: ', annotation.user_id);
        if (friends[user]) {
          return (
            <div>
              <li>
                {user.toString() === ownId ? 
                  <AnnotationComment clickHandler={self.clickHandler} user={annotation.user_id} annotation={annotation} deleteAnn={self.deleteAnn} />
                : <FriendAnnotationComment spotlight={self.state.spotlight} clickHandler={self.clickHandler} user={annotation.user} annotation={annotation}/>
                }
              </li>
              <br></br>
            </div>
          )
        }
    });

    return (
      <ul className="annotationList">
        {annotationList}
      </ul>
    )
  }
});

module.exports = friendsAnnotationList;
