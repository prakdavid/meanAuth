const router = require('express').Router();
const fs = require('fs');
const RSA_PUBLIC_KEY = fs.readFileSync('./rsa/key.pub');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

function isLoggedIn(req, res, next) {
  console.log(req.headers);
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, RSA_PUBLIC_KEY, (err, decoded) => {
      if (err) { return res.status(401).json('token invalid'); }
      const sub = decoded.sub;
      User.findOne({ '_id': sub }).exec( (err, user) => {
        if (err || !user) { res.status(401).json('error') }
        req.user = user;
        next();
      })
    })
  } else {
    res.status(401).json('pas de token !');
  }
}


router.get('/current', isLoggedIn, (req, res) => {
  res.json(req.user);
})


module.exports = router;