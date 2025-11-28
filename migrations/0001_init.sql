-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ENTERPRISE_ADMIN',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "companyName" TEXT,
    "avatarUrl" TEXT,
    "permissions" TEXT DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "enterpriseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "phone" TEXT,
    "department" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("enterpriseId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TaxRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "enterpriseId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "batchId" TEXT,
    "period" TEXT NOT NULL,
    "paymentDate" DATETIME NOT NULL,
    "income" DECIMAL NOT NULL,
    "taxableIncome" DECIMAL NOT NULL,
    "taxRate" DECIMAL NOT NULL,
    "quickDeduction" DECIMAL NOT NULL,
    "taxPayable" DECIMAL NOT NULL,
    "taxPaid" DECIMAL NOT NULL,
    "currentTax" DECIMAL NOT NULL,
    "afterTaxIncome" DECIMAL NOT NULL,
    "isNewSegment" BOOLEAN NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("enterpriseId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("batchId") REFERENCES "UploadBatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UploadBatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "enterpriseId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "totalRecords" INTEGER NOT NULL,
    "totalAmount" DECIMAL NOT NULL,
    "uploadTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    FOREIGN KEY ("enterpriseId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "Employee_idNumber_idx" ON "Employee"("idNumber");
CREATE UNIQUE INDEX "Employee_enterpriseId_idNumber_key" ON "Employee"("enterpriseId", "idNumber");

-- CreateIndex
CREATE INDEX "TaxRecord_enterpriseId_period_idx" ON "TaxRecord"("enterpriseId", "period");
CREATE INDEX "TaxRecord_employeeId_idx" ON "TaxRecord"("employeeId");
