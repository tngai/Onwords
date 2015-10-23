var App = require('./components/app');
var React = require('react');
var test = require('./test');

console.log('inside main')
var renderComponents = function() {
  $('body').append("<div class='annotation-sidebar'></div>");
  $('.annotation-sidebar').append("<div id=scrollview></div>");

  React.render(<App />, document.getElementById('scrollview'));
}


// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.annotations) {
//       console.log('got the message', request.annotations)
//     }
//   })

var tokenListener = function(changes) {
  debugger;
  console.log("inside addlistener", changes);
  if (changes.access_token.newValue) {
    renderComponents();
    test.annotate();
  }
  debugger;
  chrome.storage.onChanged.removeListener(tokenListener);
}
debugger;
chrome.storage.sync.get('access_token', function(obj) {
  debugger;
  if (obj['access_token']) {
    renderComponents();
    test.annotate();
  } else {
    chrome.storage.onChanged.addListener(tokenListener);
  }
})
