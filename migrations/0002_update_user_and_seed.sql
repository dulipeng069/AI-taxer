-- AlterTable
ALTER TABLE "User" ADD COLUMN "contactPerson" TEXT;
ALTER TABLE "User" ADD COLUMN "contactPhone" TEXT;

-- Seed Super Admin
INSERT INTO "User" ("id", "username", "passwordHash", "role", "status", "companyName", "createdAt", "updatedAt")
VALUES ('super-admin-id', 'dulipeng', '$2b$10$8BLthec276Xtc475ZCT0cuEtfCTuPAie5yx8eCTyoCS5sT241JUO.', 'SUPER_ADMIN', 'ACTIVE', 'TaxMaster Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT("username") DO UPDATE SET
"passwordHash" = '$2b$10$8BLthec276Xtc475ZCT0cuEtfCTuPAie5yx8eCTyoCS5sT241JUO.',
"role" = 'SUPER_ADMIN',
"status" = 'ACTIVE';
