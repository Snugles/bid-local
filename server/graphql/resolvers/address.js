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

exports.update_address = async (_,{addressId,modAddress},{models}) => {

}

async updateCatcall(_, { id, catcall }, context) {
  if (context.mod._id) {

    if (await Moderator.findOne({ _id: context.mod._id })) {

      let entry = await Catcall.findOne({ _id: id });
      const {properties} = catcall;
      let newEntry = Object.assign(entry.properties,properties);
      entry.properties = newEntry;
      await entry.save();
      return entry
    }
  }
  let err = new Error;
  err.message = 'You must be logged in as a moderator to see this content';
  return err;
}
