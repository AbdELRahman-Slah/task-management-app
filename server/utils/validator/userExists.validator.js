const User = require("../../models/user.model");

const checkUserExists = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    return Promise.reject("User ID doesn't Exist");
  }

  return true;
};

module.exports = checkUserExists;
