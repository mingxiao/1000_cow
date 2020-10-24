const {app, server} = require ('../src/app');
const request = require('supertest');
import TaxononmicGroups from '../src/models/taxonomic_groups'
import {getConnection} from '../src/utils'

describe('/', () => {
  test('GET', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200)
  });
})

describe('/data/taxonomic_groups', () => {
  beforeEach(async () => {
    const connection = getConnection();
    await connection.connect()
    const groupsRepo = connection.getRepository(TaxononmicGroups);
    await groupsRepo.clear()
    const groups = [{
      groupName: 'some-group',
      inPresentStudy: true,
      inTop30: false
    }, {
      groupName: 'some-group-2',
      inPresentStudy: false,
      inTop30: true
    }]
    const group1 = groupsRepo.create(groups[0]);
    await groupsRepo.save(group1)
    const group2 = groupsRepo.create(groups[1]);
    await groupsRepo.save(group2)
  })

  test('it returns all the data', async () => {
    const res = await request(app).get('/data/taxonomic_groups');
    expect(res.status).toBe(200)
    const expectedBody = {
      "data": [
        {
          "type": "taxonomic_groups",
          "id": 1,
          "attributes": {
            "group_name": "some-group",
            "in_present_study": false,
            "in_top_30": true
          }
        },
        {
          "type": "taxonomic_groups",
          "id": 2,
          "attributes": {
            "group_name": "some-group-2",
            "in_present_study": true,
            "in_top_30": false
          }
        }
      ]
    }
    expect(res.body).toEqual(expectedBody);
  })
});

afterAll(() => {
  server.close()
});
