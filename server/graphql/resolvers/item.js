const pubsub = require('../utils/PubSub');

exports.get_item_by_Id = async (_, { id }, { models }) => {
  console.log('Getting ITEM:', id);
  const item = await models.items.findByPk(id);
  console.log('Returning:', item);
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
  console.log('CREATING ITEM:', me);
  console.log('User Creating Item:', me);
  const { name, minPrice, description, picUrl1, picUrl2, picUrl3, auctionEnd, categoryId } = item;
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
    return error;
  }
};

exports.update_item = async (_, { itemId, item }, { models }) => {
  try {
    let itemDB = await models.items.findOne({ where: { id: itemId } });
    if (!itemDB) throw new Error('No item found');
    itemDB = Object.assign(itemDB, item);
    await itemDB.save();
    return itemDB;
  } catch (e) {
    return e.message;
  }
};

exports.place_a_bid = async (_, { itemId, userId, biddingPrice }, { models }) => {
  let itemDB = await models.items.findOne({ where: { id: itemId } });
  try {
    console.log('checking date');
    if (Date.parse(itemDB.auctionEnd) > Date.now()) {
      return { message: 'Bidding time over' };
    }
    console.log('checking Bidding');
    if (biddingPrice) {
      itemDB.minimumBid = itemDB.minimumBid + biddingPrice;
    }
    else {
      itemDB.minimumBid++;
    }
    console.log('Changing Values');
    itemDB.minimumBid++;
    itemDB.bidder = userId;

    console.log('Saving Values');
    await itemDB.save();

    console.log('Publishing');
    pubsub.publish('bidPlaced', {
      bidPlaced: itemDB
    });
    return itemDB;
  } catch (e) {
    return e;
  }
};


