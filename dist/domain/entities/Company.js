"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Regime_1 = require("./Regime");
class Company {
    constructor(uuid, name, email, nif, foneNumber, address, regime, logo) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.nif = nif;
        this.foneNumber = foneNumber;
        this.address = address;
        this.regime = regime;
        this.logo = logo;
    }
    static create(name, email, nif, foneNumber, address, regime, logo) {
        const uniqueId = (0, uuid_1.v4)();
        return new Company(uniqueId, name, email, nif, foneNumber, address, regime, logo);
    }
    isIvaApplicable() {
        return this.regime === Regime_1.Regime.Geral;
    }
}
exports.default = Company;
