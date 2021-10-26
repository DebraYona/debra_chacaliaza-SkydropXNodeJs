const formatResponse = (responseData = {}, extra = {}) => ({
  ...extra,
  data: responseData,
});

module.exports = {
  formatResponse,
};
