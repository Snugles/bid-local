const pubsub = require('../utils/pubsub');
console.log('PUBSUB output ', pubsub.publish);
exports.get_item_by_Id = async (_, { id }, { models }) => {
  console.log('Getting ITEM:',id);
  const item = await models.items.findByPk(id);
  console.log('Returning:',item);
  return item;
};

exports.get_items = async (_, __, { models }) => {
  const items = await models.items.findAll();
  return items;
};

exports.get_user_by_item = async (item, _, { models }) => {
  const user = await models.users.findOne({ where: { id: item.userId } });
  return user;
};

exports.get_category_by_Item = async (item, _, { models }) => {
  const user = await models.categories.findOne({ where: { id: item.categoryId } });
  return user;
};

exports.create_item = async (_, { item }, { models, me }) => {
  console.log('CREATING ITEM:',me);
  const { name, minPrice, description, picUrl1, picUrl2, picUrl3, categoryId } = item;
  try {
    const item = {
      name,
      minPrice,
      description,
      picUrl1,
      picUrl2,
      picUrl3,
      userId: me.id,
      minimumBid: minPrice + 1,
      auctionEnd: Date.parse(auctionEnd),
      categoryId,
    };
    const createdItem = await models.items.create(item);

    return createdItem;
  } catch (error) {
    console.error('Error', error);
    return error;
  }

};
exports.delete_item_by_id = async (_, { itemId }, { models }) => {
  try {
    const destroyed = await models.items.destroy({
      where: {
        id: itemId
      }
    });
    if (!destroyed) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error', error);
  }
};

exports.update_item = async (_, { itemId, item }, { models }) => {
  let itemDB = await models.items.findOne({ where: { id: itemId } });
  itemDB = Object.assign(itemDB, item);
  await itemDB.save();
  return itemDB;
};

exports.place_a_bid = async (_, { itemId, userId }, {models}) => {
  let itemDB = await models.items.findOne({ where: { id: itemId}});
  // console.log('test');
  // if (biddingPrice > itemDB.minimumBid) {
  //   itemDB.minimumBid++;
  //   itemDB.bidder = userId;
  // }

  itemDB.minimumBid++;
  itemDB.bidder = userId;

  pubsub.publish('bidPlaced', {
    bidPlaced: itemDB
  });

  await itemDB.save();
  return itemDB;
};


