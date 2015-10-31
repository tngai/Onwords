var App = require('./components/app');
var React = require('react');
var test = require('./test');

console.log('inside main');
var renderComponents = function() {
  $('body').append("<div class='annotation-sidebar'></div>");
  $('.annotation-sidebar').append("<div id=scrollview></div>");

  React.render(<App />, document.getElementById('scrollview'));
};

var code = window.location.hash.substring(1);
var userId;

if (code.substring(code.length - 11)) {
  userId = code.substring(0, code.length - 11);
} else {
  chrome.storage.sync.get('user', function(obj) {
    if (!obj['user']) {
      console.error('Unable to access user_id from chrome.storage');
      return;
    }
    userId = obj.user.id; 
    window.localStorage.setItem('user_id', obj.user.id);
  })
}


var identityListener = function(changes) {
  if (changes.user && changes.user.newValue) {
    renderComponents();
    test.annotate(userId);
    chrome.storage.onChanged.removeListener(identityListener);
  }
};

chrome.storage.sync.get('user', function(obj) {
  if (obj['user']) {
    renderComponents();
    test.annotate(userId);
  } else {
    chrome.storage.onChanged.addListener(identityListener);
  }
});

