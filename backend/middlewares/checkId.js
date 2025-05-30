const { isValidObjectId } = require("mongoose");

const checkId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    throw new Error(`Invalid provided object id for ${req.params.id}`);
  }
  next();
};

module.exports = checkId;
