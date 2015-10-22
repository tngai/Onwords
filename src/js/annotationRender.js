var React = require('React');
var AnnotationList = require('./components/annotator-view/annotationList');

var renderAnnotations = function() {
  return {
    annotationsLoaded: function(ann) {
      debugger;
      console.log('annotation loaded', ann)
      React.render(<AnnotationList annotations={ann}/>, document.getElementById('annotator-body-container'));
    }
  }
}

module.exports = renderAnnotations;