var App = require('./components/app');
var React = require('react');
var test = require('./test');

console.log('inside main');
var renderComponents = function() {
  $('body').append("<div class='annotation-sidebar'></div>");
  $('.annotation-sidebar').append("<div id=scrollview></div>");

  React.render(<App />, document.getElementById('scrollview'));
};

var identityListener = function(changes) {
  if (changes.user && changes.user.newValue) {
    renderComponents();
    test.annotate();
    chrome.storage.onChanged.removeListener(identityListener);
  }
};

chrome.storage.sync.get('user', function(obj) {
  if (obj['user']) {
    renderComponents();
    test.annotate();
  } else {
    chrome.storage.onChanged.addListener(identityListener);
  }
});

