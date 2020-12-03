exports.get_address_by_userId = async (_, { userId }, { models }) => {
  const item = await models.addresses.findOne({ where: { userId: userId } });
  return item;
};

exports.get_user_by_address = async (address, _, { models }) => {
  const user = await models.addresses.findOne({ where: { id: address.userId } });
  return user;
};

exports.get_addresses = async (_, __, { models }) => {
  const addresses = await models.addresses.findAll();
  return addresses;
};

exports.create_address = async (_, { userId, address }, { models }) => {
  console.log(address);
  const { firstLineAddress, secondLineAddress, city, postcode, country } = address;
  const newAddress = {
    firstLineAddress,
    secondLineAddress,
    city,
    postcode,
    country,
    userId, //make dynamic
  };
  const createdAddress = await models.addresses.create(newAddress);

  return createdAddress;
};

exports.update_address = async (_, { addressId, address }, { models }) => {
  console.log(_, addressId, address,);
  let addressDB = await models.addresses.findOne({ where: { id: addressId } });
  addressDB = Object.assign(addressDB, address);
  await addressDB.save();
  return addressDB;
};
