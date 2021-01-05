class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ParseError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}
