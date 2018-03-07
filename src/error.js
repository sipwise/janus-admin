'use strict';

var assert = require('./assert').assert;

/**
 * @class
 */
class ResponseError extends Error {

    constructor(res) {
        super();
        assert.equal(res.isError(), true, 'No error found in response');
        this.name = this.constructor.name;
        this.message = res.getErrorMessage();
        this.code = res.getErrorCode();
        this.response = res;
    }
}

module.exports.ResponseError = ResponseError;
