import {TaxononmicGroups} from '../../built/models/taxonomic_groups';
import {createConnection, Connection} from "typeorm";

const connectOpts = {
  type: 'sqlite',
  database: '/tmp/db.sqlite',
  entities: [TaxononmicGroups],
  logging: true
}
fdescribe('TaxonomicGroups', () => {
  describe('create', () => {
    test('it has the correct arguments', async () => {
      const connection = await createConnection(connectOpts)
    })
  })
})