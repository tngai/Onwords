var React = require('react');
var AnnotatorView = require('./annotator-view/annotator-view');
var FeedView = require('./feed-view/feed-view');
var AnnotatorButton = require('./annotator-view/annotator-button');

var App = React.createClass({
  getInitialState: function() {
    return {
      showAnnotatorButton: true,
      showAnnotatorView: false,
      showFeedView: false
    };
  },

  componentWillMount: function() {

  },

  componentDidMount: function() {
    console.log('It MOUNTED!');
    $('.annotation-sidebar').click(function() {
      console.log('it worked bro!!!!');
    });
  },

  updateView: function(action){
    var duration = 200;

    switch(action) {
        case 'showAnnotatorButton':
            console.log('showAnnotatorButton!!');
            $('.annotation-sidebar').animate({right: -(580)}, duration);
            this.setState({showAnnotatorButton: true});
            this.setState({showAnnotatorView: false});
            this.setState({showFeedView: false});
            break;
        case 'showAnnotatorView':
            $('.annotation-sidebar').animate({right: -(300)}, duration);
            this.setState({showAnnotatorButton: false});
            this.setState({showAnnotatorView: true});
            this.setState({showFeedView: false});
            break;
        case 'showFeedView':
            $('.annotation-sidebar').animate({right: (0)}, duration);
            this.setState({showAnnotatorButton: false});
            this.setState({showAnnotatorView: false});
            this.setState({showFeedView: true});
            break;
        default:
            console.log('nothing happened')
    }
  },

  render: function() {
    return (
      <div className='app-container'>      
        {this.state.showAnnotatorButton ? <AnnotatorButton updateView={this.updateView} /> : null}
        {this.state.showAnnotatorView ? <AnnotatorView updateView={this.updateView} /> : null}
        {this.state.showFeedView ? <FeedView updateView={this.updateView} /> : null}     
      </div>
    );
  }
});

module.exports = App;
