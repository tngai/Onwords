var App = require('./components/app');
var React = require('react');

console.log('inside main')
var renderComponents = function() {
  $('body').append("<div class='annotation-sidebar'></div>");
  $('.annotation-sidebar').append("<div id=scrollview></div>");

  function sidebar(open) {
    var position = $('.annotation-sidebar').position();
    var duration = 200;
    var PL = position.left;
    var PR = position.right;
    console.log('Current position: ', position, PL, PR);

    if (open) {
      $('.annotation-sidebar').animate({right: -300}, duration);
    } else {
      $('.annotation-sidebar').animate({right: -580}, duration);
    }
  }

  var open = false;
  $('body').on('click', '.annotator-hl', function() {
    open = !open;
    sidebar(open);
  })
  
  React.render(<App />, document.getElementById('scrollview'));
}

chrome.storage.onChanged.addListener(function(changes) {
  console.log("inside addlistener", changes);
  if (changes.access_token.newValue) {
    console.log(changes.access_token.newValue);
  }
  renderComponents();
})

chrome.storage.sync.get('access_token', function(obj) {
  if (obj['access_token']) {
    renderComponents();
  }
})
