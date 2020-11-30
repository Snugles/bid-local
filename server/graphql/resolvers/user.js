module.exports =  { 
  Query: {
    me: () => {
      return me;
    },
    user: (parent, { id }, { models }) => {
      return users[id]
    },
    users: (parent, args, { models }) => {
      return Object.values(users);
    }
  },
  User: {
    item: (user, args, { models }) => {
      return Object.values(items).filter(item => item.userID === user.id)
    }
  }
};