import TaxononmicGroups from '../../src/models/taxonomic_groups';
import {getConnection} from '../../src/utils'

describe('TaxonomicGroups', () => {
  describe('create', () => {
    let connection;
    beforeEach(async () => {
      connection = getConnection()
      await connection.connect()
      const groupsRepo = connection.getRepository(TaxononmicGroups);
      groupsRepo.clear()
    });

    test('it has the correct arguments', async () => {
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
    });
  })
})