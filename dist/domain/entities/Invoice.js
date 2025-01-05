"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Invoice {
    constructor(uuid, total, discountPercent, ivaPercent, clientName, clientAddress) {
        this.uuid = uuid;
        this.total = total;
        this.discountPercent = discountPercent;
        this.ivaPercent = ivaPercent;
        this.clientName = clientName;
        this.items = [];
    }
    static create(total, discountPercent, ivaPercent, clientName, clientAddress) {
        const uuidId = (0, uuid_1.v4)();
        return new Invoice(uuidId, total, discountPercent, ivaPercent, clientName, clientAddress);
    }
    addItem(item) {
        this.items.push(item);
    }
    getTotalDescont() {
        return (this.total * this.discountPercent) / 100;
    }
    getTotalIva() {
        return (this.total * this.ivaPercent) / 100;
    }
}
exports.default = Invoice;
