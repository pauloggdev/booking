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
const User_1 = __importDefault(require("../../domain/entities/User"));
const Company_1 = __importDefault(require("../../domain/entities/Company"));
class CreateCompany {
    constructor(companyRepository, userRepository) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const registeredCompany = yield this.companyRepository.findByNif(input.nif);
            if (registeredCompany)
                throw new Error('Company already registered');
            const company = Company_1.default.create(input.name, input.email, input.nif, input.foneNumber, input.address, input.regime, input.logo);
            yield this.companyRepository.save(company);
            const password = '123';
            const user = yield User_1.default.create(input.name, input.email, company.uuid, password, input.logo);
            yield this.userRepository.save(user);
            return {
                userId: user.uuid,
                companyId: company.uuid,
                email: company.email,
                nif: company.nif
            };
        });
    }
}
exports.default = CreateCompany;
