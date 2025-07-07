const List = require("../../models/list.model");

const checkListExist = async (id) => {
  const list = await List.findById(id);

  if (!list) {
    return Promise.reject("List ID is not Exits");
  }

  return true;
};

module.exports = checkListExist