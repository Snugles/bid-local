
exports.get_user_by_email = async (_, { email }, { models }) => {
  try {
    const user = await models.users.findOne({where: { email: email }});
    return user;
  } catch (error) {
    console.error('Error', error);
  }
};

exports.get_users = async (_, __, { models }) => {
  try {
    const users = await models.users.findAll();
    if (!users) {
      return users;
    }
  } catch (error) {
    console.error('Error', error);
  }
  
};

exports.get_items = async (user, _, { models }) => {
  try {
    const items = await models.items.findAll({
      where: {
        userId: user.id
      }
    });
    return items;
  } 
  catch (error) {
    console.error('Error', error);
  }
  
};

exports.get_address = async (user, _, { models }) => {
  try {
    const address = await models.addresses.findOne({
      where: {
        userId: user.id
      }
    });
    return address;
  } 
  catch (error) {
    console.error('Error', error);
  }
};

exports.create_user = async (_, { email, password, firstName, lastName, phoneNumber }, { models }) => {
  try {
    const createdUser = await models.users.create({ email: email, password: password, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber });
    return createdUser;
  } catch (error) {
    console.error('Error', error);
  }
};