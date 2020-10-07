const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World')
})

const server = app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`)
})

module.exports = { app, server };