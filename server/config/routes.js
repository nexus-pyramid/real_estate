var path = require('path'),
    messages = require('../controllers/messages.js'),
  	properties = require('../controllers/properties.js');

var errors = {errors:{
      general: 'Invalid login information'
    }}

module.exports = function(app){
  app.post('/createMessage', messages.create);
  app.post('/getHomes', properties.getHomes);
  app.post('/addHome', properties.addHome);
  app.post('/addMessage', messages.create);
};
