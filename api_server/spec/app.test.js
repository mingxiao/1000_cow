const {app, server} = require ('../built/app');
const request = require('supertest');

describe('/', () => {
  test('GET', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200)
  });
})

describe('/data', () => {
  describe('when the table exists', () => {
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
              "presence": false,
              "inTop30": true
            }
          },
          {
            "type": "taxonomic_groups",
            "id": 2,
            "attributes": {
              "group_name": "some-group-2",
              "presence": true,
              "inTop30": false
            }
          }
        ]
      }
      expect(res.body).toEqual(expectedBody);
    })
  })

  describe('when the table does not exist', () => {
    test('it returns 400 with error message', async () => {
      const res = await request(app).get('/data?table_name=non_exist');
      expect(res.status).toBe(400)
      const expectedBody = {
        "errors": [{
          "title": "Unknown Table",
          "detail": `Unknown Table: non_exist`
        }]
      };
      expect(res.body).toEqual(expectedBody);
    })
  })

  describe('when db connection fails', () => {
    // TODO simulate database error
    xtest('it returns 403 with error body', async () => {
      const res = await request(app).get('/data');

      expect(res.status).toBe(403)
      const expectedBody = {
        "errors": [{
          "title": "Database Unreachable",
          "detail": "Could not establish connection to the database"
        }]
      };
      expect(res.body).toEqual(expectedBody);
    });
  });

});

afterAll(() => {
  server.close()
});
