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
const { check, validationResult } = require('express-validator');
const app_1 = require("../../app");
const CreateUser_1 = __importDefault(require("../../application/useCase/users/CreateUser"));
class UserController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            // try {
            const createUser = new CreateUser_1.default(app_1.userRepository, app_1.companyRepository);
            const outputCreateUser = yield createUser.execute(req.body);
            res.status(200).json(outputCreateUser);
            // } catch (error: any) {
            //   res.status(500).json({ error: error.message });
            //}
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield app_1.userRepository.getAll();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
UserController.validationRules = [
    check('email').not().isEmpty().withMessage('campo obrigatório'),
    check('password').not().isEmpty().withMessage('campo obrigatório')
];
exports.default = UserController;
