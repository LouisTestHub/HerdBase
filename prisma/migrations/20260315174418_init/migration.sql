-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sbi" TEXT,
    "address" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "lat" REAL,
    "lng" REAL,
    "totalHectares" REAL,
    "cphNumber" TEXT,
    "herdMark" TEXT,
    "subscriptionPlan" TEXT NOT NULL DEFAULT 'STARTER',
    "subscriptionStartDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptionEndDate" DATETIME,
    "stripeCustomerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'WORKER',
    "avatar" TEXT,
    "emailVerified" DATETIME,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cattle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "tagNumber" TEXT NOT NULL,
    "rfidTag" TEXT,
    "name" TEXT,
    "type" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ALIVE',
    "damId" TEXT,
    "sireId" TEXT,
    "registrationNumber" TEXT,
    "currentPaddockId" TEXT,
    "currentWeight" REAL,
    "lastWeightDate" DATETIME,
    "purchaseDate" DATETIME,
    "purchasePrice" REAL,
    "saleDate" DATETIME,
    "salePrice" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Cattle_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cattle_damId_fkey" FOREIGN KEY ("damId") REFERENCES "Cattle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cattle_currentPaddockId_fkey" FOREIGN KEY ("currentPaddockId") REFERENCES "Paddock" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Movement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "cattleId" TEXT NOT NULL,
    "movementType" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "fromCph" TEXT,
    "toCph" TEXT,
    "fromLocation" TEXT,
    "toLocation" TEXT,
    "haulier" TEXT,
    "vehicleReg" TEXT,
    "bcmsSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "bcmsSubmissionDate" DATETIME,
    "bcmsReference" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Movement_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Movement_cattleId_fkey" FOREIGN KEY ("cattleId") REFERENCES "Cattle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CattlePassport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "cattleId" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "issueDate" DATETIME NOT NULL,
    "breedDescription" TEXT NOT NULL,
    "identityMarks" TEXT,
    "photoUrl" TEXT,
    "replacementReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CattlePassport_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CattlePassport_cattleId_fkey" FOREIGN KEY ("cattleId") REFERENCES "Cattle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BCMSSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "movementId" TEXT,
    "submissionType" TEXT NOT NULL,
    "submissionDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bcmsResponse" TEXT,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "referenceNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BCMSSubmission_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BCMSSubmission_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HealthRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "cattleId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "productName" TEXT,
    "batchNumber" TEXT,
    "dose" TEXT,
    "withdrawalMeatDays" INTEGER,
    "withdrawalMilkDays" INTEGER,
    "withdrawalEnds" DATETIME,
    "vetName" TEXT,
    "diagnosis" TEXT,
    "prescription" TEXT,
    "symptoms" TEXT,
    "temperature" REAL,
    "treatment" TEXT,
    "outcome" TEXT,
    "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
    "followUpDate" DATETIME,
    "cost" REAL,
    "notes" TEXT,
    "administeredById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HealthRecord_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HealthRecord_cattleId_fkey" FOREIGN KEY ("cattleId") REFERENCES "Cattle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HealthRecord_administeredById_fkey" FOREIGN KEY ("administeredById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SensorData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "cattleId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityLevel" INTEGER,
    "ruminationMinutes" INTEGER,
    "restingMinutes" INTEGER,
    "walkingDistance" REAL,
    "bodyTemperature" REAL,
    "heartRate" INTEGER,
    "heatDetected" BOOLEAN NOT NULL DEFAULT false,
    "calvingAlert" BOOLEAN NOT NULL DEFAULT false,
    "healthAlert" BOOLEAN NOT NULL DEFAULT false,
    "rawDataJson" TEXT,
    CONSTRAINT "SensorData_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SensorData_cattleId_fkey" FOREIGN KEY ("cattleId") REFERENCES "Cattle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "severity" TEXT NOT NULL,
    "cattleId" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "triggerData" TEXT,
    "actionTaken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acknowledgedAt" DATETIME,
    "resolvedAt" DATETIME,
    CONSTRAINT "Alert_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BreedingRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "cowId" TEXT NOT NULL,
    "bullId" TEXT,
    "serviceType" TEXT NOT NULL,
    "serviceDate" DATETIME NOT NULL,
    "aiTechnicianName" TEXT,
    "strawNumber" TEXT,
    "bullBreed" TEXT,
    "pregnancyConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "pregnancyCheckDate" DATETIME,
    "expectedCalvingDate" DATETIME,
    "successfulCalving" BOOLEAN,
    "calvingRecordId" TEXT,
    "heatCycleDay" INTEGER,
    "notes" TEXT,
    "cost" REAL,
    "recordedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BreedingRecord_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BreedingRecord_cowId_fkey" FOREIGN KEY ("cowId") REFERENCES "Cattle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BreedingRecord_bullId_fkey" FOREIGN KEY ("bullId") REFERENCES "Cattle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "BreedingRecord_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CalvingRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "cowId" TEXT NOT NULL,
    "calvingDate" DATETIME NOT NULL,
    "birthEase" TEXT NOT NULL,
    "calfId" TEXT,
    "calfSex" TEXT,
    "calfWeight" REAL,
    "calfVigor" TEXT,
    "assistanceRequired" BOOLEAN NOT NULL DEFAULT false,
    "assistedById" TEXT,
    "vetAttended" BOOLEAN NOT NULL DEFAULT false,
    "vetName" TEXT,
    "placentaExpelled" BOOLEAN NOT NULL DEFAULT true,
    "placentaTime" INTEGER,
    "colostrum" BOOLEAN NOT NULL DEFAULT true,
    "complications" TEXT,
    "notes" TEXT,
    "cost" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CalvingRecord_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CalvingRecord_cowId_fkey" FOREIGN KEY ("cowId") REFERENCES "Cattle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CalvingRecord_assistedById_fkey" FOREIGN KEY ("assistedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeedInventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "feedType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supplier" TEXT,
    "currentStock" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "location" TEXT,
    "costPerUnit" REAL,
    "lastPurchaseDate" DATETIME,
    "dryMatterPercent" REAL,
    "proteinPercent" REAL,
    "energyMJPerKg" REAL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FeedInventory_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeedRation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cattleType" TEXT NOT NULL,
    "ageGroup" TEXT,
    "targetDMI" REAL,
    "targetProtein" REAL,
    "targetEnergy" REAL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FeedRation_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeedRationComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rationId" TEXT NOT NULL,
    "feedInventoryId" TEXT NOT NULL,
    "amountKg" REAL NOT NULL,
    "percentage" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FeedRationComponent_rationId_fkey" FOREIGN KEY ("rationId") REFERENCES "FeedRation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FeedRationComponent_feedInventoryId_fkey" FOREIGN KEY ("feedInventoryId") REFERENCES "FeedInventory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeedingRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rationId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "numberOfCattle" INTEGER NOT NULL,
    "totalFedKg" REAL NOT NULL,
    "costPerHead" REAL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FeedingRecord_rationId_fkey" FOREIGN KEY ("rationId") REFERENCES "FeedRation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeightRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cattleId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "weight" REAL NOT NULL,
    "method" TEXT NOT NULL,
    "equipmentId" TEXT,
    "feedCostToDate" REAL,
    "ageInDays" INTEGER,
    "recordedById" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WeightRecord_cattleId_fkey" FOREIGN KEY ("cattleId") REFERENCES "Cattle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WeightRecord_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paddock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reference" TEXT,
    "areaHectares" REAL NOT NULL,
    "boundaryGeoJSON" TEXT,
    "soilType" TEXT,
    "currentCover" INTEGER,
    "lastGrazedDate" DATETIME,
    "lastCutDate" DATETIME,
    "lastFertilised" DATETIME,
    "stockingRate" REAL,
    "carryingCapacity" INTEGER,
    "waterSource" BOOLEAN NOT NULL DEFAULT false,
    "fencing" TEXT,
    "gateAccess" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Paddock_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GrazingRotation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "paddockId" TEXT NOT NULL,
    "moveInDate" DATETIME NOT NULL,
    "moveOutDate" DATETIME,
    "numberOfCattle" INTEGER NOT NULL,
    "preCoverKgDM" INTEGER,
    "postCoverKgDM" INTEGER,
    "grazingDays" INTEGER,
    "residualHeight" REAL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GrazingRotation_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GrazingRotation_paddockId_fkey" FOREIGN KEY ("paddockId") REFERENCES "Paddock" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GrassGrowthData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paddockId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "coverKgDM" INTEGER NOT NULL,
    "height" REAL,
    "growthRate" INTEGER,
    "source" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GrassGrowthData_paddockId_fkey" FOREIGN KEY ("paddockId") REFERENCES "Paddock" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FinancialRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "vat" REAL,
    "description" TEXT NOT NULL,
    "supplier" TEXT,
    "reference" TEXT,
    "cattleId" TEXT,
    "invoiceId" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FinancialRecord_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "dueDate" DATETIME,
    "customerSupplier" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subtotal" REAL NOT NULL,
    "vat" REAL NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "paidDate" DATETIME,
    "fileUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Invoice_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Grant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "scheme" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "applicationDate" DATETIME,
    "applicationRef" TEXT,
    "claimAmount" REAL,
    "approvedAmount" REAL,
    "paymentReceived" REAL,
    "paymentDate" DATETIME,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Grant_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Farm_sbi_key" ON "Farm"("sbi");

-- CreateIndex
CREATE UNIQUE INDEX "Farm_cphNumber_key" ON "Farm"("cphNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Farm_stripeCustomerId_key" ON "Farm"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_farmId_idx" ON "User"("farmId");

-- CreateIndex
CREATE UNIQUE INDEX "Cattle_tagNumber_key" ON "Cattle"("tagNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Cattle_rfidTag_key" ON "Cattle"("rfidTag");

-- CreateIndex
CREATE INDEX "Cattle_farmId_idx" ON "Cattle"("farmId");

-- CreateIndex
CREATE INDEX "Cattle_status_idx" ON "Cattle"("status");

-- CreateIndex
CREATE INDEX "Cattle_type_idx" ON "Cattle"("type");

-- CreateIndex
CREATE INDEX "Cattle_currentPaddockId_idx" ON "Cattle"("currentPaddockId");

-- CreateIndex
CREATE INDEX "Movement_farmId_idx" ON "Movement"("farmId");

-- CreateIndex
CREATE INDEX "Movement_cattleId_idx" ON "Movement"("cattleId");

-- CreateIndex
CREATE INDEX "Movement_date_idx" ON "Movement"("date");

-- CreateIndex
CREATE INDEX "Movement_bcmsSubmitted_idx" ON "Movement"("bcmsSubmitted");

-- CreateIndex
CREATE UNIQUE INDEX "CattlePassport_cattleId_key" ON "CattlePassport"("cattleId");

-- CreateIndex
CREATE UNIQUE INDEX "CattlePassport_passportNumber_key" ON "CattlePassport"("passportNumber");

-- CreateIndex
CREATE INDEX "CattlePassport_farmId_idx" ON "CattlePassport"("farmId");

-- CreateIndex
CREATE INDEX "BCMSSubmission_farmId_idx" ON "BCMSSubmission"("farmId");

-- CreateIndex
CREATE INDEX "BCMSSubmission_movementId_idx" ON "BCMSSubmission"("movementId");

-- CreateIndex
CREATE INDEX "BCMSSubmission_status_idx" ON "BCMSSubmission"("status");

-- CreateIndex
CREATE INDEX "HealthRecord_farmId_idx" ON "HealthRecord"("farmId");

-- CreateIndex
CREATE INDEX "HealthRecord_cattleId_idx" ON "HealthRecord"("cattleId");

-- CreateIndex
CREATE INDEX "HealthRecord_date_idx" ON "HealthRecord"("date");

-- CreateIndex
CREATE INDEX "HealthRecord_withdrawalEnds_idx" ON "HealthRecord"("withdrawalEnds");

-- CreateIndex
CREATE INDEX "SensorData_farmId_idx" ON "SensorData"("farmId");

-- CreateIndex
CREATE INDEX "SensorData_cattleId_idx" ON "SensorData"("cattleId");

-- CreateIndex
CREATE INDEX "SensorData_timestamp_idx" ON "SensorData"("timestamp");

-- CreateIndex
CREATE INDEX "Alert_farmId_idx" ON "Alert"("farmId");

-- CreateIndex
CREATE INDEX "Alert_status_idx" ON "Alert"("status");

-- CreateIndex
CREATE INDEX "Alert_type_idx" ON "Alert"("type");

-- CreateIndex
CREATE INDEX "Alert_createdAt_idx" ON "Alert"("createdAt");

-- CreateIndex
CREATE INDEX "BreedingRecord_farmId_idx" ON "BreedingRecord"("farmId");

-- CreateIndex
CREATE INDEX "BreedingRecord_cowId_idx" ON "BreedingRecord"("cowId");

-- CreateIndex
CREATE INDEX "BreedingRecord_serviceDate_idx" ON "BreedingRecord"("serviceDate");

-- CreateIndex
CREATE INDEX "BreedingRecord_expectedCalvingDate_idx" ON "BreedingRecord"("expectedCalvingDate");

-- CreateIndex
CREATE INDEX "CalvingRecord_farmId_idx" ON "CalvingRecord"("farmId");

-- CreateIndex
CREATE INDEX "CalvingRecord_cowId_idx" ON "CalvingRecord"("cowId");

-- CreateIndex
CREATE INDEX "CalvingRecord_calvingDate_idx" ON "CalvingRecord"("calvingDate");

-- CreateIndex
CREATE INDEX "FeedInventory_farmId_idx" ON "FeedInventory"("farmId");

-- CreateIndex
CREATE INDEX "FeedInventory_feedType_idx" ON "FeedInventory"("feedType");

-- CreateIndex
CREATE INDEX "FeedRation_farmId_idx" ON "FeedRation"("farmId");

-- CreateIndex
CREATE INDEX "FeedRation_cattleType_idx" ON "FeedRation"("cattleType");

-- CreateIndex
CREATE INDEX "FeedRationComponent_rationId_idx" ON "FeedRationComponent"("rationId");

-- CreateIndex
CREATE INDEX "FeedRationComponent_feedInventoryId_idx" ON "FeedRationComponent"("feedInventoryId");

-- CreateIndex
CREATE INDEX "FeedingRecord_rationId_idx" ON "FeedingRecord"("rationId");

-- CreateIndex
CREATE INDEX "FeedingRecord_date_idx" ON "FeedingRecord"("date");

-- CreateIndex
CREATE INDEX "WeightRecord_cattleId_idx" ON "WeightRecord"("cattleId");

-- CreateIndex
CREATE INDEX "WeightRecord_date_idx" ON "WeightRecord"("date");

-- CreateIndex
CREATE INDEX "Paddock_farmId_idx" ON "Paddock"("farmId");

-- CreateIndex
CREATE INDEX "GrazingRotation_farmId_idx" ON "GrazingRotation"("farmId");

-- CreateIndex
CREATE INDEX "GrazingRotation_paddockId_idx" ON "GrazingRotation"("paddockId");

-- CreateIndex
CREATE INDEX "GrazingRotation_moveInDate_idx" ON "GrazingRotation"("moveInDate");

-- CreateIndex
CREATE INDEX "GrassGrowthData_paddockId_idx" ON "GrassGrowthData"("paddockId");

-- CreateIndex
CREATE INDEX "GrassGrowthData_date_idx" ON "GrassGrowthData"("date");

-- CreateIndex
CREATE INDEX "FinancialRecord_farmId_idx" ON "FinancialRecord"("farmId");

-- CreateIndex
CREATE INDEX "FinancialRecord_category_idx" ON "FinancialRecord"("category");

-- CreateIndex
CREATE INDEX "FinancialRecord_type_idx" ON "FinancialRecord"("type");

-- CreateIndex
CREATE INDEX "FinancialRecord_date_idx" ON "FinancialRecord"("date");

-- CreateIndex
CREATE INDEX "Invoice_farmId_idx" ON "Invoice"("farmId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "Invoice_date_idx" ON "Invoice"("date");

-- CreateIndex
CREATE INDEX "Grant_farmId_idx" ON "Grant"("farmId");

-- CreateIndex
CREATE INDEX "Grant_scheme_idx" ON "Grant"("scheme");

-- CreateIndex
CREATE INDEX "Grant_year_idx" ON "Grant"("year");
