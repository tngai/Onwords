var renderAnnotations = function() {
  return {
    // annotationsLoaded: function(annotations) {
    //   var uri = window.location.href.split("?")[0];
    //   console.log("annotations loaded", annotations);
    //   var obj = {};
    //   obj[uri] = annotations;
    //   chrome.storage.local.set(obj);
    // },
    annotationCreated: function(annotation) {
      var uri = window.location.href.split("?")[0];
      console.log("annotation created:", annotation);
      chrome.storage.local.get(uri, function(obj) {
        console.log('old values:', obj[uri])
        if (!obj[uri]) {
          obj[uri] = [];
        }
        obj[uri].push(annotation);
        console.log('new values:', obj[uri]);
        var newObj = {};
        newObj[uri] = obj[uri];
        chrome.storage.local.set(newObj);
      })
    },
    beforeAnnotationDeleted: function(annotation) {
      var id = annotation.id;
      $('[data-annotation-id=' + id + ']').contents().unwrap();
      var uri = window.location.href.split("?")[0];
      chrome.storage.local.get(uri, function(obj) {
        debugger;
        console.log('old values:', obj[uri])
        for (var i = 0; i < obj[uri].length; i++) {
          if (obj[uri][i].id === annotation.id) {
            obj[uri].splice(i, 1);
            var newObj = {};
            newObj[uri] = obj[uri];
            chrome.storage.local.set(newObj);
          }
        }
      })
    }
  }
}

module.exports = renderAnnotations;
