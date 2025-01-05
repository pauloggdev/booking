"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = exports.userRepository = exports.companyRepository = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const fileUpload = require('express-fileupload');
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const CompanyRepositoryMemory_1 = __importDefault(require("./infrastructure/CompanyRepositoryMemory"));
const UserRepositoryMemory_1 = __importDefault(require("./infrastructure/UserRepositoryMemory"));
const CreateCompanyController_1 = __importDefault(require("./controllers/company/CreateCompanyController"));
const LoginWitnCompanyController_1 = __importDefault(require("./controllers/login/LoginWitnCompanyController"));
const UserController_1 = __importDefault(require("./controllers/user/UserController"));
const ProductRepositoryMemory_1 = __importDefault(require("./infrastructure/ProductRepositoryMemory"));
const CreateProductController_1 = __importDefault(require("./controllers/product/CreateProductController"));
const GetProductController_1 = __importDefault(require("./controllers/product/GetProductController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(fileUpload());
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('index', { title: 'Meu App Express com TypeScript e EJS' });
});
const companyRepository = new CompanyRepositoryMemory_1.default();
exports.companyRepository = companyRepository;
const userRepository = new UserRepositoryMemory_1.default();
exports.userRepository = userRepository;
const productRepository = new ProductRepositoryMemory_1.default();
exports.productRepository = productRepository;
app.post('/createcompany', CreateCompanyController_1.default.validationRules, CreateCompanyController_1.default.execute);
app.post('/login', LoginWitnCompanyController_1.default.validationRules, LoginWitnCompanyController_1.default.execute);
//users
app.get('/users', UserController_1.default.getAll);
app.post('/createuser', UserController_1.default.create);
//products
app.post('/createproduct', CreateProductController_1.default.validationRules, CreateProductController_1.default.execute);
app.get('/products', GetProductController_1.default.getAll);
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
exports.server = server;
