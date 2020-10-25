import TaxononmicGroups from '../../src/models/taxonomic_groups';
import {getConnection} from '../../src/utils'

describe('TaxonomicGroups', () => {
  let group, groupArgs, connection;
  beforeAll(async () => {
    connection = getConnection()
    await connection.connect()
  })

  beforeEach(async () => {
    const groupsRepo = connection.getRepository(TaxononmicGroups);
    groupArgs = {
      groupName: 'some-group',
      inPresentStudy: true,
      inTop30: false
    }
    group = groupsRepo.create(groupArgs);
  });

  describe('create', () => {
    test('it has the correct arguments', async () => {
      expect(group.groupName).toEqual(groupArgs.groupName)
      expect(group.inPresentStudy).toEqual(groupArgs.inPresentStudy)
      expect(group.inTop30).toEqual(groupArgs.inTop30)
    });
  })

  describe('toJSONAPI', () => {
    it('has the correct structure', () => {
      const groupAPI = group.toJSONAPI()
      const expectedBody = {
        type: 'taxonomic_groups',
        id: group.id,
        attributes: {
          groupName: groupArgs.groupName,
          inPresentStudy: groupArgs.inPresentStudy,
          inTop30: groupArgs.inTop30
        }
      }
      expect(groupAPI).toEqual(expectedBody)
    })
  })
})