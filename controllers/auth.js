var express = require('express');
var router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');


router.get('/signup', function(req, res) {
  res.render('auth/signup');
});


router.post('/signup', function(req, res) {
  // find or create user
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
}).then(function([user, created]) {
    if (created) {
      // we created it, redirect to home
      console.log('user successfully created');
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      // if user existed, error and redirect to signup
      console.log('email already exists');
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
}).catch(function(err) {
  // catch any errors
    console.log(err);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You have logged in',
  failureRedirect: '/auth/login',
  failureFlash: 'INVALID CREDENTIALS'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Thank you for visiting. See you again soon.');
  res.redirect('/');
});

module.exports = router;
