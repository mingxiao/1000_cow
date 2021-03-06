const express = require('express')
const app = express()
const port = process.env.PORT || 5000
import TaxononmicGroups from './models/taxonomic_groups';
import {getConnection} from './utils';

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/data/taxonomic_groups', async (req, res) => {
  const connection = getConnection();
  if (!connection.isConnected){
    await connection.connect();
  }
  const groupRepo = connection.getRepository(TaxononmicGroups);
  const groups = await groupRepo.find();
  const data = groups.map(group => group.toJSONAPI())
  res.status(200).send({
    links: {
      self: '/taxonomic_groups'
    },
    data
  })
})

const server = app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`)
})

module.exports = { app, server };