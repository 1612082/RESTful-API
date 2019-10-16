var express = require('express');
var router = express.Router();
var pp = require('../passport');
const Sequelize = require('sequelize');
  const sequelize = new Sequelize({
    database: 'server',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
  });
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// protected route
router.get('/me', (req, res, next) => {
  sequelize.query('select name,password from users where id = ' + pp.secuse() +';' ).then(([results, metadata]) => {
    
    res.json({
      message : 'You made it to the secure route',
      user : results         
    }) 
})
  
});
module.exports = router;
