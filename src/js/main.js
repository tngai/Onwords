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
  console.log(changes);
  if (changes.user_id && changes.user_id.newValue) {
    renderComponents();
    test.annotate();
    chrome.storage.onChanged.removeListener(identityListener);
  }
};

chrome.storage.sync.get('user_id', function(obj) {
  if (obj['user_id']) {
    console.log('user_id in main.js get:', obj['user']);
    renderComponents();
    test.annotate();
  } else {
    chrome.storage.onChanged.addListener(identityListener);
  }
});
