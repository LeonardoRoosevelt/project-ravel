const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
