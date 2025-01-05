"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Role {
    constructor(uuid, name, companyId) {
        this.uuid = uuid;
        this.name = name;
        this.companyId = companyId;
        this.permissions = [];
    }
    static create(name, companyId) {
        const uniqueId = (0, uuid_1.v4)();
        return new Role(uniqueId, name, companyId);
    }
    addPermission(permission) {
        if (!this.permissions.includes(permission)) {
            this.permissions.push(permission);
        }
    }
    hasPermission(permissionName) {
        return this.permissions.some(permission => permission.name === permissionName);
    }
}
exports.default = Role;
