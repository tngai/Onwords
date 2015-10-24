var React = require('react');

var annotationList = React.createClass({
  deleteAnn: function(annotation) {
    var ev = new CustomEvent('deleteAnnotation', {detail: {
      targetAnnotation: annotation
    }});
    document.dispatchEvent(ev);
  },

  render: function() {
    var self = this;
    console.log('inside annotationList', this.props.annotations)

    var annotations = this.props.annotations.map(function(annotation, index) {
      
      return <li className="annotation" key={index}>
        <p>{annotation.quote}</p>
        <p>{annotation.text}</p>
        <button data-id={annotation} onClick={self.deleteAnn.bind(null, annotation)}>Remove</button> 
      </li>
    });

    return (
      <ul className="annotationList">
        {annotations}
      </ul>
    )
  }
})

module.exports = annotationList;

       