ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    companyId VARCHAR(255) NOT NULL,
    name VARCHAR(200) NOT NULL,
    priceBuy DOUBLE NOT NULL,
    price DOUBLE NOT NULL,
    iva VARCHAR(50) NOT NULL,
    pvp DOUBLE NOT NULL,
    quantity INT NOT NULL,
    image BLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    nif VARCHAR(100) NOT NULL,
    foneNumber VARCHAR(50) NOT NULL,
    address VARCHAR(200) NOT NULL,
    companyId VARCHAR(255) NOT NULL,
    logo BLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    userId VARCHAR(200) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expiration TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE documentFees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    documentType ENUM('receipt_invoices','receipts','invoices','proforma_invoices') NOT NULL,
    documentTypePt VARCHAR(255) NOT NULL,
    tax DOUBLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO documentFees (id, uuid, documentType, documentTypePt, tax) values(1,'61e5c9a3-0ac3-4d4a-839e-ab99e7589f65', 'receipt_invoices','Fatura recibo',0.20);
INSERT INTO documentFees (id, uuid, documentType, documentTypePt, tax) values(2,'61e5c9a3-0ac3-4d4a-839e-ab99e7589f66', 'receipts','Recibo',0.15);
INSERT INTO documentFees (id, uuid, documentType, documentTypePt, tax) values(3,'61e5c9a3-0ac3-4d4a-839e-ab99e7589f67', 'invoices','Fatura',0.10);
INSERT INTO documentFees (id, uuid, documentType, documentTypePt, tax) values(4,'61e5c9a3-0ac3-4d4a-839e-ab99e7589f68', 'proforma_invoices','Fatura proforma',0.05);

CREATE TABLE taxs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    tax DOUBLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO taxs (id, uuid, tax) values(1,'61e5c9a3-0ac3-4d4a-839e-ab99e7589f65', 0.00);
INSERT INTO taxs (id, uuid, tax) values(2,'61e5c9a3-0ac3-4d4a-839e-ab99e7589f66', 14.0);
INSERT INTO taxs (id, uuid, tax) values(3,'61e5c9a3-0ac3-4d4a-839e-ab99e7589f67', 7.0);

CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    cash DOUBLE NOT NULL,
    transfer DOUBLE NOT NULL,
    deposit DOUBLE NOT NULL,
    multibox DOUBLE NOT NULL,
    discount DOUBLE NOT NULL,
    retention DOUBLE NOT NULL,
    iva DOUBLE NOT NULL,
    taxDiscountInvoiceId VARCHAR(255) NOT NULL,
    taxDiscountInvoice DOUBLE NOT NULL,
    totalTaxDiscountInvoice DOUBLE NOT NULL,
    total DOUBLE NOT NULL,
    documentType VARCHAR(100) NOT NULL,
    paymentMethod ENUM('cash','transfer','deposit','double') NOT NULL,
    customerId VARCHAR(200) NOT NULL,
    userId VARCHAR(100) NOT NULL,
    companyId VARCHAR(255) NOT NULL,
    sequence INT NOT NULL,
    numberOfInvoice VARCHAR(255) NOT NULL,
    invoiceDate DATETIME NOT NULL,
    status ENUM('validated','canceled') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE invoiceItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId VARCHAR(200) NOT NULL,
    productName VARCHAR(200) NOT NULL,
    productPrice DOUBLE NOT NULL,
    productPriceDiscount DOUBLE NOT NULL,
    productIva DOUBLE NOT NULL,
    taxRetention DOUBLE NOT NULL,
    totalRetention DOUBLE NOT NULL,
    taxDiscount DOUBLE NOT NULL,
    totalDiscount DOUBLE NOT NULL,
    quantity DOUBLE NOT NULL,
    total DOUBLE NOT NULL,
    invoiceId VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE receipts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    sequence INT NOT NULL,
    numberOfReceipt VARCHAR(200) NOT NULL,
    totalInvoice DOUBLE NOT NULL,
    totalPaid DOUBLE NOT NULL,
    amount DOUBLE NOT NULL,
    invoiceId VARCHAR(200) NOT NULL,
    numberOfInvoice VARCHAR(200) NOT NULL,
    companyId VARCHAR(200) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    receiptDate DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE deposits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    companyId VARCHAR(200) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    amount DOUBLE NOT NULL,
    status ENUM('pending', 'validated') NOT NULL,
    bankReceipt BLOB NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    companyId VARCHAR(200) NOT NULL,
    transactionDate VARCHAR(200) NOT NULL,
    previousBalance DOUBLE NULL,
    currentBalance DOUBLE NULL,
    userId VARCHAR(255) NOT NULL,
    amount DOUBLE NOT NULL,
    status ENUM('validated', 'pending') NOT NULL,
    tax DOUBLE NOT NULL,
    type ENUM('deposit', 'invoice_payment') NOT NULL,
    invoiceId VARCHAR(200) NULL,
    paymentDocument BLOB NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    companyId VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    nif VARCHAR(50) NOT NULL,
    foneNumber VARCHAR(50) NOT NULL,
    address VARCHAR(200) NOT NULL,
    regime ENUM('GERAL', 'EXCLUSAO', 'SIMPLIFICADO') NOT NULL,
    balance DOUBLE NOT NULL DEFAULT 0,
    logo BLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
