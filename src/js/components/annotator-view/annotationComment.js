var React = require('react');

var annotationComment = React.createClass({
  getInitialState: function() {
    return {
      shouldEditComment: false
    }
  },

  goToHighlight: function() {
    $('html, body').animate({
      scrollTop: this.props.annotation.offsetTop - 200
    }, 300)
  },

  editComment: function() {
    this.setState({shouldEditComment: true});
  },

  submitChange: function(e) {
    e.preventDefault();
    var newText = $('textArea#annotationEdit').val();
    console.log('new text:', newText)
    this.props.annotation.text = newText;
    var ev = new CustomEvent('updateAnnotation', {detail: {targetAnnotation: this.props.annotation}})
    document.dispatchEvent(ev);
    this.setState({shouldEditComment: false});
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
        {!this.state.shouldEditComment ? <p>{annotation.text}</p> : 
          <form>
            <textArea id="annotationEdit" style={{height: 100+"px", width: 300+"px"}}>
              {annotation.text}
            </textArea>
            <button onClick={this.submitChange}>Submit</button>
          </form>
          }
        <button onClick={deleteAnn}>Remove</button>
        <button onClick={this.editComment}>Edit</button>
      </div>
    )
  }
});


module.exports = annotationComment;