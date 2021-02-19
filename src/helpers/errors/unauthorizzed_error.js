const { UNAUTHORIZED } = require("../status_code");

module.exports = class UnauthorrizedError extends Error {
    constructor(title, description, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorrizedError);
        }

        this.name = `UnauthorrizedError: ${title}`;
        this.status = UNAUTHORIZED;
        this.title = title;
        this.description = description;
    }
}