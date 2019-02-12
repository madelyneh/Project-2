module.exports = function (sequelize, DataTypes) {
  var Weekly = sequelize.define("Weeklies", {
    best: DataTypes.STRING,
    worst: DataTypes.STRING,
    next: DataTypes.STRING
  });

  Weekly.associate = function (models) {
    // We're saying that a Weekly should belong to an Author
    // A Weekly can't be created without an Author due to the foreign key constraint
    Weekly.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Weekly;
};