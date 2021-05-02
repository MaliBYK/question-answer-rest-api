//*-----[SEARCH]-----*\\
const searchHelper = (searchKey, query, req) => {
  const { search } = req.query;
  if (search) {
    const searchObject = {};
    const regex = new RegExp(search, "i");
    searchObject[searchKey] = regex;

    return query.where(searchObject);
  }

  return query;
};

//*-----[POPULATION]-----*\\
const populateHelper = (query, population) => {
  return query.populate(population);
};

//*-----[SORTING]-----*\\

const questionSortHelper = (query, req) => {
  const { sortBy } = req.query;
  if (sortBy === "most-answered") {
    query = query.sort("-answerCount");
  } else if (sortBy === "most-liked") {
    query = query.sort("-likeCount");
  } else if (sortBy !== "most-answered" || sortBy !== "most-liked") {
    query = query.sort("-createdAt");
  }
  return query;
};

//*-----[PAGINATION]-----*\\
const paginationHelper = async (total, query, req) => {
  const pagination = {};
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (startIndex > 0) pagination.previous = { page: page - 1, limit: limit };
  if (endIndex < total) pagination.next = { page: page + 1, limit: limit };

  return {
    query: query?.skip(startIndex).limit(limit),
    pagination: pagination,
    startIndex,
    limit,
  };
};

module.exports = {
  searchHelper,
  populateHelper,
  questionSortHelper,
  paginationHelper,
};
