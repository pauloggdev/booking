"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Permission {
    constructor(uuid, name, companyId) {
        this.uuid = uuid;
        this.name = name;
        this.companyId = companyId;
    }
    static create(name, companyId) {
        const uniqueId = (0, uuid_1.v4)();
        return new Permission(uniqueId, name, companyId);
    }
}
exports.default = Permission;
