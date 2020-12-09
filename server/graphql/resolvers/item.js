const pubsub = require('../utils/PubSub.js');

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

exports.create_item = async (_, { item }, { models, me }) => {
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

exports.place_a_bid = async (_, { itemId, biddingPrice }, { models, me }) => {
  console.log(biddingPrice);
  let itemDB = await models.items.findOne({ where: { id: itemId } });
  try {
    // Checking date
    if (Date.parse(itemDB.auctionEnd) < Date.now()) {
      throw new Error('Bidding time is over!');
    }

    // Checking Bidding
    if (biddingPrice) {
      itemDB.minimumBid = itemDB.minimumBid + biddingPrice;
    }
    else {
      itemDB.minimumBid++;
    }

    // Changing Bidder
    itemDB.bidder = me.id;

    // Saving Values
    await itemDB.save();

    // Publishing
    pubsub.publish('bidPlaced', {
      bidPlaced: itemDB
    });
    return itemDB;
  } catch (e) {
    return e;
  }
};

exports.won_item_list = async (_, __, { models, me }) => {
  const wonItem = await models.items.findAll(
    { where: { 
      bidder: me.id,
      auctionTime: Date.parse(itemDB.auctionEnd) < Date.now()
    } 
    });
  return wonItem;
};


