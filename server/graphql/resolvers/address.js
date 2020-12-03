exports.get_address_by_userId = async (_, { userId }, { models }) => {
  const item = await models.addresses.findOne({ where: { userId: userId } });
  return item;
};

exports.get_user_by_address = async (address, _, { models }) => {
  const user = await models.addresses.findOne({ id: address.userId });
  return user;
};

exports.create_address = async (_, { firstLineAddress, secondLineAddress, city, postcode, country, userId }, { models }) => {
  const address = {
    firstLineAddress,
    secondLineAddress,
    city,
    postcode,
    country,
    userId, //make dynamic
  };
  const createdAddress = await models.addresses.create(address);

  return createdAddress;
};
