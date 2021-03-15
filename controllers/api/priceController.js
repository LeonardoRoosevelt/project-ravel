const db = require('../../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Product = db.Product
const Price = db.Price

const priceController = {
  createPrice: (req, res, next) => {
    const { id, productId, type, price } = req.body
    if (!id || !productId || !type || !price) {
      return res.status(400).json({ message: 'Please enter all values.' })
    }
    return Product.findByPk(productId)
      .then((product) => {
        if (!product) {
          return res.status(400).json({ message: 'This product is not exist.' })
        }
        if (type !== 'Gold' && type !== 'Silver' && type !== 'Copper') {
          return res.status(400).json({ message: 'This type is wrong. Please enter Gold, Silver or Copper' })
        }
        return Price.findOrCreate({
          where: {
            [Op.or]: [
              { id: { [Op.eq]: id } },
              { [Op.and]: [{ productId: { [Op.eq]: productId } }, { type: { [Op.eq]: type } }] }
            ]
          },
          defaults: { id, productId, type, price }
        }).then(([price, created]) => {
          if (!created) {
            if (id === price.id) {
              res.status(400).json({ message: 'The id  already exists.' })
            }
            return res.status(400).json({ message: 'The type of the product price already exists.' })
          }
          return res.json({ message: 'Price create successfully!', price })
        })
      })
      .catch(next)
  },
  getPrice: (req, res, next) => {
    const { id } = req.params
    Price.findByPk(id)
      .then((price) => {
        if (!price) {
          return res.status(400).json({ message: "This price doesn't exist" })
        }
        return res.json(price)
      })
      .catch(next)
  },
  updatePrice: (req, res, next) => {
    const { id } = req.params
    const { price } = req.body
    if (typeof price !== 'number') {
      return res.status(400).json({ message: 'The value must be a number.' })
    }
    Price.findByPk(id)
      .then((data) => {
        if (!data) {
          return res.status(400).json({ message: "This price doesn't exist" })
        }
        return data.update({ price: !price ? data.price : price }).then((price) => {
          return res.json({ message: 'Price updated successfully', data })
        })
      })
      .catch(next)
  },
  deletePrice: () => {}
}
module.exports = priceController
