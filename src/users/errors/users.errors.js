const HttpError = require('../../helpers/http.error');

class ServerError extends HttpError {
  constructor(message = 'Server Error') {
    super(500, message);
  }
}

class UserNotFound extends HttpError {
  constructor(message = 'User not found') {
    super(404, message);
  }
}

class UserWithIdAlreadyExists extends HttpError {
  constructor(message = 'User with that id already exists') {
    super(409, message);
  }
}

class InvalidUser extends HttpError {
  constructor(message = 'Bad User Data') {
    super(400, message);
  }
}

module.exports = {
  ServerError,
  UserNotFound,
  UserWithIdAlreadyExists,
  InvalidUser,
};
