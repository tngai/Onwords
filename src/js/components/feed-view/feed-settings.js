var React = require('react');

var Settings = React.createClass({
  
  render: function() {
    return (
      <div className='settings-view-container'>
        <div className='username-settings'>
          Username
        </div>
        <div className='picture-settings'>
          Picture
        </div>
        <div className='description-settings'>
        </div>
      </div>
    );
  }
});

module.exports = Settings;
