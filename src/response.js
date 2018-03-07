'use strict';

var _ = require('lodash');
var assert = require('./assert').assert;


/**
 * @class
 */
class Response {

    constructor(req, res) {
        assert.property(res, 'janus', 'Invalid response');
        this.request = req;
        this.response = res;
    }

    getRequest() {
        return this.request;
    }

    getResponse() {
        return this.response;
    }

    isSuccess() {
        return this.response.janus === 'success';
    }

    isError() {
        return this.response.janus === 'error' && _.has(this.response, 'error');
    }

    getErrorCode() {
        return _.get(this.response, 'error.code', null);
    }


    getErrorMessage() {
        return _.get(this.response, 'error.reason', null);
    }
}

module.exports.Response = Response;
