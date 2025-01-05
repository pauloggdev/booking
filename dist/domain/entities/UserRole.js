"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRole {
    constructor(userId, roleId) {
        this.userId = userId;
        this.roleId = roleId;
        this.permissions = [];
    }
    static create(userId, roleId) {
        return new UserRole(userId, roleId);
    }
}
exports.default = UserRole;
