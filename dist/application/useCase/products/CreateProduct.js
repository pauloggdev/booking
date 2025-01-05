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
const Product_1 = __importDefault(require("../../../domain/entities/Product"));
class CreateProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const registeredCompany = yield this.productRepository.findById(input.uuid);
            if (registeredCompany)
                throw new Error('Product already registered');
            const product = Product_1.default.create(input.name, input.priceBuy, input.price, input.iva, input.quantity, input.image);
            yield this.productRepository.save(product);
            return {
                productId: product.uuid,
                name: product.name
            };
        });
    }
}
exports.default = CreateProduct;
