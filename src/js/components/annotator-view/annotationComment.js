var React = require('react');

var annotationComment = React.createClass({

  goToHighlight: function() {
    $('html, body').animate({
      scrollTop: this.props.annotation.offsetTop - 200
    }, 300)
  },

  render: function() {
    var annotation = this.props.annotation;
    var self = this;
    var deleteAnn = function() {
      self.props.deleteAnn(annotation);
    }

    return (
      <div>
        <p onClick={this.goToHighlight}>{annotation.quote}</p>
        <p>{annotation.text}</p>
        <button onClick={deleteAnn}>Remove</button>
        <button>Edit</button>
      </div>
    )
  }
});


module.exports = annotationComment;