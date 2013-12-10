var express = require('express')
  , routes = require('./routes')
  , http = require('http')
    , conn = require('./modules/db_connect');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

conn.connect('localhost','test');
conn.initBlog();
/*
conn.addOne({
    title: 'this is my blog title',
    author: 'me',
    body: 'the body of my blog. can you see that?'
});
*/
conn.findOneById({ author: "me"},function(err, d){
    console.log(d);
});
conn.update({ author: 'me' }, { title: 'new title' }, { multi: true }, function (err, numberAffected, raw) {
    if (err) return handleError(err);
    console.log('The number of updated documents was %d', numberAffected);
    console.log('The raw response from Mongo was ', raw);
})

app.get('/', routes.index);
app.get('/phone-list', routes.list);
app.get('/phone-detail', routes.detail);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
