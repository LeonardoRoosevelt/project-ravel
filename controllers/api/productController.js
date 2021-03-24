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
    if (typeof quantity !== 'number' || quantity < 0) {
      return res.status(400).json({ message: "The value must be a number and can't be less than zero." })
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
  getProduct: (req, res, next) => {
    const { id } = req.params
    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(400).json({ message: "This product doesn't exist" })
        }
        return res.json(product)
      })
      .catch(next)
  },
  updateProduct: (req, res, next) => {
    const { id } = req.params
    const { name, quantity } = req.body
    return Product.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(400).json({ message: "This product doesn't exist." })
        }
        if (typeof quantity !== 'number' || quantity < 0) {
          return res.status(400).json({ message: "The value must be a number and can't be less than zero." })
        }
        if (name) {
          return Product.findAll({
            where: { [Op.and]: [{ id: { [Op.ne]: id } }, { name: { [Op.eq]: name } }] }
          }).then((np) => {
            if (np && np.length > 0) {
              return res.status(400).json({ message: 'This name already exist.' })
            }
            return product
              .update({
                name: !name ? product.name : name,
                quantity: !quantity ? product.quantity : quantity
              })
              .then((product) => {
                return res.json({ message: 'Product updated successfully', product })
              })
          })
        }
        return product.update({ quantity: !quantity ? product.quantity : quantity }).then((product) => {
          return res.json({ message: 'Product updated successfully', product })
        })
      })
      .catch(next)
  },
  deleteProduct: (req, res, next) => {
    const { id } = req.params
    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(400).json({ message: "This product doesn't exist." })
        }
        return product.destroy().then((product) => {
          res.json({ message: 'Product is delete successfully', product })
        })
      })
      .catch(next)
  },
  searchProducts: (req, res, next) => {
    const pageLimit = 10
    let offset = 0
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    Product.findAndCountAll({ offset: offset, limit: pageLimit }).then((result) => {
      const page = Number(req.query.page) || 1
      const pages = Math.ceil(result.count / pageLimit)
      const prev = page - 1 < 1 ? 1 : page - 1
      const next = page + 1 > pages ? pages : page + 1
      const data = result.rows
      const pageDatas = result.rows.length
      const totalData = result.count
      return res.json({ page, pages, data, pageDatas, totalData, prev, next })
    })
  }
}
module.exports = productController
