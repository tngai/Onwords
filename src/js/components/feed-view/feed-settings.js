var React = require('react');

var Settings = React.createClass({
  getInitialState: function(){
    var Description = "Description" || this.state.Description 
    return {
      editDescription: false,
      Description:"Description"
      profInfo: {}
    }
  },
  
  render: function() {
    return (
      <div className='settings-view-container'>
        <div className='username-settings'>
          {Username}
        </div>
        <div className='picture-settings'>
          Picture
        </div>
        <div className='description-settings'>
          Description
        </div>
      </div>
    );
  }
});

module.exports = Settings;
