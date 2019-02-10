// DELETE THIS FILE

'use strict';
let bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', 
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      birthday: DataTypes.STRING,
      fullname: DataTypes.STRING,
      lastname: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
					console.log('TCL: user.password', user.password)
          
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };

  // FIX THISSS
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(
        password,
        this.password
    );
  };

  User.sync();

  return User;
  
};