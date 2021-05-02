const { searchHelper, paginationHelper } = require("./queryMiddlewareHelpers");

const userQueryMiddleware = (model, options) => {
  return async (req, res, next) => {
    let query = model.find();

    query = searchHelper("name", query, req);
    const total = await model.countDocuments();
    const paginationResult = await paginationHelper(total, query, req);
    query = paginationResult.query;
    const pagination = paginationResult.pagination;

    const queryResult = await query;
    res.queryResult = {
      success: true,
      count: queryResult.length,
      pagination: pagination,
      data: queryResult,
    };
    next();
  };
};

module.exports = userQueryMiddleware;
