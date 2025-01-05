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
const app_1 = require("../../app");
const CreateCompany_1 = __importDefault(require("../../application/useCase/CreateCompany"));
const { check, validationResult } = require('express-validator');
class CreateCompanyController {
    static execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            try {
                const createCompany = new CreateCompany_1.default(app_1.companyRepository, app_1.userRepository);
                const outputCreateCompany = yield createCompany.execute(req.body);
                res.status(200).json(outputCreateCompany);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
CreateCompanyController.validationRules = [
    check('name').not().isEmpty().withMessage('campo obrigatório'),
    check('email').not().isEmpty().withMessage('campo obrigatório'),
    check('nif').not().isEmpty().withMessage('campo obrigatório'),
    check('foneNumber').not().isEmpty().withMessage('campo obrigatório'),
    check('address').not().isEmpty().withMessage('campo obrigatório'),
    check('regime').not().isEmpty().withMessage('campo obrigatório'),
    check('file')
        .custom((value, { req }) => {
        if (req.files) {
            const file = req.files.logo;
            const allowedTypes = [
                'image/jpeg', // para imagens JPEG/JPG
                'image/png', // para imagens PNG
                'image/bmp', // para imagens BMP
                'image/webp', // para imagens WEBP
                'image/tiff', // para imagens TIFF
            ];
            if (!Array.isArray(file)) {
                if (!allowedTypes.includes(file.mimetype)) {
                    throw new Error('Formato da imagem inválido.');
                }
                if (file.size > 30 * 1024) { // 30KB
                    throw new Error('A imagem deve ter no máximo 30KB');
                }
                return true;
            }
        }
    })
];
exports.default = CreateCompanyController;
