var React = require('react');
var MinimizeButton = require('./minimize-button');
var Header = require('../header/header');
var AnnotatorMixin = require('../mixins/annotatormixin');
var SettingsButton = require('./settings-button');
var ReturnButton = require('./return-button');
var Settings = require('./feed-settings');
var MyAnnotations = require('./feed-my-annotations');
var FriendsAnnotations = require('./feed-friends-annotations');

var FeedView = React.createClass({
  getInitialState: function() {
    return {
      showSettingsPage: false,
      showFriendsAnnotations: true, 
      showMyAnnotations: false,
      showSettingsButton: true,
      showMinimizeButton: true,
      ShowReturnButton: false
    };
  },
  componentWillMount: function() {
    console.log('FeedView mounted');
    var THIS = this;
    $(document).on('click', 'body', function(e) {
        if($(e.target).attr('data-reactid')){
            e.preventDefault();
            return;
        }
        THIS.props.updateView('showAnnotatorButton');
    });
  },
  componentWillUnmount: function() {
    console.log('FeedView componentWillUnmount');
    $(document).off();
  },
  updateBodyView: function(action){
    switch(action) {
      case 'showSettingsPage':
        console.log('showSettingsPage');
        this.setState({showSettingsPage: true});
        this.setState({showFriendsAnnotations: false});
        this.setState({showMyAnnotations: false});
        this.setState({showSettingsButton: false});
        this.setState({showMinimizeButton: false});
        this.setState({ShowReturnButton: true});
        break;
      case 'showFriendsAnnotations':
        console.log('showFriendsAnnotations');
        this.setState({showSettingsPage: true});
        this.setState({showFriendsAnnotations: false});
        this.setState({showMyAnnotations: false});
        this.setState({showSettingsButton: false});
        this.setState({showMinimizeButton: false});
        this.setState({ShowReturnButton: true});
        break;
      case 'showMyAnnotations':
        console.log('showMyAnnotations');
        this.setState({showSettingsPage: true});
        this.setState({showFriendsAnnotations: false});
        this.setState({showMyAnnotations: false});
        this.setState({showSettingsButton: false});
        this.setState({showMinimizeButton: false});
        this.setState({ShowReturnButton: true});
        break;
      default:
        console.log('nothing happened');
    }
  },
  render: function() {
    return (
      <div className='feed-view-container'>
        <div className='header-container'>
          {this.state.showMinimizeButton ? <MinimizeButton {...this.props} /> : null}
          {this.state.ShowReturnButton ? <ReturnButton {...this.props} updateBodyView={this.updateBodyView} /> : null}
          <div>Onwords</div>
          {this.state.showSettingsButton ? <SettingsButton {...this.props} updateBodyView={this.updateBodyView} /> : null}
        </div>

        <div className='body-container'>
          {this.state.showSettingsPage ? <Settings {...this.props}  updateBodyView={this.updateBodyView} /> : null}
          {this.state.showMyAnnotations ? <MyAnnotations {...this.props} updateBodyView={this.updateBodyView} /> : null}
          {this.state.showFriendsAnnotations ? <FriendsAnnotations {...this.props} updateBodyView={this.updateBodyView} /> : null}
        </div>

      </div>
    );
  }
});

module.exports = FeedView;
