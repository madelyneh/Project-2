module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    highlight: DataTypes.STRING,
    positive: DataTypes.STRING,
    negative: DataTypes.STRING,
    option1: DataTypes.STRING,
    option2: DataTypes.STRING,
    option3: DataTypes.STRING,
    music: DataTypes.STRING,
    video: DataTypes.STRING,
    // uniqueNum: DataTypes.INTEGER
  });


  Post.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.Author, {
      // as: 'Author_Id',
      foreignKey: {
        allowNull: false
      }
    });
    // models.Author.belongsToMany(models.Weekly, { through: Post });
    // models.Weekly.belongsToMany(models.Author, { through: Post });
    
    

  };

  return Post;
};
