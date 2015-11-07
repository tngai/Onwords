var React = require('react');

var annotationComment = React.createClass({
  getInitialState: function() {
    return {
      shouldEditComment: false
    }
  },

  editComment: function() {
    this.setState({shouldEditComment: true});
  },

  submitChange: function(e) {
    e.preventDefault();
    var newText = $('textArea#annotationEdit').val();
    console.log('new text:', newText)
    var annotation = this.props.annotation;
    annotation.text = newText;
    var ev = new CustomEvent('updateAnnotation', {detail: {targetAnnotation: annotation}})
    document.dispatchEvent(ev);
    this.setState({shouldEditComment: false});
  },


  render: function() {
    var userInfo = this.props.userInfo;
    var userColor = $('span[data-annotation-id="' + this.props.annotation.id + '"]').css('background-color'); 
    var divStyle = {
      borderLeft: '4px solid ' + userColor
    }

    console.log('inside annotationcomment:', this.props.annotation);
    var annotation = this.props.annotation;
    var self = this;

    var clickHandler = function(e) {
      if (e.target.className !== 'comment-delete-button') {
        self.props.clickHandler(annotation);
      }
    };

    var deleteAnn = function(e) {
      debugger;
      console.log(e.target);
      e.stopPropagation();
      self.props.deleteAnn(annotation);
    }

    return (
      <div onClick={clickHandler} className="annotation" style={divStyle}>
        <img className='annotation-friends-pic' src={userInfo.pic_url} />
        <p className='username'> Me </p>
        {!this.state.shouldEditComment ? <p className='annotation-text'>{annotation.text}</p> : 
          <form>
            <textArea id="annotationEdit" style={{height: 100+"px", width: 300+"px"}}>
              {annotation.text}
            </textArea>
            <button className='comment-submit-button' onClick={this.submitChange}>Submit</button>
          </form>
        }
        <div className='modify-comment-container'>
          <button className='comment-delete-button' onClick={deleteAnn}>Remove</button>
          <button className='comment-edit-button' onClick={this.editComment}>Edit</button>
        </div>
      </div>
    )
  }
});


module.exports = annotationComment;