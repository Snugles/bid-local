const pubsub = require('../utils/PubSub.js');
console.log('PUBSUB output ', pubsub.publish);
exports.get_item_by_Id = async (_, { id }, { models }) => {
  const item = await models.items.findByPk(id);
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

exports.create_item = async (_, { userId, item }, { models }) => {  //from the context, for login (_, { text }, { models, me })
  const { name, minPrice, description, picUrl1, picUrl2, picUrl3, auctionEnd, categoryId } = item;
  try {
    const item = {
      name,
      minPrice,
      description,
      picUrl1,
      picUrl2,
      picUrl3,
      minimumBid: minPrice + 1,
      auctionEnd: Date.parse(auctionEnd),
      userId, //me.id
      categoryId,
    };
    const createdItem = await models.items.create(item);

    return createdItem;
  } catch (error) {
    console.error('Error', error);
    return error;
  }

};
exports.delete_item_by_id = async (_, { id }, { models }) => {
  try {
    const destroyed = await models.items.destroy({
      where: {
        id: id
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
  console.log('test');
  try {
    let itemDB = await models.items.findOne({ where: { id: itemId}});
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
  } catch (error) {
    console.error(error);
  }
};


