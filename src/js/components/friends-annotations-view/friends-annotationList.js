var React = require('react');
var AnnotationComment = require('../annotator-view/annotationComment');
var FriendAnnotationComment = require('./friends-annotationComment');


var friendsAnnotationList = React.createClass({
  deleteAnn: function(annotation) {
    var ev = new CustomEvent('deleteAnnotation', {detail: {
      targetAnnotation: annotation
    }});
    document.dispatchEvent(ev);
  },

  render: function() {
    var ownId = window.localStorage.getItem('user_id');
    var friends = this.props.friends;
    var self = this;

    var annotationList = this.props.annotation.map(function(annotation, index) {
      var user = annotation.user;
      if (friends[user].shown) {
        return (
          <li className="annotation">
            {annotations[i].user === ownId ? 
              <AnnotationComment user={annotation[i].user} annotation={annotation} deleteAnn={self.deleteAnn} />
            : <FriendAnnotationComment user={annotation[i].user} annotation={annotation}/>
            }
          </li>
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