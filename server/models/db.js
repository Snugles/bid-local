let users = {
  1: {
    id: '2',
    username: 'Madhu',
    itemIds: [1]
  },
  2: {
    id: '3',
    username: 'Nitu',
    itemIds: [2]
  }
};

let items = {
  1: {
    id: '1',
    name: 'Chair',
    userID: '2'
  },
  2: {
    id: '2',
    name: 'Table',
    userID: '3'
  }
}

module.exports = {
  users,
  items
}