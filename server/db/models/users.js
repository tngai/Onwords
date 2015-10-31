var db = require('../config');


require('./annotations');


var User = db.Model.extend({
  // User properties:
  tableName: 'users',

  annotations: function() {
    return this.hasMany('Annotation');
  }
},{
  //Model methods
  fetchById: function(options) {
    return new this(options).fetch({withRelated:['annotations']});
  },

  fetchByFacebookId: function(facebook_id) {
    return new this({
      facebook_id: facebook_id
    }).fetch({withRelated:['annotations']});
  },

  fetchByUsername: function(username) {
    return new this({
      username: username 
    }).fetch({withRelated:['annotations']});
  },
  newUser: function(options) {
    return new this(options);
  },
  fetchByUserId: function(user_id) {
    return new this({"user_id":user_id}).fetchAll();
  },
  fetchByFullName: function(options){
    return new this(options).fetchAll();
  }
});

module.exports = db.model('User', User);