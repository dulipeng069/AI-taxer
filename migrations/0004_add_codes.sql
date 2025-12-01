-- Add companyCode to User
ALTER TABLE User ADD COLUMN companyCode TEXT;

-- Create unique index for companyCode
CREATE UNIQUE INDEX User_companyCode_key ON User(companyCode);

-- Add code to Employee
ALTER TABLE Employee ADD COLUMN code TEXT;
