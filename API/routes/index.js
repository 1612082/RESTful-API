var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var User = require('../db').User;
const passportJWT = require('passport-jwt');
require('../passport');
var pp = require('../passport');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.secretOrKey = 'wowwow';
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

pp.run();

// create some helper functions to work on the database
const createUser = async ({ name, password }) => {
  return await User.create({ name, password });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUser = async obj => {
  return await User.findOne({
    where: obj,
  });
}; 

/* GET all users */
router.get('/', function (req, res) {
  res.json({ message: 'RESTful API with Passport JWT' });
});

// get all users
router.get('/users', function(req, res) {
  getAllUsers().then(user => res.json(user));
});

/* POST register */
router.post('/user/register', function(req, res, next) {
  const { name, password } = req.body;
  createUser({ name, password }).then(user =>
    res.json({ user, msg: 'account created successfully' })
  );
});
/* login */
router.post('/user/login', async function(req, res, next) {
  const { name, password } = req.body;
  if (name && password) {
    let user = await getUser({ name: name });
    if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user.password === password) {
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
});


module.exports = router;
