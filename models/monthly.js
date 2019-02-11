module.exports = function(sequelize, DataTypes) {
  var Monthly = sequelize.define("Monthlies", {
    highlight: DataTypes.STRING,
    positive: DataTypes.STRING,
    negative: DataTypes.STRING
  });

  Monthly.associate = function(models) {
    // We're saying that a Monthly should belong to an Author
    // A Monthly can't be created without an Author due to the foreign key constraint
    Monthly.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Monthly;
};
