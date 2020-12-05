const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable() => "categories", deps: []
 * createTable() => "users", deps: []
 * createTable() => "addresses", deps: [users]
 * createTable() => "items", deps: [users, categories]
 *
 */

const info = {
  revision: 1,
  name: 'noname',
  created: '2020-12-05T14:19:44.289Z',
  comment: '',
};

const migrationCommands = (transaction) => {
  return [
    {
      fn: 'createTable',
      params: [
        'categories',
        {
          id: { type: Sequelize.UUID, field: 'id', primaryKey: true },
          name: { type: Sequelize.STRING, field: 'name', unique: true },
          createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedAt',
            allowNull: false,
          },
        },
        { transaction },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'users',
        {
          id: { type: Sequelize.UUID, field: 'id', primaryKey: true },
          email: {
            type: Sequelize.STRING,
            field: 'email',
            unique: true,
            allowNull: false,
          },
          password: {
            type: Sequelize.TEXT,
            field: 'password',
            allowNull: false,
          },
          firstName: { type: Sequelize.TEXT, field: 'firstName' },
          lastName: { type: Sequelize.TEXT, field: 'lastName' },
          phoneNumber: { type: Sequelize.STRING(25), field: 'phoneNumber' },
          createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedAt',
            allowNull: false,
          },
        },
        { transaction },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'addresses',
        {
          id: { type: Sequelize.UUID, field: 'id', primaryKey: true },
          firstLineAddress: {
            type: Sequelize.TEXT,
            field: 'firstLineAddress',
            notEmpty: true,
          },
          secondLineAddress: {
            type: Sequelize.TEXT,
            field: 'secondLineAddress',
          },
          city: { type: Sequelize.STRING, field: 'city', notEmpty: true },
          postcode: {
            type: Sequelize.STRING,
            field: 'postcode',
            notEmpty: true,
          },
          country: { type: Sequelize.STRING, field: 'country', notEmpty: true },
          userId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: { model: 'users', key: 'id' },
            field: 'userId',
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedAt',
            allowNull: false,
          },
        },
        { transaction },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'items',
        {
          id: { type: Sequelize.UUID, field: 'id', primaryKey: true },
          name: { type: Sequelize.STRING, field: 'name', allowNull: false },
          minPrice: { type: Sequelize.INTEGER, field: 'minPrice', default: 0 },
          description: { type: Sequelize.TEXT, field: 'description' },
          picUrl1: { type: Sequelize.TEXT, field: 'picUrl1' },
          picUrl2: { type: Sequelize.TEXT, field: 'picUrl2' },
          picUrl3: { type: Sequelize.TEXT, field: 'picUrl3' },
          userId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: { model: 'users', key: 'id' },
            field: 'userId',
            allowNull: false,
          },
          categoryId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: { model: 'categories', key: 'id' },
            allowNull: true,
            field: 'categoryId',
          },
          createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedAt',
            allowNull: false,
          },
        },
        { transaction },
      ],
    },
  ];
};

const rollbackCommands = (transaction) => {
  return [
    {
      fn: 'dropTable',
      params: ['addresses', { transaction }],
    },
    {
      fn: 'dropTable',
      params: ['categories', { transaction }],
    },
    {
      fn: 'dropTable',
      params: ['items', { transaction }],
    },
    {
      fn: 'dropTable',
      params: ['users', { transaction }],
    },
  ];
};

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (this.useTransaction) {
    return queryInterface.sequelize.transaction(run);
  }
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) => {
    return execute(queryInterface, sequelize, migrationCommands);
  },
  down: (queryInterface, sequelize) => {
    return execute(queryInterface, sequelize, rollbackCommands);
  },
  info,
};
