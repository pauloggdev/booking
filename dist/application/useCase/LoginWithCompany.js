"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PasswordUtils_1 = require("../../helpers/PasswordUtils");
class LoginWithCompany {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.email || !input.password)
                throw new Error("Provide email or password field");
            const user = yield this.userRepository.findByEmail(input.email);
            if (!user)
                throw new Error("User not found");
            const isMatch = yield (0, PasswordUtils_1.comparePasswords)(input.password, user.password);
            if (!isMatch)
                throw new Error("not authenticated");
            const secretkey = process.env.SECRETKEY || "!@$¨&ASDFG";
            const token = jsonwebtoken_1.default.sign({ userId: user.uuid }, secretkey, { expiresIn: '1h' });
            return {
                token: token
            };
        });
    }
}
exports.default = LoginWithCompany;
