module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Gallery', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    pieces: DataTypes.ARRAY
  });
}
