import TaxononmicGroups from '../../built/models/taxonomic_groups';
import {createConnection, getRepository} from "typeorm";

const connectOpts = {
  type: 'sqlite',
  database: '/tmp/db.sqlite',
  entities: [TaxononmicGroups],
  logging: true
}

describe('TaxonomicGroups', () => {
  describe('create', () => {
    test('it has the correct arguments', async () => {
      const connection = await createConnection(connectOpts);
      const groupsRepo = connection.getRepository(TaxononmicGroups);
      const groupArgs = {
        groupName: 'some-group',
        inPresentStudy: true,
        inTop30: false
      }
      const group = groupsRepo.create(groupArgs);
      expect(group.groupName).toEqual(groupArgs.groupName)
      expect(group.inPresentStudy).toEqual(groupArgs.inPresentStudy)
      expect(group.inTop30).toEqual(groupArgs.inTop30)
    })
  })
})