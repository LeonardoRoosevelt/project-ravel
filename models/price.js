'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Price.belongsTo(models.Product)
    }
  }
  Price.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING
      },
      productId: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 'Price'
    }
  )
  return Price
}
