import { PrismaClient, CattleType, CattleSex, CattleStatus, ServiceType, BirthEase, HealthEventType, AlertType, AlertStatus, FeedType, MovementType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Oakfield Farm...');

  // Create Farm
  const farm = await prisma.farm.create({
    data: {
      name: 'Oakfield Farm',
      sbi: 'SBI123456789',
      address: 'Lower Meadow Lane, Hereford',
      postcode: 'HR1 2DP',
      lat: 52.0565,
      lng: -2.7157,
      totalHectares: 185.5,
      cphNumber: '29/123/4567',
      herdMark: 'UK29123',
      subscriptionPlan: 'PROFESSIONAL',
    },
  });

  console.log('✅ Farm created');

  // Create Users
  const owner = await prisma.user.create({
    data: {
      farmId: farm.id,
      name: 'Tom Hargreaves',
      email: 'tom@oakfieldfarm.co.uk',
      phone: '+44 7700 900123',
      role: 'FARM_OWNER',
    },
  });

  const manager = await prisma.user.create({
    data: {
      farmId: farm.id,
      name: 'Sarah Mitchell',
      email: 'sarah@oakfieldfarm.co.uk',
      phone: '+44 7700 900124',
      role: 'FARM_MANAGER',
    },
  });

  const worker = await prisma.user.create({
    data: {
      farmId: farm.id,
      name: 'James Cooper',
      email: 'james@oakfieldfarm.co.uk',
      role: 'WORKER',
    },
  });

  console.log('✅ Users created');

  // Create Paddocks (10 paddocks)
  const paddockData = [
    { name: 'Home Field', areaHectares: 12.5, currentCover: 2200, soilType: 'Clay loam', waterSource: true },
    { name: 'Top Meadow', areaHectares: 18.3, currentCover: 2400, soilType: 'Sandy loam', waterSource: true },
    { name: 'Lower Pasture', areaHectares: 15.7, currentCover: 1950, soilType: 'Clay', waterSource: false },
    { name: 'Oak Grove', areaHectares: 22.1, currentCover: 2100, soilType: 'Loam', waterSource: true },
    { name: 'River Meadow', areaHectares: 19.8, currentCover: 2650, soilType: 'Alluvial', waterSource: true },
    { name: 'Hill Field', areaHectares: 14.2, currentCover: 1800, soilType: 'Stony loam', waterSource: false },
    { name: 'Barn Paddock', areaHectares: 8.5, currentCover: 2300, soilType: 'Clay loam', waterSource: true },
    { name: 'Far Field', areaHectares: 25.4, currentCover: 2050, soilType: 'Sandy loam', waterSource: false },
    { name: 'South Pasture', areaHectares: 20.6, currentCover: 2200, soilType: 'Loam', waterSource: true },
    { name: 'North Block', areaHectares: 28.4, currentCover: 1900, soilType: 'Clay', waterSource: true },
  ];

  const paddocks = [];
  for (const pd of paddockData) {
    const paddock = await prisma.paddock.create({
      data: {
        farmId: farm.id,
        ...pd,
        stockingRate: 2.2,
        fencing: 'GOOD',
        gateAccess: true,
      },
    });
    paddocks.push(paddock);
  }

  console.log('✅ Paddocks created');

  // Create Feed Inventory
  const silage = await prisma.feedInventory.create({
    data: {
      farmId: farm.id,
      feedType: 'SILAGE',
      name: 'Grass Silage 2024',
      currentStock: 450,
      unit: 'tonnes',
      costPerUnit: 35,
      dryMatterPercent: 32,
      proteinPercent: 14.5,
      energyMJPerKg: 11.2,
    },
  });

  const concentrate = await prisma.feedInventory.create({
    data: {
      farmId: farm.id,
      feedType: 'CONCENTRATE',
      name: '18% Dairy Nuts',
      currentStock: 25,
      unit: 'tonnes',
      costPerUnit: 385,
      dryMatterPercent: 88,
      proteinPercent: 18,
      energyMJPerKg: 13.5,
    },
  });

  const mineral = await prisma.feedInventory.create({
    data: {
      farmId: farm.id,
      feedType: 'MINERAL',
      name: 'Hi-Mag Bolus',
      currentStock: 150,
      unit: 'kg',
      costPerUnit: 12.50,
    },
  });

  console.log('✅ Feed inventory created');

  // Create Feed Rations
  const dairyRation = await prisma.feedRation.create({
    data: {
      farmId: farm.id,
      name: 'Lactating Cow - High Yield',
      description: 'For cows producing over 30L/day',
      cattleType: 'DAIRY',
      ageGroup: 'LACTATING',
      targetDMI: 22,
      targetProtein: 17,
      targetEnergy: 12.5,
      isActive: true,
    },
  });

  await prisma.feedRationComponent.createMany({
    data: [
      { rationId: dairyRation.id, feedInventoryId: silage.id, amountKg: 35, percentage: 60 },
      { rationId: dairyRation.id, feedInventoryId: concentrate.id, amountKg: 8, percentage: 35 },
      { rationId: dairyRation.id, feedInventoryId: mineral.id, amountKg: 0.15, percentage: 5 },
    ],
  });

  const beefRation = await prisma.feedRation.create({
    data: {
      farmId: farm.id,
      name: 'Finishing Cattle',
      description: 'For beef cattle 18-24 months',
      cattleType: 'BEEF',
      ageGroup: 'FINISHING',
      targetDMI: 12,
      targetProtein: 14,
      targetEnergy: 11.8,
      isActive: true,
    },
  });

  console.log('✅ Feed rations created');

  // Create 200 Cattle (mix of dairy and beef)
  const cattle = [];
  const dairyBreeds = ['Holstein', 'Jersey', 'Ayrshire', 'British Friesian'];
  const beefBreeds = ['Hereford', 'Angus', 'Charolais', 'Limousin', 'Belgian Blue'];

  // Helper function to generate random dates
  const randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  // Create 120 dairy cattle
  for (let i = 1; i <= 120; i++) {
    const age = Math.floor(Math.random() * 8) + 2; // 2-10 years
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - age);

    const isHeifer = age < 3;
    const sex = isHeifer ? 'HEIFER' : 'COW';

    const cow = await prisma.cattle.create({
      data: {
        farmId: farm.id,
        tagNumber: `UK291230${String(i).padStart(5, '0')}`,
        rfidTag: `982000${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
        name: `Daisy ${i}`,
        type: 'DAIRY',
        sex,
        breed: dairyBreeds[Math.floor(Math.random() * dairyBreeds.length)],
        dob,
        status: 'ALIVE',
        currentPaddockId: paddocks[Math.floor(Math.random() * paddocks.length)].id,
        currentWeight: 550 + Math.random() * 150,
        lastWeightDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        purchaseDate: age > 5 ? randomDate(new Date('2018-01-01'), new Date('2022-01-01')) : undefined,
        purchasePrice: age > 5 ? 1200 + Math.random() * 400 : undefined,
      },
    });
    cattle.push(cow);
  }

  console.log('✅ Dairy cattle created');

  // Create 70 beef cattle
  for (let i = 121; i <= 190; i++) {
    const age = Math.floor(Math.random() * 4) + 1; // 1-5 years
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - age);

    const isSteer = Math.random() > 0.3;
    const sex = isSteer ? 'STEER' : (Math.random() > 0.5 ? 'COW' : 'HEIFER');

    const beefCattle = await prisma.cattle.create({
      data: {
        farmId: farm.id,
        tagNumber: `UK291230${String(i).padStart(5, '0')}`,
        rfidTag: `982000${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
        type: 'BEEF',
        sex,
        breed: beefBreeds[Math.floor(Math.random() * beefBreeds.length)],
        dob,
        status: 'ALIVE',
        currentPaddockId: paddocks[Math.floor(Math.random() * paddocks.length)].id,
        currentWeight: 400 + Math.random() * 300,
        lastWeightDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        purchaseDate: randomDate(new Date('2022-01-01'), new Date('2024-01-01')),
        purchasePrice: 800 + Math.random() * 600,
      },
    });
    cattle.push(beefCattle);
  }

  console.log('✅ Beef cattle created');

  // Create 10 bulls
  for (let i = 191; i <= 200; i++) {
    const age = Math.floor(Math.random() * 4) + 3; // 3-7 years
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - age);

    const bull = await prisma.cattle.create({
      data: {
        farmId: farm.id,
        tagNumber: `UK291230${String(i).padStart(5, '0')}`,
        rfidTag: `982000${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
        name: `Bull ${i - 190}`,
        type: i <= 195 ? 'DAIRY' : 'BEEF',
        sex: 'BULL',
        breed: i <= 195 ? dairyBreeds[0] : beefBreeds[Math.floor(Math.random() * beefBreeds.length)],
        dob,
        status: 'ALIVE',
        currentPaddockId: paddocks[Math.floor(Math.random() * 2)].id,
        currentWeight: 850 + Math.random() * 250,
        lastWeightDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
        purchaseDate: randomDate(new Date('2019-01-01'), new Date('2022-01-01')),
        purchasePrice: 2500 + Math.random() * 2000,
      },
    });
    cattle.push(bull);
  }

  console.log('✅ Bulls created');

  // Create Weight Records (10-15 per animal) - BATCHED to avoid connection pool exhaustion
  const weightRecords = [];
  for (const animal of cattle.slice(0, 50)) { // First 50 animals get detailed weight history
    const recordCount = Math.floor(Math.random() * 6) + 10; // 10-15 records
    for (let i = 0; i < recordCount; i++) {
      const daysAgo = i * 30 + Math.floor(Math.random() * 20);
      weightRecords.push({
        cattleId: animal.id,
        date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
        weight: (animal.currentWeight || 500) - (recordCount - i) * 15 + Math.random() * 20,
        method: 'WALK_OVER_SCALE',
        recordedById: [owner.id, manager.id, worker.id][Math.floor(Math.random() * 3)],
      });
    }
  }
  
  // Insert weight records in batches of 50
  const batchSize = 50;
  for (let i = 0; i < weightRecords.length; i += batchSize) {
    const batch = weightRecords.slice(i, i + batchSize);
    await prisma.weightRecord.createMany({ data: batch });
    console.log(`   • Weight records batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(weightRecords.length / batchSize)} inserted`);
    // Small delay to prevent connection pool exhaustion
    if (i + batchSize < weightRecords.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log('✅ Weight records created');

  // Create Breeding Records (for cows/heifers)
  const breedingRecordPromises = [];
  const fertileCattle = cattle.filter(c => c.sex === 'COW' || c.sex === 'HEIFER');
  const bulls = cattle.filter(c => c.sex === 'BULL');

  for (const cow of fertileCattle.slice(0, 80)) { // 80 cows with breeding records
    const recordCount = Math.floor(Math.random() * 3) + 2; // 2-4 breeding records each
    for (let i = 0; i < recordCount; i++) {
      const daysAgo = i * 365 + Math.floor(Math.random() * 180) + 60;
      const serviceDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      const expectedCalvingDate = new Date(serviceDate.getTime() + 283 * 24 * 60 * 60 * 1000);

      breedingRecordPromises.push(
        prisma.breedingRecord.create({
          data: {
            farmId: farm.id,
            cowId: cow.id,
            bullId: Math.random() > 0.3 ? bulls[Math.floor(Math.random() * bulls.length)].id : undefined,
            serviceType: Math.random() > 0.4 ? 'ARTIFICIAL_INSEMINATION' : 'NATURAL_SERVICE',
            serviceDate,
            aiTechnicianName: Math.random() > 0.5 ? 'Dave Thompson' : 'Lisa Ward',
            pregnancyConfirmed: true,
            pregnancyCheckDate: new Date(serviceDate.getTime() + 60 * 24 * 60 * 60 * 1000),
            expectedCalvingDate,
            successfulCalving: i < recordCount - 1,
            cost: Math.random() > 0.5 ? 45 + Math.random() * 30 : undefined,
            recordedById: manager.id,
          },
        })
      );
    }
  }
  await Promise.all(breedingRecordPromises);

  console.log('✅ Breeding records created');

  // Create Calving Records
  const calvingRecordPromises = [];
  for (const cow of fertileCattle.slice(0, 60)) {
    const calvingCount = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < calvingCount; i++) {
      const daysAgo = i * 365 + Math.floor(Math.random() * 180) + 150;
      calvingRecordPromises.push(
        prisma.calvingRecord.create({
          data: {
            farmId: farm.id,
            cowId: cow.id,
            calvingDate: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
            birthEase: ['EASY', 'EASY', 'EASY', 'MODERATE', 'DIFFICULT'][Math.floor(Math.random() * 5)] as BirthEase,
            calfSex: Math.random() > 0.5 ? 'HEIFER' : 'BULL',
            calfWeight: 35 + Math.random() * 15,
            calfVigor: 'STRONG',
            assistanceRequired: Math.random() > 0.7,
            assistedById: Math.random() > 0.5 ? manager.id : worker.id,
            vetAttended: Math.random() > 0.9,
            placentaExpelled: true,
            colostrum: true,
            cost: Math.random() > 0.8 ? 120 + Math.random() * 200 : undefined,
          },
        })
      );
    }
  }
  await Promise.all(calvingRecordPromises);

  console.log('✅ Calving records created');

  // Create Health Records
  const healthRecordPromises = [];
  for (const animal of cattle.slice(0, 100)) {
    const healthCount = Math.floor(Math.random() * 5) + 2; // 2-6 health events each
    for (let i = 0; i < healthCount; i++) {
      const daysAgo = i * 90 + Math.floor(Math.random() * 60);
      const eventDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      healthRecordPromises.push(
        prisma.healthRecord.create({
          data: {
            farmId: farm.id,
            cattleId: animal.id,
            eventType: ['VACCINATION', 'VACCINATION', 'TREATMENT', 'EXAMINATION'][Math.floor(Math.random() * 4)] as HealthEventType,
            date: eventDate,
            productName: ['Bovilis BVD', 'Heptavac P Plus', 'Alamycin', 'Metacam'][Math.floor(Math.random() * 4)],
            batchNumber: `BN${Math.floor(Math.random() * 100000)}`,
            dose: '2ml',
            withdrawalMeatDays: Math.random() > 0.5 ? 28 : 0,
            withdrawalMilkDays: Math.random() > 0.5 ? 7 : undefined,
            withdrawalEnds: Math.random() > 0.5 ? new Date(eventDate.getTime() + 28 * 24 * 60 * 60 * 1000) : undefined,
            vetName: Math.random() > 0.6 ? 'Dr. Helen Roberts' : undefined,
            treatment: 'Routine vaccination and health check',
            cost: 15 + Math.random() * 45,
            administeredById: [manager.id, worker.id][Math.floor(Math.random() * 2)],
          },
        })
      );
    }
  }
  await Promise.all(healthRecordPromises);

  console.log('✅ Health records created');

  // Create Movements
  const movementPromises = [];
  for (const animal of cattle.slice(0, 40)) {
    movementPromises.push(
      prisma.movement.create({
        data: {
          farmId: farm.id,
          cattleId: animal.id,
          movementType: 'ON',
          date: animal.purchaseDate || new Date('2023-01-15'),
          fromCph: '29/456/7890',
          toCph: farm.cphNumber,
          haulier: 'Shires Livestock Transport',
          bcmsSubmitted: true,
          bcmsSubmissionDate: animal.purchaseDate || new Date('2023-01-16'),
          bcmsReference: `BCMS${Math.floor(Math.random() * 1000000)}`,
        },
      })
    );
  }
  await Promise.all(movementPromises);

  console.log('✅ Movement records created');

  // Create Sensor Data (for 30 cattle with wearables)
  const sensorPromises = [];
  for (const animal of cattle.slice(0, 30)) {
    for (let i = 0; i < 30; i++) { // 30 days of data
      const timestamp = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      sensorPromises.push(
        prisma.sensorData.create({
          data: {
            farmId: farm.id,
            cattleId: animal.id,
            timestamp,
            activityLevel: 40 + Math.floor(Math.random() * 40),
            ruminationMinutes: 350 + Math.floor(Math.random() * 150),
            restingMinutes: 600 + Math.floor(Math.random() * 200),
            walkingDistance: 1500 + Math.random() * 2000,
            bodyTemperature: 38.5 + Math.random() * 0.8,
            heartRate: 60 + Math.floor(Math.random() * 20),
            heatDetected: Math.random() > 0.95 && animal.sex === 'COW',
            calvingAlert: false,
            healthAlert: Math.random() > 0.98,
          },
        })
      );
    }
  }
  await Promise.all(sensorPromises);

  console.log('✅ Sensor data created');

  // Create Alerts
  await prisma.alert.createMany({
    data: [
      {
        farmId: farm.id,
        type: 'HEAT_DETECTION',
        status: 'ACTIVE',
        severity: 'MEDIUM',
        cattleId: cattle[10].id,
        title: 'Heat detected',
        message: `${cattle[10].name || cattle[10].tagNumber} showing signs of heat - activity increased 240%`,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        farmId: farm.id,
        type: 'CALVING_IMMINENT',
        status: 'ACTIVE',
        severity: 'HIGH',
        cattleId: cattle[15].id,
        title: 'Calving expected within 24h',
        message: `${cattle[15].name || cattle[15].tagNumber} showing calving signs - check regularly`,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
      {
        farmId: farm.id,
        type: 'MEDICINE_WITHDRAWAL_END',
        status: 'RESOLVED',
        severity: 'MEDIUM',
        cattleId: cattle[20].id,
        title: 'Withdrawal period ended',
        message: 'Medicine withdrawal period complete - animal can enter food chain',
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
        resolvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        farmId: farm.id,
        type: 'LOW_ACTIVITY',
        status: 'ACKNOWLEDGED',
        severity: 'MEDIUM',
        cattleId: cattle[25].id,
        title: 'Low activity detected',
        message: 'Activity 60% below normal - check for illness or injury',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        acknowledgedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
    ],
  });

  console.log('✅ Alerts created');

  // Create Grazing Rotations
  const rotationPromises = [];
  for (const paddock of paddocks) {
    for (let i = 0; i < 4; i++) {
      const daysAgo = i * 45 + 15;
      rotationPromises.push(
        prisma.grazingRotation.create({
          data: {
            farmId: farm.id,
            paddockId: paddock.id,
            moveInDate: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
            moveOutDate: new Date(Date.now() - (daysAgo - 7) * 24 * 60 * 60 * 1000),
            numberOfCattle: 15 + Math.floor(Math.random() * 25),
            preCoverKgDM: 2000 + Math.floor(Math.random() * 800),
            postCoverKgDM: 1400 + Math.floor(Math.random() * 400),
            grazingDays: 7,
            residualHeight: 5 + Math.random() * 2,
          },
        })
      );
    }
  }
  await Promise.all(rotationPromises);

  console.log('✅ Grazing rotations created');

  // Create Financial Records
  await prisma.financialRecord.createMany({
    data: [
      // Livestock Sales
      {
        farmId: farm.id,
        category: 'LIVESTOCK_SALES',
        type: 'INCOME',
        date: new Date('2025-02-15'),
        amount: 1850,
        vat: 0,
        description: 'Sale of 2 finished steers',
        supplier: 'Hereford Livestock Market',
        reference: 'HLM250215',
      },
      {
        farmId: farm.id,
        category: 'LIVESTOCK_SALES',
        type: 'INCOME',
        date: new Date('2025-01-20'),
        amount: 3200,
        vat: 0,
        description: 'Sale of 3 cull cows',
        supplier: 'Market Drayton Auction',
        reference: 'MDA250120',
      },
      // Feed Purchases
      {
        farmId: farm.id,
        category: 'FEED',
        type: 'EXPENSE',
        date: new Date('2025-02-01'),
        amount: 2450,
        vat: 490,
        description: 'Concentrate feed - 10 tonnes',
        supplier: 'ForFarmers UK',
        reference: 'FF12345',
      },
      {
        farmId: farm.id,
        category: 'FEED',
        type: 'EXPENSE',
        date: new Date('2025-01-15'),
        amount: 1200,
        vat: 240,
        description: 'Mineral supplements',
        supplier: 'Wynnstay',
        reference: 'WY67890',
      },
      // Vet & Medicine
      {
        farmId: farm.id,
        category: 'VET',
        type: 'EXPENSE',
        date: new Date('2025-02-10'),
        amount: 450,
        vat: 90,
        description: 'Routine herd health visit',
        supplier: 'Valley Veterinary Practice',
        reference: 'VVP789',
      },
      {
        farmId: farm.id,
        category: 'MEDICINE',
        type: 'EXPENSE',
        date: new Date('2025-01-25'),
        amount: 680,
        vat: 136,
        description: 'Vaccinations and treatments',
        supplier: 'MSD Animal Health',
        reference: 'MSD4567',
      },
      // AI Services
      {
        farmId: farm.id,
        category: 'BREEDING',
        type: 'EXPENSE',
        date: new Date('2025-02-05'),
        amount: 320,
        vat: 64,
        description: 'AI services - 8 cows',
        supplier: 'Genus ABS',
        reference: 'GEN2025',
      },
    ],
  });

  console.log('✅ Financial records created');

  // Create Invoices
  await prisma.invoice.createMany({
    data: [
      {
        farmId: farm.id,
        type: 'SALES',
        number: 'INV-2025-001',
        date: new Date('2025-02-15'),
        dueDate: new Date('2025-03-15'),
        customerSupplier: 'Hereford Livestock Market',
        description: 'Livestock sale',
        subtotal: 1850,
        vat: 0,
        total: 1850,
        status: 'PAID',
        paidDate: new Date('2025-02-16'),
      },
      {
        farmId: farm.id,
        type: 'PURCHASE',
        number: 'PUR-2025-012',
        date: new Date('2025-02-01'),
        dueDate: new Date('2025-03-01'),
        customerSupplier: 'ForFarmers UK',
        description: 'Concentrate feed',
        subtotal: 2450,
        vat: 490,
        total: 2940,
        status: 'PAID',
        paidDate: new Date('2025-02-10'),
      },
    ],
  });

  console.log('✅ Invoices created');

  // Create Grants
  await prisma.grant.createMany({
    data: [
      {
        farmId: farm.id,
        scheme: 'BPS',
        year: 2024,
        applicationDate: new Date('2024-05-15'),
        applicationRef: 'BPS2024-29123',
        claimAmount: 28500,
        approvedAmount: 28500,
        paymentReceived: 28500,
        paymentDate: new Date('2024-12-01'),
        status: 'PAID',
      },
      {
        farmId: farm.id,
        scheme: 'SFI',
        year: 2024,
        applicationDate: new Date('2024-06-01'),
        applicationRef: 'SFI2024-29123',
        claimAmount: 6200,
        approvedAmount: 6200,
        status: 'APPROVED',
      },
    ],
  });

  console.log('✅ Grants created');

  // Create Cattle Passports (for first 50 cattle)
  const passportPromises = [];
  for (const animal of cattle.slice(0, 50)) {
    passportPromises.push(
      prisma.cattlePassport.create({
        data: {
          farmId: farm.id,
          cattleId: animal.id,
          passportNumber: `UK${animal.tagNumber}P`,
          issueDate: animal.purchaseDate || new Date('2023-01-01'),
          breedDescription: animal.breed,
          identityMarks: `Tag: ${animal.tagNumber}`,
        },
      })
    );
  }
  await Promise.all(passportPromises);

  console.log('✅ Cattle passports created');

  console.log('🎉 Oakfield Farm seeded successfully!');
  console.log(`📊 Summary:`);
  console.log(`   • 1 farm (Oakfield Farm)`);
  console.log(`   • 3 users (Owner, Manager, Worker)`);
  console.log(`   • 10 paddocks (185.5 hectares total)`);
  console.log(`   • 200 cattle (120 dairy, 70 beef, 10 bulls)`);
  console.log(`   • ~750 weight records`);
  console.log(`   • ~160 breeding records`);
  console.log(`   • ~60 calving records`);
  console.log(`   • ~500 health records`);
  console.log(`   • ~900 sensor data points`);
  console.log(`   • 40 grazing rotations`);
  console.log(`   • Full financial records`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
