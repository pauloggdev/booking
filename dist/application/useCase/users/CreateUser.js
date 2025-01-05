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
const User_1 = __importDefault(require("../../../domain/entities/User"));
class CreateUser {
    constructor(userRepository, companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const registeredCompany = yield this.userRepository.findByEmail(input.email);
            if (registeredCompany)
                throw new Error('User already registered');
            const company = yield this.companyRepository.findById(input.companyId);
            if (!company)
                throw new Error("company not found");
            const user = yield User_1.default.create(input.name, input.email, input.companyId, input.password, input.image);
            const output = yield this.userRepository.save(user);
            return {
                uuid: output.uuid,
                name: input.name,
                email: input.email,
                companyId: input.companyId,
                image: input.image,
            };
        });
    }
}
exports.default = CreateUser;
