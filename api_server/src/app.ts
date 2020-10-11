const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { Sequelize } = require('sequelize');
import {ResponseError} from './interfaces'

let db_str: string = '';
if (process.env.ENV == 'test') {
  db_str = 'sqlite::memory:'
}
const sequelize = new Sequelize(db_str)

app.get('/', (req, res) => {
  res.send('Hello World')
})

const VALID_TABLES = ['taxonomic_groups']

app.get('/data', (req, res) => {
  const table_name = req.query.table_name
  if (!VALID_TABLES.includes(table_name)){
    const error: ResponseError = {
      "title": "Unknown Table",
      "detail": `Unknown Table: ${table_name}`
    }
    const body = {
      "errors": [error]
    }
    res.status(400).send(body)
  }
})

const server = app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`)
})

module.exports = { app, server };