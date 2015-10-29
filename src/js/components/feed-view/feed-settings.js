var React = require('react');

var Settings = React.createClass({
  getInitialState: function(){
    return {
      description: "Onwords!",
      editPicUrl:false
    }
  },
  componentWillMount: function(){
    chrome.storage.sync.get('user',function(data){
      console.log('*** here is the data ', data)
      this.setState({
        pic_url: data.user.picUrl,
        username: data.user.fullName
      });  
      
    }.bind(this));
  },
  editToggle: function(settingIndex){
    switch(settingIndex)
      case 1:
        this.setState(editPicUrl:true)
  },
  render: function() {

    return (
      <div className='settings-view-container'>
        <div className='picture-settings'>
          Picture <img id="" src={this.state.pic_url} /> <img className="settings-profile-edit-icon" src="http://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/edit-icon.png" onclick="editToggle(1)" /> {this.state.editPicUrl ? <input type="text" placeholder={this.state.pic_url}> : null}

        </div>
        <div className='username-settings'>
          Username: {this.state.username} <img className="settings-profile-edit-icon" src="http://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/edit-icon.png" onclick="editToggle(2)"/>
        </div>
        <div className='description-settings'>
          Description: {this.state.description} <img className="settings-profile-edit-icon" src="http://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/edit-icon.png" onclick="editToggle(3)"/>
        </div>
      </div>
    );
  }
});

module.exports = Settings;
