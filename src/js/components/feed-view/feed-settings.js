var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Settings = React.createClass({
  getInitialState: function(){
    return {
      editPicUrl: false,
      editUsername: false,
      editDescription: false
    }
  },
  componentWillMount: function(){
    chrome.storage.sync.get('user',function(data){
      console.log('chrome storage data ', data, data.user);
      this.setState({
        pic_url: data.user.picUrl,
        username: data.user.fullName,
        description: data.user.description || 'onWords',
        userObj: data.user   
      });  
      
    }.bind(this));
  },
  updateStorage: function( property, value) { 
    console.log('here is the userObj ', user, this.state.userObj)
    var user = this.state.userObj; 
        user[property] = value;
    console.log('here is the pulled user obj after changes',user.description,user); 
    chrome.storage.sync.set({'user': user}, function(){
      $.ajax({
        method: "POST",
        url: "http://localhost:9000/api/users/update",
        data: { picUrl: user.picUrl, description: user.description, user_id: user.id }
      }) 
    });
  },
  handleSubmit: function(e) {
    if(e.charCode == 13) { 
      console.log('this is what is entered ',e.target.value)
      switch (e.target.dataset.setting) {
        case 'picUrl':
          this.setState({
            pic_url: e.target.value,
            editPicUrl: false
          });
          this.updateStorage('picUrl', e.target.value);
          break;
        case 'username':
          this.setState({
            username: e.target.value,
            editUsername: false
          });
          this.updateStorage('fullName', e.target.value);
          break;
        case 'description':
          this.setState({
             description: e.target.value,
             editDescription: false
           });
          console.log('is it changed in here ?? ', this.state.description)
          this.updateStorage('description', e.target.value);
          break;
      }
    }
  },
  handleClick: function(e) {  
    var inputToggle;
    console.log( 'the click event ', e, e.target.dataset.setting)
    switch (e.target.dataset.setting) {
      case 'pic':
        inputToggle = this.state.editPicUrl;
        console.log('pic was chosen', inputToggle);
        this.setState({editPicUrl: !inputToggle});
        break;
      case 'username':
        inputToggle = this.state.editUsername;
        console.log('username was chosen', inputToggle);
        this.setState({editUsername: !inputToggle});
        break;
      case 'description':
        inputToggle = this.state.editDescription;
        console.log('description was chosen', inputToggle);
        this.setState({editDescription: !inputToggle});
        break;
    }  
  },
  render: function() {
    return (
        <div className="settings-view-container">
          <div className="picture-settings">
          <img id="profile-pic" src={this.state.pic_url} onClick={this.handleClick} data-setting="pic"/> 
          <ReactCSSTransitionGroup transitionName="example">
            {this.state.editPicUrl ? <input type="text" className="inputBox" placeholder={this.state.pic_url} data-setting="picUrl" onKeyPress={this.handleSubmit} /> : null}
          </ReactCSSTransitionGroup> 
        </div> 
        <div className="username-settings">
          {this.state.username} 
        </div>
        <div className="settingsdescription-settings">
          Description: {this.state.description} 
          <ReactCSSTransitionGroup transitionName="example">
          <button  type="submit" onClick={this.handleClick} id="submit-button" >
            <img data-setting="description" className="settings-profile-edit-icon" src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/edit-icon.png" />
          </button> 
            {this.state.editDescription ? <input type="text" className="inputBox" placeholder={this.state.description} data-setting="description" onKeyPress={this.handleSubmit} /> : null}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
});

module.exports = Settings;
