const isValidId = (id) => {
  const positiveIntegerMatcher = /^\d+/g;
  return positiveIntegerMatcher.test(String(id)) && Number(id) > 0;
};

const isValidUrl = (url) => {
  const validUrlMatcher =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  return typeof url === 'string' && validUrlMatcher.test(url);
};

const isValidEmail = (email) => {
  const validEmailMatcher = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;
  return typeof email === 'string' && validEmailMatcher.test(email);
};
const isValidUser = (data) => {
  const { company, email, first_name, last_name, url, text } = data;

  return (
    typeof company === 'string' &&
    isValidEmail(email) &&
    typeof first_name === 'string' &&
    typeof last_name === 'string' &&
    isValidUrl(url) &&
    typeof text === 'string'
  );
};

const isValidOrder = (s) => s === 'ASC' || s === 'DESC';
const isValidSortBy = (s) =>
  ['id', 'email', 'first_name', 'last_name', 'company', 'url', 'text'].includes(
    s,
  );

module.exports = {
  isValidId,
  isValidUrl,
  isValidEmail,
  isValidUser,
  isValidOrder,
  isValidSortBy,
};
