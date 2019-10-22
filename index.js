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

app.set('view engine', 'ejs');

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
      console.log(`🍑`)
      // user.getName()
      // console.log(getName);
      // .then(function(name) {
      res.render('profile', { user });
      //   // res.render('profile');
        });
    });
// });
  // });
  // db.user.findOne({
  //   where: { id: req.user.id }
    
  // });
  // 
// });
//     });
// });
// db.user.findByPk


app.get('/location', function(req, res) {
  // var therapistUrl = "https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychiatrist&location=wa-seattle&user_location=47.5480%2C121.9386&skip=0&limit=20&user_key=efda13865301f912b6d55d097c62c067"

  //   // fetch(url).then(deets=>{return deets.json()}).then(details=>{console.log("test");console.log(details.data)})';
  //   // Use request to call the API
  //   axios.get(therapistUrl)
  //   console.log(therapistUrl);
  //   .then( details => {
  //     var therapist = apiResponse.data.location;
  //     res.render('location', { therapist: therapist });
  //   })
  // });
  res.render('location');
});

app.get('/specialty', function(req, res) {
  res.render('specialty');
});

app.get('/save', function(req, res) {
  res.render('save');
});

app.get('/messages', function(req, res) {
  res.render('messages');
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
