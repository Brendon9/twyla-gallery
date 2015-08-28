module.exports = function(sequelize, DataTypes) {
  return sequelize.define('piece', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    dimension: DataTypes.TEXT,
    type: DataTypes.STRING
  });
}
