"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    static badRequest(paramName) {
        return {
            statusCode: 400
        };
    }
    static serverError() {
        return {
            statusCode: 500
        };
    }
    static unauthorized() {
        return {
            statusCode: 401,
        };
    }
}
exports.default = HttpResponse;
