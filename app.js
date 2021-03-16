const fs = require('fs')
const https = require('https')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

app.get('/', (req, res) => {
  res.send('hello world')
})

https
  .createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    },
    app
  )
  .listen(port, () => {
    console.log(`Express is listening on https://localhost:${port}`)
  })

// app.listen(port, () => {
//   console.log(`Express is listening on http://localhost:${port}`)
// })
