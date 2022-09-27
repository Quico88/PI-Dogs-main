const { Breed, conn } = require('../../src/db.js');
const { expect } = require('chai');


const invalidDog1 = {
  weight: '45',
  height: '50'
}

const invalidDog2 = {
  name: 'Pluto',
  weight: '45'
}

const validDog = {
  name: 'PlutoReloaded',
  weight: '45',
  height: '50'
}

const detailedDog = {
  name: 'The Happy Dog',
  weight: '45 - 50',
  height: '50 - 60',
  life_span: '20',
  image_url: 'DogCoolPic'
}


describe('BREED MODEL', () => {
  beforeEach(async () => {
    await conn.sync({ force: true });
  });
  describe('Validators', () => {
    describe('General', () => {
      it('Should throw an error if name is not sent', async () => {
          try {
            await Breed.create(invalidDog1);
          } catch (error) {
            expect(error.message).to.be.a('string');
          }
      });
      it('Should throw an error if height is not sent', async () => {
        try {
          await Breed.create(invalidDog2);
        } catch (error) {
          expect(error.message).to.be.a('string');
        }
      })
      it('Should create the dog if mandatory fields are sent', async () => {
          const dog = await Breed.create(validDog);
          expect(dog.toJSON()).to.include({name: 'PlutoReloaded'});
      });
      it('Should automatically set home_grown_data property to true to every dog created', async () => {
        const dog = await Breed.create(validDog);
        expect(dog.toJSON()).to.include({home_grown_data: true});
      });
      it('New dog should have all fields when all data is passed', async () => {
        const dog = await Breed.create(detailedDog);
        expect(dog.toJSON()).to.have.keys(['name','weight','height','id','life_span','image_url','home_grown_data']);
      })
    });
  });
});
