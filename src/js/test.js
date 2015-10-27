var renderAnnotations = require('./annotationRender');


exports.annotate = function(event) {

  var pageUri = function() {
    return {
      beforeAnnotationCreated: function(ann) {
        ann.uri = window.location.href.split("?")[0];
      }
    };
  };

  var app = new annotator.App();
  app.include(annotator.ui.main)
     .include(annotator.identity.simple)
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

  app.start()
     .then(function() {
        chrome.storage.sync.get('facebook_id', function(obj) {
          console.log('test.js > callback of app.start().then() > chrome.storage.sync.get(\'facebook_id\') (line 32), obj:', obj);
          if (!obj['facebook_id']) {
            console.error('Unable to access facebook_id from chrome.storage (test.js line 34)');
            return;
          }
          console.log('test.js > callback of app.start().then() > chrome.storage.sync.get(\'facebook_id\') (line 37), obj.facebook_id:', obj.facebook_id);
          app.ident.identity = obj.facebook_id;
          console.log('test.js > callback of app.start().then() > chrome.storage.sync.get(\'facebook_id\') (line 39), app.ident.identity:', app.ident.identity);
          console.log('line app.ident.identity = obj.facebook_id; success?');
          app.annotations.load({uri: window.location.href.split("?")[0]});
        });
     })



}
