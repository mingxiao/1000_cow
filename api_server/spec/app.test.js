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
  let jsonMock;

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
    jsonMock = jest.fn()
    TaxononmicGroups.toJSONAPI = jsonMock
  })

  test('it returns all the data', async () => {
    const res = await request(app).get('/data/taxonomic_groups');
    expect(res.status).toBe(200)
    expect(res.body.data.length).toEqual(2)
    expect(res.body).toEqual(expect.objectContaining({
      links: {
        self: '/taxonomic_groups'
      },
      data: expect.any(Array)
    }))
  })
});

afterAll(() => {
  server.close()
});
