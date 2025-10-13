var express = require('express');
var router = express.Router();
var path = require('path');
var secretConfig = require('../secret-config');

router.get('/login', (req, res) => {
  const secretKey = req.query.secret_key;
  if(secretKey === secretConfig.SECRET_KEY) {
    req.session.isLoggedIn = true;
    return res.redirect('/home');
  }
  else {
    req.session.isLoggedIn = false;
    return res.status(401).send('Unauthorized');
  }
});

router.get('/home', (req, res) => {
  if(req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
  else {
    res.redirect('/login');
  }
});

router.get('/applications', (req, res) => {
  if(req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
  else {
    res.redirect('/login');
  }
});

router.get('/phc-go-add-ons', (req, res) => {
  if(req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
  else {
    res.redirect('/login');
  }
});

module.exports = router;