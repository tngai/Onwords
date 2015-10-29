var renderAnnotations = require('./annotationRender');

exports.annotate = function(event) {

  var pageUri = function() {
    return {
      beforeAnnotationCreated: function(ann) {
        ann.uri = window.location.href.split("?")[0];
        ann.title = document.getElementsByTagName('title')[0].innerHTML || document.querySelector('meta[name="twitter:title"]').getAttribute("content");
        // ann.description = document.querySelector('meta[name="twitter:description"]').getAttribute("content");
        ann.user_id = window.localStorage.getItem('user_id');
      }
    };
  };

  var app = new annotator.App();
  app.include(annotator.ui.main)
     .include(annotator.storage.http, {
        prefix: 'https://onwords-test-server.herokuapp.com',
        urls: {
          create: '/api/annotations',
          update: '/api/annotations/{id}',
          destroy: '/api/annotations/{id}',
          search: '/api/search'
        }
      })
     .include(pageUri)
     .include(renderAnnotations);

  chrome.storage.sync.get('user_id', function(obj) {
    if (!obj['user_id']) {
      console.error('Unable to access user_id from chrome.storage');
      return;
    }
    app.start()
      .then(function() {
         console.log('what is obj:', obj);
         console.log('what is obj.user_id:', obj.user_id);
         window.localStorage.setItem('user_id', obj.user_id);
         console.log('user_id set in localStorage');
         app.annotations.load({
          uri: window.location.href.split('?')[0],
          user: window.localStorage.getItem('user_id')
        });
      });
  });

  document.addEventListener('showFriendAnnotations', function(e) {
    console.log("show this dude's annotation:", e.detail.userId);
    app.annotations.load({
      uri: window.location.href.split('?')[0],
      user: e.detail.userId
    })
  })
};
