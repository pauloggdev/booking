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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PasswordUtils_1 = require("../../helpers/PasswordUtils");
class User {
    constructor(uuid, name, email, password, companyId, image) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.password = password;
        this.companyId = companyId;
        this.image = image;
        this.roles = [];
    }
    static create(name, email, companyId, password, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const uniqueId = (0, uuid_1.v4)();
            const hashPass = yield (0, PasswordUtils_1.hashPassword)(password);
            return new User(uniqueId, name, email, hashPass, companyId, image);
        });
    }
    addRole(role) {
        if (!this.roles.includes(role)) {
            this.roles.push(role);
        }
    }
    hasPermission(permissionName) {
        return this.roles.some(role => role.hasPermission(permissionName));
    }
}
exports.default = User;
