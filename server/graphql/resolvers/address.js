exports.get_address_by_userId = async (_, { userId }, { models }) => {
  const address = await models.addresses.findOne({ where: { userId: userId } });
  return address;
};

exports.get_user_by_address = async (address, _, { models }) => {
  const user = await models.addresses.findOne({ where: { id: address.userId } });
  return user;
};

exports.get_addresses = async (_, __, { models }) => {
  const addresses = await models.addresses.findAll();
  return addresses;
};

exports.create_address = async (_, { address }, { models, me }) => {
  try {
    const userId = me.id;
    console.log('Checking if user has an address:', address);
    const DBaddress = await this.get_address_by_userId(_, { userId }, { models });

    if (!DBaddress) {
      const { firstLineAddress, secondLineAddress, city, postcode, country } = address;
      const newAddress = {
        firstLineAddress,
        secondLineAddress,
        city,
        postcode,
        country,
        userId: userId, //make dynamic
      };
      const createdAddress = await models.addresses.create(newAddress);

      return createdAddress;
    }
    error = new Error('Cannot create more than 1 address, use edit/update instead');
    return error;
  } catch (e) {
    return e;
  }
};

exports.update_address = async (_, { addressId, address }, { models }) => {
  let addressDB = await models.addresses.findOne({ where: { id: addressId } });
  addressDB = Object.assign(addressDB, address);
  await addressDB.save();
  return addressDB;
};
