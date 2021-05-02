const {
  populateHelper,
  paginationHelper,
} = require("./queryMiddlewareHelpers");

const answerQueryMiddleware = (model, options) => {
  return async (req, res, next) => {
    const { id } = req.params;

    const total = (await model.findById(id))["answerCount"];

    const paginationResult = await paginationHelper(total, undefined, req);
    const startIndex = paginationResult.startIndex;
    const limit = paginationResult.limit;

    const arrayName = "answers";
    let queryObject = {};
    queryObject[arrayName] = { $slice: [startIndex, limit] };

    let query = model.find({ _id: id }, queryObject);

    query = populateHelper(query, options.population);
    const queryResults = await query;

    res.queryResult = {
      success: true,
      pagination: paginationResult.pagination,
      data: queryResults,
    };
    next();
  };
};

module.exports = answerQueryMiddleware;
