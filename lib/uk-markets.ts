// Pre-seeded UK livestock markets (50+)
export interface UKMarket {
  name: string;
  location: string;
  county: string;
  postcode: string;
  marketDay: string;
  specialistSales: string;
}

export const UK_MARKETS: UKMarket[] = [
  { name: 'Hereford Livestock Market', location: 'Hereford', county: 'Herefordshire', postcode: 'HR4 9SX', marketDay: 'Wednesday', specialistSales: 'Store cattle, breeding stock' },
  { name: 'Shrewsbury Livestock Auction', location: 'Shrewsbury', county: 'Shropshire', postcode: 'SY1 4TW', marketDay: 'Tuesday', specialistSales: 'Prime cattle, dairy' },
  { name: 'Welshpool Livestock Market', location: 'Welshpool', county: 'Powys', postcode: 'SY21 7AZ', marketDay: 'Monday', specialistSales: 'Store cattle, sheep' },
  { name: 'Ludlow Livestock Market', location: 'Ludlow', county: 'Shropshire', postcode: 'SY8 1AW', marketDay: 'Monday', specialistSales: 'Store cattle' },
  { name: 'Leominster Market', location: 'Leominster', county: 'Herefordshire', postcode: 'HR6 8NZ', marketDay: 'Friday', specialistSales: 'Breeding stock' },
  { name: 'Chelford Livestock', location: 'Chelford', county: 'Cheshire', postcode: 'SK11 9AS', marketDay: 'Tuesday', specialistSales: 'Dairy, beef' },
  { name: 'Carlisle Livestock Market', location: 'Carlisle', county: 'Cumbria', postcode: 'CA2 7NB', marketDay: 'Monday', specialistSales: 'Prime & store cattle' },
  { name: 'Hexham Mart', location: 'Hexham', county: 'Northumberland', postcode: 'NE46 3SG', marketDay: 'Tuesday', specialistSales: 'Store cattle, sheep' },
  { name: 'Skipton Auction Mart', location: 'Skipton', county: 'North Yorkshire', postcode: 'BD23 1UD', marketDay: 'Monday', specialistSales: 'Prime cattle, dairy' },
  { name: 'Sedgemoor Auction Centre', location: 'Bridgwater', county: 'Somerset', postcode: 'TA6 6DF', marketDay: 'Wednesday', specialistSales: 'Store cattle, sheep' },
  { name: 'Exeter Livestock Centre', location: 'Exeter', county: 'Devon', postcode: 'EX2 8FD', marketDay: 'Thursday', specialistSales: 'Prime & store cattle' },
  { name: 'Truro Livestock Market', location: 'Truro', county: 'Cornwall', postcode: 'TR1 1XH', marketDay: 'Wednesday', specialistSales: 'Store cattle' },
  { name: 'Frome Livestock Market', location: 'Frome', county: 'Somerset', postcode: 'BA11 2AN', marketDay: 'Wednesday', specialistSales: 'Store cattle, sheep' },
  { name: 'Cirencester Market', location: 'Cirencester', county: 'Gloucestershire', postcode: 'GL7 1QD', marketDay: 'Friday', specialistSales: 'Prime cattle' },
  { name: 'Ross-on-Wye Market', location: 'Ross-on-Wye', county: 'Herefordshire', postcode: 'HR9 7QQ', marketDay: 'Thursday', specialistSales: 'Store cattle' },
  { name: 'Brecon Livestock Market', location: 'Brecon', county: 'Powys', postcode: 'LD3 7DS', marketDay: 'Tuesday', specialistSales: 'Store cattle, sheep' },
  { name: 'Builth Wells Market', location: 'Builth Wells', county: 'Powys', postcode: 'LD2 3SY', marketDay: 'Monday', specialistSales: 'Store cattle' },
  { name: 'Carmarthen Market', location: 'Carmarthen', county: 'Carmarthenshire', postcode: 'SA31 1QP', marketDay: 'Wednesday', specialistSales: 'Dairy, beef' },
  { name: 'Dolgellau Market', location: 'Dolgellau', county: 'Gwynedd', postcode: 'LL40 1UB', marketDay: 'Friday', specialistSales: 'Store cattle, sheep' },
  { name: 'Oswestry Livestock', location: 'Oswestry', county: 'Shropshire', postcode: 'SY11 1RE', marketDay: 'Monday', specialistSales: 'Store cattle' },
  { name: 'Market Drayton Livestock', location: 'Market Drayton', county: 'Shropshire', postcode: 'TF9 3NS', marketDay: 'Wednesday', specialistSales: 'Dairy, store cattle' },
  { name: 'Leek Livestock', location: 'Leek', county: 'Staffordshire', postcode: 'ST13 8DS', marketDay: 'Wednesday', specialistSales: 'Store cattle' },
  { name: 'Ashford Livestock Market', location: 'Ashford', county: 'Kent', postcode: 'TN23 1PF', marketDay: 'Tuesday', specialistSales: 'Store cattle' },
  { name: 'Canterbury Livestock', location: 'Canterbury', county: 'Kent', postcode: 'CT1 2TZ', marketDay: 'Monday', specialistSales: 'Store cattle' },
  { name: 'Melton Mowbray Market', location: 'Melton Mowbray', county: 'Leicestershire', postcode: 'LE13 1JY', marketDay: 'Tuesday', specialistSales: 'Store cattle, sheep' },
  { name: 'Newark Livestock Market', location: 'Newark', county: 'Nottinghamshire', postcode: 'NG24 1TN', marketDay: 'Wednesday', specialistSales: 'Prime cattle' },
  { name: 'Louth Livestock Market', location: 'Louth', county: 'Lincolnshire', postcode: 'LN11 0ED', marketDay: 'Friday', specialistSales: 'Store cattle' },
  { name: 'Hailsham Livestock Market', location: 'Hailsham', county: 'East Sussex', postcode: 'BN27 2AE', marketDay: 'Tuesday', specialistSales: 'Dairy, store cattle' },
  { name: 'Guildford Livestock', location: 'Guildford', county: 'Surrey', postcode: 'GU1 4AE', marketDay: 'Monday', specialistSales: 'Store cattle' },
  { name: 'Bury St Edmunds Market', location: 'Bury St Edmunds', county: 'Suffolk', postcode: 'IP33 3YB', marketDay: 'Wednesday', specialistSales: 'Prime cattle' },
  { name: 'Norwich Livestock', location: 'Norwich', county: 'Norfolk', postcode: 'NR2 4SF', marketDay: 'Thursday', specialistSales: 'Store cattle, dairy' },
  { name: 'York Livestock', location: 'York', county: 'North Yorkshire', postcode: 'YO23 1JZ', marketDay: 'Monday', specialistSales: 'Prime cattle' },
  { name: 'Darlington Auction Mart', location: 'Darlington', county: 'County Durham', postcode: 'DL1 2PG', marketDay: 'Monday', specialistSales: 'Store cattle, breeding' },
  { name: 'Penrith & District Farmers Mart', location: 'Penrith', county: 'Cumbria', postcode: 'CA11 0DN', marketDay: 'Tuesday', specialistSales: 'Hill cattle, sheep' },
  { name: 'Cockermouth Market', location: 'Cockermouth', county: 'Cumbria', postcode: 'CA13 9NR', marketDay: 'Monday', specialistSales: 'Store cattle' },
  { name: 'Longtown Mart', location: 'Longtown', county: 'Cumbria', postcode: 'CA6 5LY', marketDay: 'Thursday', specialistSales: 'Store cattle, sheep' },
  { name: 'Lancaster Auction Mart', location: 'Lancaster', county: 'Lancashire', postcode: 'LA1 3PE', marketDay: 'Thursday', specialistSales: 'Dairy, store cattle' },
  { name: 'Clitheroe Auction Mart', location: 'Clitheroe', county: 'Lancashire', postcode: 'BB7 2JE', marketDay: 'Tuesday', specialistSales: 'Store cattle' },
  { name: 'Bentham Auction Mart', location: 'Bentham', county: 'North Yorkshire', postcode: 'LA2 7HE', marketDay: 'Wednesday', specialistSales: 'Store cattle, sheep' },
  { name: 'Holmfirth Livestock', location: 'Holmfirth', county: 'West Yorkshire', postcode: 'HD9 2JT', marketDay: 'Friday', specialistSales: 'Store cattle' },
  { name: 'Bakewell Livestock Market', location: 'Bakewell', county: 'Derbyshire', postcode: 'DE45 1AZ', marketDay: 'Monday', specialistSales: 'Store cattle, sheep' },
  { name: 'Uttoxeter Livestock Centre', location: 'Uttoxeter', county: 'Staffordshire', postcode: 'ST14 8PF', marketDay: 'Wednesday', specialistSales: 'Dairy cattle' },
  { name: 'Rugeley Livestock', location: 'Rugeley', county: 'Staffordshire', postcode: 'WS15 2AX', marketDay: 'Tuesday', specialistSales: 'Store cattle' },
  { name: 'Knighton Livestock Market', location: 'Knighton', county: 'Powys', postcode: 'LD7 1DT', marketDay: 'Thursday', specialistSales: 'Store cattle, sheep' },
  { name: 'Monmouth Livestock Market', location: 'Monmouth', county: 'Monmouthshire', postcode: 'NP25 3HG', marketDay: 'Friday', specialistSales: 'Store cattle' },
  { name: 'Abergavenny Livestock Market', location: 'Abergavenny', county: 'Monmouthshire', postcode: 'NP7 5SD', marketDay: 'Tuesday', specialistSales: 'Store cattle, sheep' },
  { name: 'Haverfordwest Market', location: 'Haverfordwest', county: 'Pembrokeshire', postcode: 'SA61 1PY', marketDay: 'Tuesday', specialistSales: 'Dairy, store cattle' },
  { name: 'Stirling Agricultural Centre', location: 'Stirling', county: 'Stirlingshire', postcode: 'FK9 4RN', marketDay: 'Thursday', specialistSales: 'Prime & store cattle' },
  { name: 'Perth Livestock', location: 'Perth', county: 'Perthshire', postcode: 'PH1 3HR', marketDay: 'Monday', specialistSales: 'Pedigree, store cattle' },
  { name: 'Lanark Livestock Market', location: 'Lanark', county: 'South Lanarkshire', postcode: 'ML11 7RW', marketDay: 'Monday', specialistSales: 'Dairy, store cattle' },
  { name: 'Dumfries Livestock', location: 'Dumfries', county: 'Dumfries & Galloway', postcode: 'DG1 3PH', marketDay: 'Wednesday', specialistSales: 'Store cattle, breeding stock' },
  { name: 'Castle Douglas Market', location: 'Castle Douglas', county: 'Dumfries & Galloway', postcode: 'DG7 1TJ', marketDay: 'Monday', specialistSales: 'Galloway cattle, store cattle' },
];

