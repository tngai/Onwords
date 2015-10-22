var App = require('./components/app');
var React = require('react');
var test = require('./test');

//////////////////////////////////////////

console.log('inside main')
var renderComponents = function() {
  $('body').append("<div class='annotation-sidebar'></div>");
  $('.annotation-sidebar').append("<div id=scrollview></div>");

  function sidebar(open) {
    var width = $('.annotation-sidebar').width();
    var duration = 200;
    if (open) {
      $('.annotation-sidebar').animate({right: 0}, duration);
    } else {
      $('.annotation-sidebar').animate({right: -(width-20)}, duration);
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
    renderComponents();
    test.annotate();
  }
})

chrome.storage.sync.get('access_token', function(obj) {
  if (obj['access_token']) {
    renderComponents();
    test.annotate();
  }
})


//////////////////////////////////////////

// React.render(<App />, document.getElementById('scrollview'));
