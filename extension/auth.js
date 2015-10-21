var fetchToken = function() {
  debugger;

  var access_token;
  var clientID = 'CLIENT ID';
  var clientSecret = 'CLIENT SECRET';
  var redirectUri = 'https://' + chrome.runtime.id + '.chromiumapp.org/provider_cb';

  var options = {
    'interactive': true,
    url: 'https://www.facebook.com/dialog/oauth?client_id=' + clientID + '&response_type=token&access_type=online&redirect_uri=' + encodeURIComponent(redirectUri) 
  }

  // var exchangeCodeForToken = function(code) {
  //   $.ajax({
  //     url: 'https://graph.facebook.com/oauth/access_token?client_id=' + clientID +'&client_secret=' + clientSecret +
  //       '&redirect_uri=' + redirectUri +
  //       '&code=' + code
  //   })
  //   .done(function(response) {
  //     access_token = response['access_token'];
  //   });
  // }

    chrome.identity.launchWebAuthFlow(options, function(redirectUri) {
      debugger;
      // console.log(redirectUri);
      if (chrome.runtime.lastError) {
        console.log(new Error(chrome.runtime.lastError));
        return;
      }
      
      var string = redirectUri.slice(redirectUri.indexOf('#')+1);
      var pairs = string.split('=');
      var token = pairs[1].split('&');
      var values = {};
      values[pairs[0]] = token[0];
      if (values.hasOwnProperty('access_token')) {
        access_token = values['access_token'];
      } 
      // else if (values.hasOwnProperty('code')) {
      //   exchangeCodeForToken(values['code']);
      // }

      chrome.storage.sync.set({'access_token': access_token});
    });

  
}

chrome.storage.sync.clear();

chrome.browserAction.onClicked.addListener(function() {
  chrome.storage.sync.get('access_token', function(obj) {
    console.log('inside browserAction');
    if (!obj['access_token']) {
      fetchToken();
    }
  });

});

// if (authToken) {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     console.log(tabs[0]);
//     chrome.tabs.sendMessage(tabs[0].id, {action: "renderComponents"});  
//   })
// }







