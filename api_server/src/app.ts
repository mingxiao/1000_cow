const express = require('express')
const app = express()
const port = process.env.PORT || 5000
import TaxononmicGroups from './models/taxonomic_groups';

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/data/taxonomic_groups', async (req, res) => {
  res.status(200).send({})
})

const server = app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`)
})

module.exports = { app, server };