// Mock historical price data by breed/weight/month
export interface PriceData {
  breed: string;
  category: string;
  avgPricePerKg: number;
  avgHeadPrice: number;
  month: string;
  trend: 'up' | 'down' | 'stable';
}

export const MOCK_PRICES: PriceData[] = [
  { breed: 'Aberdeen Angus', category: 'Store steers 300-400kg', avgPricePerKg: 2.85, avgHeadPrice: 998, month: 'Mar 2026', trend: 'up' },
  { breed: 'Aberdeen Angus', category: 'Store heifers 300-400kg', avgPricePerKg: 2.72, avgHeadPrice: 952, month: 'Mar 2026', trend: 'stable' },
  { breed: 'Hereford', category: 'Store steers 300-400kg', avgPricePerKg: 2.78, avgHeadPrice: 973, month: 'Mar 2026', trend: 'up' },
  { breed: 'Hereford', category: 'Store heifers 300-400kg', avgPricePerKg: 2.65, avgHeadPrice: 928, month: 'Mar 2026', trend: 'down' },
  { breed: 'Limousin', category: 'Store steers 300-400kg', avgPricePerKg: 2.95, avgHeadPrice: 1033, month: 'Mar 2026', trend: 'up' },
  { breed: 'Limousin', category: 'Store heifers 300-400kg', avgPricePerKg: 2.82, avgHeadPrice: 987, month: 'Mar 2026', trend: 'stable' },
  { breed: 'Charolais', category: 'Store steers 300-400kg', avgPricePerKg: 2.92, avgHeadPrice: 1022, month: 'Mar 2026', trend: 'up' },
  { breed: 'Charolais', category: 'Store heifers 300-400kg', avgPricePerKg: 2.80, avgHeadPrice: 980, month: 'Mar 2026', trend: 'stable' },
  { breed: 'Simmental', category: 'Store steers 300-400kg', avgPricePerKg: 2.75, avgHeadPrice: 963, month: 'Mar 2026', trend: 'down' },
  { breed: 'Holstein', category: 'Cull cows', avgPricePerKg: 1.45, avgHeadPrice: 870, month: 'Mar 2026', trend: 'stable' },
  { breed: 'Aberdeen Angus', category: 'Prime steers', avgPricePerKg: 4.85, avgHeadPrice: 2425, month: 'Mar 2026', trend: 'up' },
  { breed: 'Hereford', category: 'Prime steers', avgPricePerKg: 4.72, avgHeadPrice: 2360, month: 'Mar 2026', trend: 'up' },
  { breed: 'Limousin', category: 'Prime steers', avgPricePerKg: 4.95, avgHeadPrice: 2475, month: 'Mar 2026', trend: 'up' },
  { breed: 'Charolais', category: 'Prime steers', avgPricePerKg: 4.90, avgHeadPrice: 2450, month: 'Mar 2026', trend: 'stable' },
  { breed: 'Aberdeen Angus', category: 'Breeding heifers', avgPricePerKg: 3.20, avgHeadPrice: 1600, month: 'Mar 2026', trend: 'up' },
  { breed: 'Hereford', category: 'Breeding heifers', avgPricePerKg: 3.10, avgHeadPrice: 1550, month: 'Mar 2026', trend: 'stable' },
];
