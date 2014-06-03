var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
var async = require('async');

var mongoose = require('mongoose'),
    models = require('./models/main.js');
      mongoose.connect('localhost', 'main');

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
      app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser({ keepExtensions: true, uploadDir:__dirname + '/uploads' }));
app.use(methodOverride());
app.use(cookieParser());

app.use(session({
  key: 'mgu.sess',
  secret: 'keyboard cat',
  cookie: {
    path: '/',
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));


app.use(function(req, res, next) {
  res.locals.session = req.session;
  res.locals.locale = req.cookies.locale || 'ru';
  next();
});


// app.use(function(req, res, next) {
//   res.status(404);

//   // respond with html page
//   if (req.accepts('html')) {
//     res.render('error', { url: req.url, status: 404 });
//     return;
//   }

//   // respond with json
//   if (req.accepts('json')) {
//       res.send({
//       error: {
//         status: 'Not found'
//       }
//     });
//     return;
//   }

//   // default to plain-text
//   res.type('txt').send('Not found');
// });

// app.use(function(err, req, res, next) {
//   var status = err.status || 500;

//   res.status(status);
//   res.render('error', { error: err, status: status });
// });


// -------------------
// *** Model Block ***
// -------------------


var User = models.User;
var Publish = models.Publish;
var Author = models.Author;
var Work = models.Work;
var Event = models.Event;
var Press = models.Press;
var License = models.License;


// ------------------------
// *** Midleware Block ***
// ------------------------


function checkAuth (req, res, next) {
  if (req.session.user_id)
    next();
  else
    res.redirect('/login');
}


// ------------------------
// *** Handlers Block ***
// ------------------------


var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


// ------------------------
// *** Post parms Block ***
// ------------------------


// ---------------------------------------------------


// ------------------------
// *** Main Block ***
// ------------------------


var main = app.route('/');

main.get(function(req, res) {
  res.render('main');
});


// ------------------------
// *** Works Block ***
// ------------------------


app.route('/works/since').get(function(req, res) {
  res.render('works/since.jade');
});

app.route('/works/grad').get(function(req, res) {
  res.render('works/grad.jade');
});

app.route('/works/events').get(function(req, res) {
  res.render('works/events.jade');
});


// ------------------------
// *** Publications Block ***
// ------------------------


app.route('/publications').get(function(req, res) {
  res.render('publications');
});


// ------------------------
// *** Set Locale Block ***
// ------------------------


app.route('/lang/:locale').get(function(req, res) {
  res.cookie('locale', req.params.locale);
  res.redirect('back');
});


// ------------------------
// *** Auth Block ***
// ------------------------


app.route('/auth').get(checkAuth, function (req, res) {
  res.render('auth');
});


// ------------------------
// *** Add Course Block ***
// ------------------------


var add_course = app.route('/auth/add/course');

add_course.get(checkAuth, function(req, res) {
  res.render('auth/courses/add.jade');
});

add_course.post(function(req, res) {
  var post = req.body;
  var date_modify = new Date();
  var course = new Course();

  course.langs = {
    languages: ['ru','en','fr'],
    def: 'ru'
  }

  course.title.ru.content = post.ru.title;
  course.title.ru.date = date_modify;
  course.description.ru.content = post.ru.description;
  course.description.ru.date = date_modify;

  course.save(function(err, course) {
    res.redirect('back');
  });
});


// ------------------------
// *** Edit Courses Block ***
// ------------------------


app.route('/auth/edit/courses').get(checkAuth, function(req, res) {
  Course.find().exec(function(err, courses) {
    res.render('auth/courses', {courses: courses});
  });
});

app.route('/auth/edit/courses/:id').get(checkAuth, function(req, res) {
  var id = req.params.id;

  Course.findById(id).exec(function(err, course) {
    res.render('auth/courses/edit.jade', {course: course});
  });
});

app.route('/auth/edit/courses/:id').post(function(req, res) {
  var id = req.params.id;
  var post = req.body;
  var date_modify = new Date();

  Course.findById(id).exec(function(err, course) {

    course.langs = {
      languages: ['ru','en','fr'],
      def: 'ru'
    }

    course.title.ru.content = post.ru.title;
    course.title.ru.date = date_modify;
    course.description.ru.content = post.ru.description;
    course.description.ru.date = date_modify;

    course.save(function(err, course) {
      res.redirect('back');
    });
  });
});



// ------------------------
// *** Login Block ***
// ------------------------


var login = app.route('/login');

login.get(function (req, res) {
  res.render('login');
});

login.post(function(req, res) {
  var post = req.body;

  User.findOne({ 'login': post.login, 'password': post.password }, function (err, person) {
    if (!person) return res.redirect('back');
    req.session.user_id = person._id;
    req.session.status = person.status;
    req.session.login = person.login;
    res.redirect('/auth');
  });
});


// ------------------------
// *** Logout Block ***
// ------------------------


app.route('/logout').get(function (req, res) {
  delete req.session.user_id;
  delete req.session.login;
  delete req.session.status;
  res.redirect('back');
});


// ------------------------
// *** Registr Block ***
// ------------------------


var registr = app.route('/registr');

registr.get(function(req, res) {
  if (!req.session.user_id)
    res.render('registr');
  else
    res.redirect('/');
});

registr.post(function (req, res) {
  var post = req.body;

  var user = new User({
    login: post.login,
    password: post.password,
    email: post.email
  });

  user.save(function(err, user) {
    if(err) {throw err;}
    console.log('New User created');
    req.session.user_id = user._id;
    req.session.login = user.login;
    req.session.status = user.status;
    res.redirect('/login');
  });
});


// ------------------------
// *** Static Block ***
// ------------------------


app.route('/contacts').get(function (req, res) {
  res.render('static/contacts.jade');
});

app.route('/sitemap.xml').get(function(req, res){
  res.sendfile('sitemap.xml',  {root: './public'});
});

app.route('/robots.txt').get(function(req, res){
  res.sendfile('robots.txt',  {root: './public'});
});


// ------------------------
// *** Other Block ***
// ------------------------


app.listen(3000);
console.log('http://127.0.0.1:3000')