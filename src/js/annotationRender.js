var React = require('React');

var renderAnnotations = function() {
  return {
    annotationsLoaded: function(ann) {
      console.log(ann[0])
      // React.render(<App />, document.getElementById('scrollview'));
      $('#scrollview').append("<div>"+ ann[0] + "</div>")
    }
  }
}

module.exports = renderAnnotations;