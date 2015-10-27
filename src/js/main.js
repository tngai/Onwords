var App = require('./components/app');
var React = require('react');
var test = require('./test');

console.log('inside main')
var renderComponents = function() {
  $('body').append("<div class='annotation-sidebar'></div>");
  $('.annotation-sidebar').append("<div id=scrollview></div>");

  React.render(<App />, document.getElementById('scrollview'));
}

var tokenListener = function(changes) {
  if (changes.access_token && changes.access_token.newValue) {
    renderComponents();
    test.annotate();
  }
  chrome.storage.onChanged.removeListener(tokenListener);
}

chrome.storage.sync.get('access_token', function(obj) {
  if (obj['access_token']) {
    renderComponents();
    test.annotate();
  } else {
    chrome.storage.onChanged.addListener(tokenListener);
  }
})

var identityListener = function(changes) {
  if (changes.facebook_id && changes.facebook_id.newValue) {
    renderComponents();
    test.annotate();
  }
  chrome.storage.onChanged.removeListener(identityListener);
}

chrome.storage.sync.get('facebook_id', function(obj) {
  if (obj['access_token']) {
    renderComponents();
    test.annotate();
  } else {
    chrome.storage.onChanged.addListener(identityListener);
  }
})
