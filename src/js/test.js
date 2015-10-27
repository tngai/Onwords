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

  chrome.storage.sync.get('facebook_id', function(obj) {
    if (!obj['facebook_id']) {
      console.error('Unable to access facebook_id from chrome.storage');
      return;
    }
    app.start()
       .then(function() {
         window.localStorage.setItem('facebook_id', obj.facebook_id);
         app.annotations.load({uri: window.location.href.split("?")[0]});
       });
  });
}
