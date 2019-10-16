
const Sequelize = require('sequelize');

// initialze an instance of Sequelize
const sequelize = new Sequelize({
  database: 'server',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
});

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// create user model
const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

module.exports = { User };

