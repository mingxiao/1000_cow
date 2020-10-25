import {getConnectionManager} from "typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import TaxonomicGroups from './models/taxonomic_groups'

const connectOpts: SqliteConnectionOptions = {
  type: 'sqlite',
  database: '/tmp/db.sqlite',
  entities: [TaxonomicGroups],
  logging: ["error"],
  name: 'test'
}

export const getConnection = (connectionName = 'test') => {
  const conManager = getConnectionManager()
  if (conManager.has(connectionName)){
    return conManager.get(connectionName)
  } else {
    return conManager.create(connectOpts)
  }
}