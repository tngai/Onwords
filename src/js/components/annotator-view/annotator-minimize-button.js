var React = require('react');

var AnnotatorMinimizeButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showAnnotatorButton');
  },
  render: function() {
    return (
      <div onClick={this.handleClick}>
        <img className='annotator-minimize-button' src='http://res.freestockphotos.biz/pictures/3/3551-illustration-of-a-black-right-arrow-pv.png' />
      </div>
    );
  }
});

module.exports = AnnotatorMinimizeButton;