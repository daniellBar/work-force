const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  getByName,
  add,
};

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  const collection = await dbService.getCollection("user");
  try {
    const users = await collection.find(criteria).toArray();

    // users.forEach(user => delete user.password);
    return users;
  } catch (err) {
    console.log("ERROR: cannot find users");
    throw err;
  }
}

async function getByName(userName) {
  const collection = await dbService.getCollection("user");
  try {
    const user = await collection.findOne({ userName });
    return user;
  } catch (err) {
    console.log(`ERROR: while finding user ${userName}`);
    throw err;
  }
}

async function getByEmail(email) {
  const collection = await dbService.getCollection("user");
  console.log("collection-", collection);
  try {
    const user = await collection.findOne({ email });
    return user;
  } catch (err) {
    console.log(`ERROR: while finding user ${email}`);
    throw err;
  }
}

async function getById(userId) {
  const collection = await dbService.getCollection("user");
  try {
    const user = await collection.findOne({ _id: ObjectId(userId) });
    delete user.password;
    return user;
  } catch (err) {
    console.log(`ERROR: while finding user ${userId}`);
    throw err;
  }
}

async function remove(userId) {
  const collection = await dbService.getCollection("user");
  try {
    await collection.deleteOne({ _id: ObjectId(userId) });
  } catch (err) {
    console.log(`ERROR: cannot remove user ${userId}`);
    throw err;
  }
}

async function update(user) {
  const collection = await dbService.getCollection("user");
  user._id = ObjectId(user._id);

  try {
    await collection.replaceOne({ _id: user._id }, user);
    return user;
  } catch (err) {
    console.log(`ERROR: cannot update user ${user._id}`);
    throw err;
  }
}

async function add(user) {
  const collection = await dbService.getCollection("user");
  try {
    await collection.insertOne(user);
    return user;
  } catch (err) {
    console.log(`ERROR: cannot insert user`);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria = {};
  return criteria;
}
