let bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    nameInput: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.DATE,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: (author) => {
        const salt = bcrypt.genSaltSync();
        author.password = bcrypt.hashSync(author.password, salt);
        console.log('TCL: user.password', author.password)
        
      }
    }
  }
  );

  Author.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Author.hasMany(models.Post, models.Weekly, {
      onDelete: "cascade"
    });
  };

  Author.prototype.validatePassword = function(password) {
    console.log('Models Author 32: validating password');
    return bcrypt.compare(
        password,
        this.password
    );
  };
  Author.sync();

  return Author;
};
