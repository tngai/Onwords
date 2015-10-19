var loadfunction = window.onload;

window.onload = function(event) {

  //////////////////////////////////////////

    $('body').append("<div class='annotation-sidebar'></div>");
    $('.annotation-sidebar').append("<div class=scrollview>hello</div>");

    function sidebar(open) {
      var width = $('.annotation-sidebar').width();
      var duration = 200;
      if (open) {
        $('.annotation-sidebar').animate({right: 0}, duration);
      } else {
        $('.annotation-sidebar').animate({right: -(width-20)}, duration);
      }
    }

    var open = false;
    $('body').on('click', '.annotator-hl', function() {
      console.log('esdfjkla;sjfs');
      open = !open;
      sidebar(open);
    })

  //////////////////////////////////////////


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
      prefix: 'https://testing102.firebaseio.com',
      urls: {
        create: '/annotations.json',
        update: '/annotations/{id}.json',
        destroy: '/annotations/{id}.json',
        search: '/annotations.json'
      }
    })
     .include(pageUri)

  app.start()
     .then(function() {
        app.annotations.load({uri: window.location.href.split("?")[0]});
     })

  if (loadfunction) {
    loadfunction(event);
  }

}
// https://testing102.firebaseio.com/annotations.json?uri='http...'
// https://testing102.firebaseio.com/annotations.json?sortBy="uri"&equalTo='http...'
