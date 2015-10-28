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
          Username
        </div>
        <div className='picture-settings'>
          Picture
        </div>
        <div className='description-settings'>
          { this.state.editDescription ? description : <input id="settings_description"  type ="text" placeholder="Description" onsubmit="descriptionChange()" />}
        </div>
      </div>
    );
  }
});

module.exports = Settings;
