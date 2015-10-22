var React = require('react');

var MinimizeButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showAnnotatorView');
  }, 
  render: function() {
    return (
      <div onClick={this.handleClick}>
        <img className='minimize-button' src='http://res.freestockphotos.biz/pictures/3/3551-illustration-of-a-black-right-arrow-pv.png' />
      </div>
    );
  }
});

module.exports = MinimizeButton;