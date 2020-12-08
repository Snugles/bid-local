/**
 * Note: Apollo server accepts promises and knows to wait
 * for the actual result from the database,
 * which makes all the async await irrelevant in some cases
 * but to be explicit it can remain.
 */
const jwt = require('jsonwebtoken');


exports.get_user_by_email = async (_, { email }, { models }) => {
  try {
    const user = await models.users.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    console.error('Error', error);
  }
};

exports.get_user_info = async (_,__, { models, me }) => {
  try {
    const user = await models.users.findByPk(me.id);
    return user;
  } catch (error) {
    console.error('Error', error);
  }
};

exports.get_users = async (_, __, { models }) => {
  try {
    const users = await models.users.findAll();
    return users;
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

exports.delete_user = async (_, { userId }, { models }) => {
  const destroyed = await models.users.destroy({
    where: {
      id: userId
    }
  });
  if (!destroyed) {
    return false;
  }
  return true;
};

exports.update_user = async (_, { user }, { models, me }) => {
  try {
    let userFound = await models.users.findOne({ where: { id: me.id } });
    if (userFound) {
      userFound = Object.assign(userFound, user);
      await userFound.save();
      return userFound;
    }
    else {
      return new Error('User doesn\'t exist');
    }
  } catch (error) {
    console.error('Error', error);
  }
};

exports.me = async (_, __, { models, me }) => { //placeholder for login
  if (!me) return null;
  try {
    return await models.users.findByPk(me.id);
  } catch (error) {
    console.error('Error', error);
  }
};

exports.create_user = async (_, { user }, { models }) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = user;
    const userFound = await models.users.findOne({ where: { email: email } });
    if (!userFound) {
      const createdUser = await models.users.create({ email: email, password: password, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber });
      return createdUser;
    }
    else {
      return new Error('There is alreary a user with this email');
    }
  } catch (error) {
    console.error('Error', error);
  }
};



exports.sign_up = async (_, { email, password }, { models, secret }) => {
  console.log('User Sign Up:');
  const user = await models.users.create({
    email: email,
    password: password,
  });

  console.log('SECRET:',secret);

  return { token: createToken(user, secret, '10h') };
};

exports.sign_in = async (_,{ email, password },{ models, secret }) => {
  console.log('User Sign in:');
  const user = await models.users.findByLogin(email);

  if (!user) {
    throw new UserInputError(
      'No user found with this email credentials.',
    );
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    throw new AuthenticationError('Invalid password.'); //probably want to give a more generic message for security
  }
  console.log('Returning Token:');
  return { token: createToken(user, secret, '10h') };
};

/**
 * Utility Functions
 */
const createToken = async (user, secret, expiresIn) => {
  const {id, email} = user;
  return await jwt.sign({id,email}, secret, {
    expiresIn,
  });
};