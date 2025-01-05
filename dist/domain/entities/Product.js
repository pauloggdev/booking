"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Product {
    constructor(uuid, name, priceBuy, price, iva = 0, quantity = 0, image) {
        this.uuid = uuid;
        this.name = name;
        this.priceBuy = priceBuy;
        this.price = price;
        this.iva = iva;
        this.quantity = quantity;
        this.image = image;
    }
    static create(name, priceBuy, price, iva, quantity, image) {
        const uuidId = (0, uuid_1.v4)();
        return new Product(uuidId, name, priceBuy, price, iva, quantity, image);
    }
    getPvp() {
        return ((this.price * this.iva) / 100) + this.price;
    }
}
exports.default = Product;
