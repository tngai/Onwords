var App = require('./components/app');
var React = require('react');
var test = require('./test');

var renderComponents = function() {
  var element = "<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300' rel='stylesheet' type='text/css'>";
  var element2 = "<link href='https://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>";
  var element3 = "<link href='https://fonts.googleapis.com/css?family=Libre+Baskerville' rel='stylesheet' type='text/css'>";
  var element4 = "<link href='https://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' type='text/css'>";
  $('head').after(element);
  $('head').after(element2);
  $('head').after(element3);
  $('head').after(element4);

  $('body').append("<div id='annotation-sidebar'></div>");
  $('#annotation-sidebar').append("<div id='annotation-header'></div>")
  $('#annotation-sidebar').append("<div id='annotation-scroll'></div>")
  React.render(<App />, document.getElementById('annotation-scroll'));
};

var code = window.location.hash.substring(1);
var userId;

if (code.substring(code.length - 11)) {
  userId = code.substring(0, code.length - 11);
} 

var identityListener = function(changes) {
  if (changes.user && changes.user.newValue) {
    if (!userId) {
      userId = changes.user.newValue.id
    }
    window.localStorage.setItem('user_id', changes.user.newValue.id);
    renderComponents();
      test.annotate(userId);
  }
};

chrome.storage.sync.get('user', function(obj) {
  if (obj.user) {
    if (!userId) {
      userId = obj.user.id;
      window.localStorage.setItem('user_id', userId);
    }
    renderComponents();
    test.annotate(userId);
  } else {
    chrome.storage.onChanged.addListener(identityListener);
  }
});

