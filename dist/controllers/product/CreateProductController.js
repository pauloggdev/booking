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
const express_validator_1 = require("express-validator");
const app_1 = require("../../app");
const CreateProduct_1 = __importDefault(require("../../application/useCase/products/CreateProduct"));
class CreateProductController {
    static execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            try {
                const createproduct = new CreateProduct_1.default(app_1.productRepository);
                const outputCreateProduct = yield createproduct.execute(req.body);
                res.status(200).json(outputCreateProduct);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
CreateProductController.validationRules = [
    (0, express_validator_1.check)('name').not().isEmpty().withMessage('campo obrigatório'),
    (0, express_validator_1.check)('priceBuy').not().isEmpty().withMessage('campo obrigatório'),
    (0, express_validator_1.check)('price').not().isEmpty().withMessage('campo obrigatório'),
];
exports.default = CreateProductController;
