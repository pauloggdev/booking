"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RolePermission {
    constructor(roleId, permissionId) {
        this.roleId = roleId;
        this.permissionId = permissionId;
    }
    static create(roleId, permissionId) {
        return new RolePermission(roleId, permissionId);
    }
}
exports.default = RolePermission;
