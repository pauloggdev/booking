import express, { Request, Response, NextFunction } from 'express'
const fileUpload = require('express-fileupload');
import dotenv from 'dotenv'
const cors = require('cors');
import path from 'path'
import CompanyRepositoryMemory from './infrastructure/memory/CompanyRepositoryMemory'
import TransactionRepositoryMemory from './infrastructure/memory/TransactionRepositoryMemory'
import UserRepositoryMemory from './infrastructure/memory/UserRepositoryMemory'
import InvoiceRepositoryMemory from './infrastructure/memory/InvoiceRepositoryMemory'
import CreateCompanyController from './controllers/company/CreateCompanyController'
import CreateReceiptController from './controllers/receipt/CreateReceiptController'
import GetCompanyController from './controllers/company/GetCompanyController'
import UpdateCompanyController from './controllers/company/UpdateCompanyController'
import LoginWithCompanyController from './controllers/login/LoginWitnCompanyController'
import CreateDepositBalanceController from './controllers/deposit/CreateDepositBalanceController'
import authenticateToken from './middlewares/AuthenticateToken'
import CreateUserController from './controllers/user/CreateUserController'
import GetUserController from './controllers/user/GetUserController'
import UpdateUserController from './controllers/user/UpdateUserController'
import ProductRepositoryMemory from './infrastructure/memory/ProductRepositoryMemory'
import CreateProductController from './controllers/product/CreateProductController'
import UpdateProductController from './controllers/product/UpdateProductController'
import GetProductController from './controllers/product/GetProductController'
import MysqlConnection from './infrastructure/MysqlConnection';
import ProductRepositoryDatabase from './infrastructure/database/ProductRepositoryDatabase';
import CompanyRepositoryDatabase from './infrastructure/database/CompanyRepositoryDatabase';
import UserRepositoryDatabase from './infrastructure/database/UserRepositoryDatabase';
import InvoiceRepositoryDatabase from './infrastructure/database/InvoiceRepositoryDatabase';
import DepositBalanceRepositoryDatabase from './infrastructure/database/DepositBalanceRepositoryDatabase';
import DocumentFeeRepositoryDatabase from './infrastructure/database/DocumentFeeRepositoryDatabase';
import TokenRepositoryDatabase from './infrastructure/database/TokenRepositoryDatabase';
import TransactionRepositoryDatabase from './infrastructure/database/TransactionRepositoryDatabase'
import ReceiptRepositoryDatabase from './infrastructure/database/ReceiptRepositoryDatabase'
import ReceiptRepositoryMemory from './infrastructure/memory/ReceiptRepositoryMemory'

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger.json'
import CreateTransactionController from './controllers/transaction/CreateTransactionController';
import CreateInvoiceController from './controllers/invoice/CreateInvoiceController';
import CreateCustomerController from './controllers/customer/CreateCustomerController';
import UpdateCustomerController from './controllers/customer/UpdateCustomerController';
import CustomerRepositoryDatabase from './infrastructure/database/CustomerRepositoryDatabase';
import CustomerRepositoryMemory from './infrastructure/memory/CustomerRepositoryMemory';
import DepositBalanceRepositoryMemory from './infrastructure/memory/DepositBalanceRepositoryMemory';
import CreateValidatePaymentController from './controllers/payment/CreateValidatePaymentController';
import UpdateDocumentFeeController from './controllers/documentoFees/UpdateDocumentFeeController';
import DocumentFeeRepositoryMemory from './infrastructure/memory/DocumentFeeRepositoryMemory';
import TokenRepositoryMemory from './infrastructure/memory/TokenRepositoryMemory';
import { NodemailerEmailService } from './infrastructure/services/NodemailerEmailService';
import PasswordRecoveryController from './controllers/password-recovery/PasswordRecoveryController';
import { EmailService } from './domain/services/EmailService';

dotenv.config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Rodando api invoicing' })
})
const connection = new MysqlConnection('localhost', 'root', 'root', 'invoicing');

const production = true;
let companyRepository:any;
let userRepository:any;
let productRepository:any;
let customerRepository:any;
let invoiceRepository:any;
let depositBalanceRepository:any;
let documentFeeRepository:any;
let tokenRepository:any;
let emailService:any;
let transactionRepository:any;
let receiptRepository:any

