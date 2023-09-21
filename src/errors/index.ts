export class SystemError extends Error {
  private _code?: number;

  private _errors?: object | Array<any>;

  get code(): number | undefined {
    return this._code;
  }

  get errors(): object | Array<any> | undefined {
    return this._errors;
  }

  constructor(
    code: number,
    message: string = 'An error occured.',
    errors?: object | Array<any>,
  ) {
    super(message); // 'Error' breaks prototype chain here
    this._code = code || 500;
    this.message = message;
    this._errors = errors;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export class ApplicationError extends SystemError {
  constructor(code: number, message: string, errors?: object | Array<any>) {
    super(code, message, errors);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends SystemError {
  constructor(message?: string) {
    super(404, message || 'Resource not found.');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ConflictError extends SystemError {
  constructor(message: string) {
    super(409, message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnauthorizedError extends SystemError {
  constructor(message?: string) {
    super(401, message || 'You are not authorized to access this resource.');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends SystemError {
  constructor(message?: string) {
    super(400, message || 'Bad request.');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ForbiddenError extends SystemError {
  constructor(message?: string) {
    super(403, message || 'Access denied.');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
