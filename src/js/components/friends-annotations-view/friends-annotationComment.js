var React = require('react');

var friendAnnotationComment = React.createClass({


  render: function() {

    var annotation = this.props.annotation;
    var self = this;
    var clickHandler = function() {
      self.props.clickHandler(annotation);
    };
  
    var userColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color'); 

    // var marginRight = this.props.spotlight === annotation.id ? '20px' : '0px';

    var divStyle = {
      borderLeft: '4px solid ' + userColor,
      // marginRight: marginRight
    }

    return (
      <div onClick={clickHandler} className="annotation" style={divStyle}>
        <p>{annotation.quote}</p>
        <p>{annotation.text}</p>
      </div>
    )
  }
})

module.exports = friendAnnotationComment;