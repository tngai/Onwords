var React = require('react');

var friendAnnotationComment = React.createClass({
  goToHighlight: function() {
    $('html, body').animate({
      scrollTop: this.props.annotation.offsetTop - 200
    }, 300)
  },

  render: function() {
    debugger;
    var userColor = $('span[data-annotation-id="' + this.props.annotation.id + '"]').css('background-color'); 
    var divStyle = {
      borderLeft: '4px solid ' + userColor
    }
    var annotation = this.props.annotation;
    return (
      <div style={divStyle}>
        <p onClick={this.goToHighlight}>{annotation.quote}</p>
        <p>{annotation.text}</p>
      </div>
    )
  }
})

module.exports = friendAnnotationComment;