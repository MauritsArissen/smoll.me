class NotFoundError extends Error {
  statusCode: number;
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class DuplicateError extends Error {
  statusCode: number;
  constructor(message) {
    super(message);
    this.name = "DuplicateError";
    this.statusCode = 409;
  }
}

class InvalidInputError extends Error {
  statusCode: number;
  constructor(message) {
    super(message);
    this.name = "InvalidInputError";
    this.statusCode = 400;
  }
}

class InternalServerError extends Error {
  statusCode: number;
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

export {
  NotFoundError,
  DuplicateError,
  InvalidInputError,
  InternalServerError,
};
