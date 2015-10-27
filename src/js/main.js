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
  console.log("inside tokenlistener (main.js line 14)", changes);
  if (changes.access_token.newValue) {
    renderComponents();
    test.annotate();
  }
  chrome.storage.onChanged.removeListener(tokenListener);
}

chrome.storage.sync.get('access_token', function(obj) {
  console.log('main.js > chrome storage get token (line 23)');
  if (obj['access_token']) {
    console.log('main.js > chrome storage get token > if ( access token ) (line 25)');
    renderComponents();
    console.log('main.js > chrome.storage.sync.get > if ( access token ) (line 27)');
    test.annotate();
  } else {
    console.log('main.js > chrome.storage.sync.get > else (line 30)');
    chrome.storage.onChanged.addListener(tokenListener);
  }
})

var identityListener = function(changes) {
  console.log("inside identitylistener (main.js line 36)", changes);
  if (changes.facebook_id.newValue) {
    renderComponents();
    test.annotate();
  }
  chrome.storage.onChanged.removeListener(identityListener);
}

chrome.storage.sync.get('facebook_id', function(obj) {
  console.log('main.js > chrome.storage get fb id (line 45)');
  if (obj['access_token']) {
    console.log('main.js > chrome storage get fb id > if ( access token ) (line 47)');
    renderComponents();
    console.log('main.js > chrome storage get fb id > if ( access token ) (line 49)');
    test.annotate();
  } else {
    console.log('main.js > chrome storage get fb id > else (line 52)');
    chrome.storage.onChanged.addListener(identityListener);
  }
})
