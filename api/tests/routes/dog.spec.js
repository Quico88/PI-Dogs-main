/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');

const agent = session(app);
const dog1 = {
  name: 'Tribilin',
  height: '30',
  weight: '45'
};

const dog2 = {
  name: 'Firulais',
  height: '40',
  weight: '50'
};

const dog3 = {
  name: 'LAzyDog',
  height: '50',
  weight: '60'
};

const dog4 = {
  name: 'FakeDog',
  height: '50',
};


describe('Dog routes ------ GET -----', () => {
  beforeEach(async () => {
    await conn.sync({ force: true });
  });
    describe('GET /', () => {
    it('responds with 200', () => agent.get('/dogs').expect(200));
    it('responds with an array', () =>
      agent.get('/dogs').then((res) => {
          expect(res.body).to.be.an('array');
      }));
    it('includes all breeds from the API on the response', () =>
      agent.get('/dogs').then((res) => {
          expect(res.body).to.have.lengthOf(172);
      }));
    it('includes breeds created by users in the response', async () => {
        await Breed.create(dog1);
        let res = await agent.get('/dogs');
        expect(res.body).to.have.lengthOf(173);
    })
    it('responds with details of a specific breed when name is passed by query', async () => {
        await Breed.create(dog2);
        let res = await agent.get('/dogs?name=firulais');
        expect(res.status).to.equal(200);
      });
      it('responds with respective error message when name passed by query does not exist', async () => {
        let res = await agent.get('/dogs?name=El Perrito Malvado');
        expect(res.error.text).to.equal('No breeds where found with the name: El Perrito Malvado');
      });
    })
  })


  describe('Dog routes ------ POST -----', () => {
        it('responds with 200 when a valid dog is passed', async () => {
          agent.post('/dogs',dog3).then((res) => {
            expect(res.status).to.be(200)
          })
        })
        it('responds with 404 when not all mandatory fields are passed', async () => {
          agent.post('/dogs',dog4).then((res) => {
            expect(res).to.be(200)
          })
        })
  });
