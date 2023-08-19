const server = require('../index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('User Endpoints', () => {

  it('/user should show all users', async () => {
    const res = await requestWithSupertest.post('/login').send({
      "email": "hello@gmail.com",
      "password": "testpassword"
    });
    // console.log('res', res.statusCode)
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('token')
  });


  it('should thorw an errort when passwrod is missing', async () => {
    const res = await requestWithSupertest.post('/login').send(
      {
        "email": "hello@gmail.com"
      }
    );
    expect(res.status).toEqual(400);
    expect(res.body.err).toEqual('email or passwoprd missing')
    expect(res.body).toHaveProperty('token')
  });


});