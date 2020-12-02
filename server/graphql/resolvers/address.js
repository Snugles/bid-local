exports.address = async (_, { userId }, { models }) => {
  const item = await models.addresses.findOne({ where: { userId: userId } });
  return item;
};

exports.get_user = async (address, _, { models }) => {
  const user = await models.addresses.findOne({ id: address.userId });
  return user;
};

exports.createAddress = async (_, { firstLineAddress, secondLineAddress, city, postcode, country, userId }, { models }) => {
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
