module.exports =  { 
  Query: {
    me: () => {
      return models.me;
    },
    user: (parent, { id }, { models }) => {
      return models.users[id]
    },
    users: (parent, args, { models }) => {
      return Object.values(models.users);
    }
  },
  User: {
    item: (user, args, { models }) => {
      return Object.values(models.items).filter(item => item.userID === user.id)
    }
  }
};