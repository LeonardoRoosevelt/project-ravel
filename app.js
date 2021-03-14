const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

routes(app)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
