import TaxononmicGroups from '../../built/models/taxonomic_groups';
import {createConnection, getRepository} from "typeorm";
import { isExportDeclaration } from 'typescript';

const connectOpts = {
  type: 'sqlite',
  database: '/tmp/db.sqlite',
  entities: [TaxononmicGroups],
  logging: true
}
fdescribe('TaxonomicGroups', () => {
  describe('create', () => {
    test('it has the correct arguments', async () => {
      const connection = await createConnection(connectOpts);
      // console.log({connection, TaxononmicGroups})
      const groupsRepo = connection.getRepository(TaxononmicGroups);
      const group = groupsRepo.create({group_name: "some-group"});
      expect(group.group_name).toEqual('some-group')
    })
  })
})