class MockEmailService implements EmailService{
  async send(email: { to: string; subject: string; body: string; }): Promise<void> {
    console.log('Send email');
  }
}

if(production){
  companyRepository = new CompanyRepositoryDatabase(connection);
  userRepository = new UserRepositoryDatabase(connection);
  productRepository = new ProductRepositoryDatabase(connection);
  customerRepository = new CustomerRepositoryDatabase(connection);
  invoiceRepository = new InvoiceRepositoryDatabase(connection);
  depositBalanceRepository = new DepositBalanceRepositoryDatabase(connection);
  documentFeeRepository = new DocumentFeeRepositoryDatabase(connection);
  tokenRepository = new TokenRepositoryDatabase(connection);
  transactionRepository = new TransactionRepositoryDatabase(connection);
  receiptRepository = new ReceiptRepositoryDatabase(connection);
  //emailService = new NodemailerEmailService()
  emailService = new MockEmailService()
  
}else{
  companyRepository = new CompanyRepositoryMemory();
  userRepository = new UserRepositoryMemory();
  productRepository = new ProductRepositoryMemory();
  customerRepository = new CustomerRepositoryMemory();
  invoiceRepository = new InvoiceRepositoryMemory();
  depositBalanceRepository = new DepositBalanceRepositoryMemory();
  documentFeeRepository = new DocumentFeeRepositoryMemory();
  tokenRepository = new TokenRepositoryMemory();
  transactionRepository = new TransactionRepositoryMemory();
  receiptRepository = new ReceiptRepositoryMemory();

  //emailService = new NodemailerEmailService();
  emailService = new MockEmailService()

  
}

app.post('/createcompany', CreateCompanyController.validationRules, CreateCompanyController.execute);
app.put('/updatecompany/:uuid', authenticateToken, UpdateCompanyController.validationRules, UpdateCompanyController.execute);
app.get('/company/:uuid', authenticateToken, GetCompanyController.execute);
app.post('/login', LoginWithCompanyController.validationRules, LoginWithCompanyController.execute);
//users
app.get('/users',authenticateToken,GetUserController.getAll);
app.post('/createuser',authenticateToken, CreateUserController.execute);
app.put('/updateuser/:uuid',authenticateToken, UpdateUserController.execute);

//receipts 
app.post('/createreceipt',authenticateToken, CreateReceiptController.execute);

//products
app.post('/createproduct',authenticateToken, CreateProductController.validationRules, CreateProductController.execute);
app.put('/updateproduct/:uuid',authenticateToken, UpdateProductController.validationRules, UpdateProductController.execute);
app.get('/products',authenticateToken, GetProductController.getAll);
//Invoice
app.post('/createinvoice',authenticateToken, CreateInvoiceController.validationRules, CreateInvoiceController.execute);
//Customer
app.post('/createcustomer',authenticateToken, CreateCustomerController.validationRules, CreateCustomerController.execute);
app.put('/updatecustomer/:uuid',authenticateToken, UpdateCustomerController.validationRules, UpdateCustomerController.execute);
//Deposit balance
app.post('/depositbalance', authenticateToken, CreateDepositBalanceController.validationRules, CreateDepositBalanceController.execute);
app.post('/validatepayment', authenticateToken, CreateValidatePaymentController.validationRules, CreateValidatePaymentController.execute);

//Tax document
app.put('/updateDocumentsFees/:uuid', authenticateToken, UpdateDocumentFeeController.validationRules, UpdateDocumentFeeController.execute);
//Password recovery
app.post('/passwordrecovery', PasswordRecoveryController.validationRules, PasswordRecoveryController.execute);


const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
 //console.log(`Servidor rodando em http://localhost:${PORT}`)
})
export {
  app,
  server,
  connection,
  companyRepository,
  userRepository,
  productRepository,
  customerRepository,
  invoiceRepository,
  depositBalanceRepository,
  documentFeeRepository,
  tokenRepository,
  transactionRepository,
  receiptRepository,
  emailService
};
