"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class VerifyToken {
    static isValid(token) {
        try {
            const secretkey = process.env.SECRETKEY || "!@$¨&ASDFG";
            jsonwebtoken_1.default.verify(token, secretkey);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = VerifyToken;
