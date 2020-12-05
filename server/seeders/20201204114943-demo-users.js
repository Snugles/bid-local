'use strict';

const faker = require('faker');

function randNumb (max) {
  return Math.floor(Math.random()*max);
}

const numItems = 15;

const users = [...Array(numItems)].map((user) => (
  {
    id: faker.random.uuid(),
    email: faker.internet.email(),
    password: `${faker.internet.password(8)}`,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: `${faker.phone.phoneNumber()}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

const categories = [
  { id: faker.random.uuid(), name: 'FURNITURE', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'ANIMALS', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'PLANTS', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'KITCHEN', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'CARS', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'CLOTHES', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'FOOD', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'BEAUTY', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'BABY', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'ELECTRONICS', createdAt: new Date(), updatedAt: new Date() },
  { id: faker.random.uuid(), name: 'SPORTS', createdAt: new Date(), updatedAt: new Date() },
];

const items = [...Array(numItems)].map((item, index) => (
  {
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    minPrice: parseInt(faker.commerce.price(), 10),
    description: faker.commerce.productDescription(),
    picUrl1: faker.image.image(),
    picUrl2: faker.image.image(),
    picUrl3: faker.image.image(),
    userId: users[randNumb(numItems)].id,
    categoryId: categories[randNumb(10)].id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

const addresses = [...Array(numItems)].map((address, index) => (
  {
    id: faker.random.uuid(),
    firstLineAddress: faker.address.streetAddress(),
    secondLineAddress: faker.address.secondaryAddress(),
    city: faker.address.city(),
    postcode: `${faker.address.zipCode()}`,
    country: faker.address.country(),
    userId: users[index].id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

module.exports = {

  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkInsert('users', users, {}),
      await queryInterface.bulkInsert('categories', categories, {}),
      await queryInterface.bulkInsert('items', items, {}),
      await queryInterface.bulkInsert('addresses', addresses, {})
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkDelete('users', users, {}),
      await queryInterface.bulkDelete('categories', categories, {}),
      await queryInterface.bulkDelete('items', items, {}),
      await queryInterface.bulkDelete('addresses', addresses, {})
    ]);
  }
};

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   down: async (queryInterface, Sequelize) => {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
