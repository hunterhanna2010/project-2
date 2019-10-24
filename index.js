require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const RateLimit = require('express-rate-limit');
const axios = require('axios');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static(__dirname + 'public'));
app.use(ejsLayouts);
app.use(helmet());
app.use(ejsLayouts);
app.use(helmet());

// MAKE TWO LIMITERS FOR LOGIN AND SIGNUP
const loginLimiter = new RateLimit({
  windowMs: 1000 * 60 * 5,
  max: 3,
  message: 'Maximum log in attempts have been exceeded. Please try again later.'
});

const signupLimiter = new RateLimit({
  windowMs: 1000 * 60 * 60,
  max: 3,
  message: 'You have too many accounts. Bye'
});

// APPLY RATE LIMITS AFTER TESTING
// app.use('/auth/login', loginLimiter);
// app.use('auth/signup', signupLimiter);


const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30
});

// SESSION MUST COME BEFORE FLASH AND PASSPORT
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));


// use this line once to set up STORE TABLE
sessionStore.sync();

// MUST COME AFTER SESSION AND BEFORE PASSPORT MIDDLEWARE
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  console.log(req.user.name);
  db.user.findByPk((req.user.id))
    .then(function(user) {
      console.log(user);
      res.render('profile', { user });
    });
});
// location axios call to seattle area
app.get('/location', function(req, res) {
  res.render('location');
});

app.get('/results', function(req, res) {
  var therapistUrl = 'https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychiatrist&location=wa-seattle&user_location=47.5480%2C121.9386&skip=0&limit=20&user_key=efda13865301f912b6d55d097c62c067';
  axios.get(therapistUrl)
    .then(details => {
      let id = details.data.data[0].practices[0].uid;
      let name = details.data.data[0].practices[0].name;
      let locationSlug = details.data.data[0].practices[0].location_slug;
      let bio = details.data.data[0].profile.bio;
      let phone = details.data.data[0].practices[0].phones[0].number;
      console.log(id);
      console.log(name);
      console.log(locationSlug);
      console.log(bio);
      console.log(phone);

      let returnObj = {
        id: id,
        name: name,
        location: locationSlug,
        bio: bio,
        phone: phone
      };
      res.render('results', { returnObj });
    });
});

// specialty axios call adding specialty conditions
app.get('/specialty', function(req, res) {
  res.render('specialty');
});


app.get('/show', function(req, res) {
  var therapistUrl = 'https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychiatrist&location=wa-seattle&user_location=47.5480%2C121.9386&skip=0&limit=20&user_key=efda13865301f912b6d55d097c62c067';
  axios.get(therapistUrl)
    .then(details => {
      let id = details.data.data[3].practices[0].uid;
      let name = details.data.data[3].practices[0].name;
      let locationSlug = details.data.data[3].practices[0].location_slug;
      let bio = details.data.data[3].profile.bio;
      let phone = details.data.data[3].practices[0].phones[0].number;
      console.log(id);
      console.log(name);
      console.log(locationSlug);
      console.log(bio);
      console.log(phone);
      let specialty = details.data.data[3].specialties[0].description;
      console.log(specialty);


      let returnObj = {
        id: id,
        name: name,
        location: locationSlug,
        bio: bio,
        specialty: specialty,
        phone: phone
      };
      console.log(returnObj);
      res.render('show', { returnObj });
    });
});

// app.get('/save', function(req, res) {
//   db.user.findAll()
//     .then(function(savedTherapist) {
//       res.render('save', { user: savedTherapist });
//     });
// });


app.post('/allMessages', function(req, res) {
  console.log('We are creating a new message to post');
  console.log(req.user.name);
  db.message.create({
    subject: req.body.subject,
    body: req.body.body,
    userId: req.body.userId,
    therapistId: req.body.therapistId
  }).then(function() {
    // console.log(`${message} was ${created}`);
    res.redirect('/allMessages');
  }).catch(function(err) {
    console.log(err);
  });
});

app.get('/allMessages', function(req, res) {
  console.log('find me any messages so I can update');
  db.message.findAll().then(function(messages) {
    console.log(messages);
    res.render('allMessages', { messages });
  });
});

app.get('/editMessage/:id', function(req, res) {
  db.message.findByPk(req.params.id)
    .then(function(message) {
      res.render('editMessage', { message });
    });
});

app.put('/allMessages/:id', function(req, res) {
  db.message.update({
    subject: req.body.subject,
    body: req.body.body
  }, {
    where: {
    id: req.params.id
    }
  }).then(function(message) {
    res.redirect('/allMessages');
  })
});

app.delete('/allMessages/:id', function(req, res) {
  db.message.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    console.log(`😜`)
    res.redirect('/allMessages');
  }).catch(function(err) {
    console.log(`😎`, err);
  });
});


app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
