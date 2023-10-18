const Users = require('../model/auth/Auth');

exports.findUserDetails = async (email) => {
  const findUser = await Users.findOne({ email: email });
  return findUser;
};

exports.createNewUser = async (payload) => {
  const createdUser = await Users.create(payload);
  return createdUser;
};
exports.getAllUser = async () => {
  const allUser = await Users.find();
  return allUser;
};
exports.getSingleUser = async (email) => {
  const singleUser = await Users.findOne({ email: email });
  return singleUser;
};
exports.updateUser = async (id, payload) => {
  const updateUser = await Users.findByIdAndUpdate({ _id: id }, payload);
  return updateUser;
};
exports.deleteUser = async (id) => {
  const findUser = await Users.findByIdAndDelete(id);
  return findUser;
};

exports.findUserById = async (id) => {
  const deleteUser = await Users.findOne({ _id: id });
  return deleteUser;
};
