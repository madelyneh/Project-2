module.exports = function(sequelize, DataTypes) {
  var Weekly = sequelize.define("Weeklies", {
   
    highlight: DataTypes.STRING,
    positive: DataTypes.STRING,
    negative: DataTypes.STRING,
  });

  Weekly.associate = function(models) {
    // We're saying that a Weekly should belong to an Author
    // A Weekly can't be created without an Author due to the foreign key constraint
    Weekly.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Weekly;
};
