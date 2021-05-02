const {
  searchHelper,
  populateHelper,
  questionSortHelper,
  paginationHelper,
} = require("./queryMiddlewareHelpers");
const questionQueryMiddleware = (model, options) => {
  return async (req, res, next) => {
    let query = model.find();

    // Search
    query = searchHelper("title", query, req);
    // Population
    if (options?.population) query = populateHelper(query, options.population);
    //Sort
    query = questionSortHelper(query, req);
    //Pagination
    const total = await model.countDocuments();
    const paginationResult = await paginationHelper(total, query, req);
    query = paginationResult.query;
    const pagination = paginationResult.pagination;

    //*Result
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

module.exports = questionQueryMiddleware;
