var React = require('react');
var AnnotationComment = require('../annotator-view/annotationComment');
var FriendAnnotationComment = require('./friends-annotationComment');


var friendsAnnotationList = React.createClass({
  getInitialState: function() {
    return {
      spotlight: ''
    }
  },

  deleteAnn: function(annotation) {
    var ev = new CustomEvent('deleteAnnotation', {detail: {
      targetAnnotation: annotation
    }});
    document.dispatchEvent(ev);
  },

  unhighlight: function() {
    var oldSpotlight = this.state.spotlight;
    var oldSpotlightColorWithUmph = $('span[data-annotation-id="' + oldSpotlight + '"]').css('background-color'); 
    var oldSpotlightColor = oldSpotlightColorWithUmph.slice(0, oldSpotlightColorWithUmph.length - 1) + ', 0.5)';
    oldSpotlightColor = oldSpotlightColor.slice(0, oldSpotlightColor.indexOf('(')) + 'a' + oldSpotlightColor.slice(oldSpotlightColor.indexOf('('));
    $('span[data-annotation-id="' + oldSpotlight + '"]').css('background-color', oldSpotlightColor);  
  },

  clickHandler: function(annotation) {
    $('html, body').animate({
      scrollTop: annotation.offsetTop - 200
    }, 300);

    if (this.state.spotlight !== annotation.id) {
      if (this.state.spotlight !== '') {
        this.unhighlight();
      }

      var newSpotlightColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color'); 
      var newSpotlightColorWithUmph = newSpotlightColor.slice(0, newSpotlightColor.lastIndexOf(',') + 1) + ' 1)';
      $('span[data-annotation-id="' + annotation.id + '"]').css('background-color', newSpotlightColorWithUmph);  
      this.setState({spotlight: annotation.id});
    }
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
