var React = require('react');

var annotationList = React.createClass({

  render: function() {
    console.log('hi', this.props.annotations)
    var annotations = this.props.annotations.map(function(annotation, index) {
      return <li className="annotation" key={index}>
        <p>{annotation.quote}</p>
        <p>{annotation.text}</p>
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