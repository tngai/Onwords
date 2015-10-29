var React = require('react');

var Settings = React.createClass({
  getInitialState: function(){
    return {
      pic_url: 'https://scontent.xx.fbcdn.net/hprofile-xaf1/v/t1.0-1/c0.2.513.513/s50x50/393351_10150551323017788_1633889618_n.jpg?oh=f79bffa4fb43d421dabd131fdf587068&oe=56879D58',
      description: 'Just In Time',
      username: 'Justin Hong'
    }
  },
  componentWillMount: function(){
    chrome.storage.sync.get('user_id',function(data){
      var pic_url = data.pic_url || 'https://scontent.xx.fbcdn.net/hprofile-xaf1/v/t1.0-1/c0.2.513.513/s50x50/393351_10150551323017788_1633889618_n.jpg?oh=f79bffa4fb43d421dabd131fdf587068&oe=56879D58'
      var description = data.description || 'Just In Time'
      var username = data.username || 'Justin Hong'

      console.log('this is the user id', data);
      this.setState({
        pic_url: pic_url,
        description: description,
        username: username
      });  
      
    }.bind(this));
      });
  },
  render: function() {
    return (
      <div className='settings-view-container'>
        <div className='username-settings'>
          Username: {this.state.username}
        </div>
        <div className='picture-settings'>
          Picture <img src={this.state.pic_url} />
        </div>
        <div className='description-settings'>
          Description: {this.state.description}
        </div>
      </div>
    );
  }
});

module.exports = Settings;
