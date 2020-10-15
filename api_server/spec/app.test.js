const {app, server} = require ('../built/app');
const request = require('supertest');
import {createConnection} from "typeorm";
import TaxononmicGroups from '../built/models/taxonomic_groups'

const connectOpts = {
  type: 'sqlite',
  database: '/tmp/db.sqlite',
  entities: [TaxononmicGroups],
  logging: true
}

describe('/', () => {
  test('GET', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200)
  });
})

describe('/data/taxonomic_groups', () => {
  beforeEach(async () => {
    const connection = await createConnection(connectOpts);
    await connection.synchronize()
    const groupsRepo = connection.getRepository(TaxononmicGroups);
    const groupArgs = {
      groupName: 'some-group',
      inPresentStudy: true,
      inTop30: false
    }
    groupsRepo.create(groupArgs);
    await connection.synchronize()
    const all = await groupsRepo.find()
    console.log({all})
  })

  test('it returns all the data', async () => {
    const res = await request(app).get('/data?table_name=taxonomic_groups');
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
