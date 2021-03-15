const db = require('../../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Product = db.Product

const productController = {
  createProduct: (req, res, next) => {
    const { id, name, quantity } = req.body
    if (!id || !name || !quantity) {
      return res.status(400).json({ message: 'Please enter the value.' })
    }
    if (quantity < 0) {
      return res.status(400).json({ message: "The quantity can't be less than zero." })
    }
    Product.findOrCreate({
      where: { [Op.or]: [{ id: { [Op.eq]: id } }, { name: { [Op.eq]: name } }] },
      defaults: { id, name, quantity }
    })
      .then(([product, created]) => {
        if (!created) {
          return res.status(400).json({ message: 'The value of id or name already exists.' })
        }
        return res.json({ message: 'Product create successfully!', product })
      })
      .catch(next)
  },
  getProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  searchProducts: () => {}
}
module.exports = productController
