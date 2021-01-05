"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = void 0;
class BaseError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class ParseError extends BaseError {
    constructor(message) {
        super(message);
    }
}
exports.ParseError = ParseError;
//# sourceMappingURL=error.js.map