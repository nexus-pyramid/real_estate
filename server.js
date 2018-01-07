"use strict";

var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    session  = require('express-session'),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    cookieParser = require('cookie-parser'),
    multipart = require('connect-multiparty'),
    flash    = require( 'connect-flash'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

var sessionConfig = {
     secret:'super_secret'
    //  resave:false,
    //  saveUninitialized: true,
    //  name:'myCookie',
    //  cookie: {
    //    secure: false, 
    //    httpOnly:false, 
    //    maxAge: 3600000
    // }
};
app.use( express.static( path.join( root, 'bower_components')));
app.use(bp.urlencoded({extended:true}));
app.use(bp.json({extended: true}));
app.use( express.static( path.join( root, 'public')));
// app.use(session(sessionConfig));
app.use(flash());

app.use(session(sessionConfig));

app.listen(8000, function() {
  console.log( `server running on port 8000` );
});
require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);