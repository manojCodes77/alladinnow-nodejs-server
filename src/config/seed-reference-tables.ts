import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Common currencies for B2B marketplace
const currencies = [
  { currency_code: 'USD', currency_name: 'US Dollar', symbol: '$', display_order: 1 },
  { currency_code: 'EUR', currency_name: 'Euro', symbol: '€', display_order: 2 },
  { currency_code: 'GBP', currency_name: 'British Pound', symbol: '£', display_order: 3 },
  { currency_code: 'JPY', currency_name: 'Japanese Yen', symbol: '¥', display_order: 4 },
  { currency_code: 'CNY', currency_name: 'Chinese Yuan', symbol: '¥', display_order: 5 },
  { currency_code: 'INR', currency_name: 'Indian Rupee', symbol: '₹', display_order: 6 },
  { currency_code: 'AUD', currency_name: 'Australian Dollar', symbol: 'A$', display_order: 7 },
  { currency_code: 'CAD', currency_name: 'Canadian Dollar', symbol: 'C$', display_order: 8 },
  { currency_code: 'CHF', currency_name: 'Swiss Franc', symbol: 'CHF', display_order: 9 },
  { currency_code: 'SGD', currency_name: 'Singapore Dollar', symbol: 'S$', display_order: 10 },
  { currency_code: 'HKD', currency_name: 'Hong Kong Dollar', symbol: 'HK$', display_order: 11 },
  { currency_code: 'AED', currency_name: 'UAE Dirham', symbol: 'د.إ', display_order: 12 },
  { currency_code: 'SAR', currency_name: 'Saudi Riyal', symbol: 'ر.س', display_order: 13 },
  { currency_code: 'KRW', currency_name: 'South Korean Won', symbol: '₩', display_order: 14 },
  { currency_code: 'BRL', currency_name: 'Brazilian Real', symbol: 'R$', display_order: 15 },
  { currency_code: 'MXN', currency_name: 'Mexican Peso', symbol: '$', display_order: 16 },
  { currency_code: 'ZAR', currency_name: 'South African Rand', symbol: 'R', display_order: 17 },
  { currency_code: 'RUB', currency_name: 'Russian Ruble', symbol: '₽', display_order: 18 },
  { currency_code: 'TRY', currency_name: 'Turkish Lira', symbol: '₺', display_order: 19 },
  { currency_code: 'NZD', currency_name: 'New Zealand Dollar', symbol: 'NZ$', display_order: 20 },
];

// Common price units for B2B products
const priceUnits = [
  // Quantity-based
  { unit_code: 'piece', unit_name: 'Piece', unit_type: 'quantity', abbreviation: 'pc', display_order: 1 },
  { unit_code: 'dozen', unit_name: 'Dozen', unit_type: 'quantity', abbreviation: 'doz', display_order: 2 },
  { unit_code: 'set', unit_name: 'Set', unit_type: 'quantity', abbreviation: 'set', display_order: 3 },
  { unit_code: 'pair', unit_name: 'Pair', unit_type: 'quantity', abbreviation: 'pr', display_order: 4 },
  { unit_code: 'pack', unit_name: 'Pack', unit_type: 'quantity', abbreviation: 'pk', display_order: 5 },
  { unit_code: 'box', unit_name: 'Box', unit_type: 'quantity', abbreviation: 'box', display_order: 6 },
  { unit_code: 'carton', unit_name: 'Carton', unit_type: 'quantity', abbreviation: 'ctn', display_order: 7 },
  { unit_code: 'pallet', unit_name: 'Pallet', unit_type: 'quantity', abbreviation: 'plt', display_order: 8 },
  { unit_code: 'container', unit_name: 'Container', unit_type: 'quantity', abbreviation: 'cont', display_order: 9 },
  { unit_code: 'unit', unit_name: 'Unit', unit_type: 'quantity', abbreviation: 'unit', display_order: 10 },
  
  // Weight-based
  { unit_code: 'kg', unit_name: 'Kilogram', unit_type: 'weight', abbreviation: 'kg', display_order: 11 },
  { unit_code: 'g', unit_name: 'Gram', unit_type: 'weight', abbreviation: 'g', display_order: 12 },
  { unit_code: 'mg', unit_name: 'Milligram', unit_type: 'weight', abbreviation: 'mg', display_order: 13 },
  { unit_code: 'ton', unit_name: 'Metric Ton', unit_type: 'weight', abbreviation: 't', display_order: 14 },
  { unit_code: 'lb', unit_name: 'Pound', unit_type: 'weight', abbreviation: 'lb', display_order: 15 },
  { unit_code: 'oz', unit_name: 'Ounce', unit_type: 'weight', abbreviation: 'oz', display_order: 16 },
  
  // Volume-based
  { unit_code: 'liter', unit_name: 'Liter', unit_type: 'volume', abbreviation: 'L', display_order: 17 },
  { unit_code: 'ml', unit_name: 'Milliliter', unit_type: 'volume', abbreviation: 'mL', display_order: 18 },
  { unit_code: 'm3', unit_name: 'Cubic Meter', unit_type: 'volume', abbreviation: 'm³', display_order: 19 },
  { unit_code: 'gallon', unit_name: 'Gallon', unit_type: 'volume', abbreviation: 'gal', display_order: 20 },
  { unit_code: 'barrel', unit_name: 'Barrel', unit_type: 'volume', abbreviation: 'bbl', display_order: 21 },
  
  // Length-based
  { unit_code: 'meter', unit_name: 'Meter', unit_type: 'length', abbreviation: 'm', display_order: 22 },
  { unit_code: 'cm', unit_name: 'Centimeter', unit_type: 'length', abbreviation: 'cm', display_order: 23 },
  { unit_code: 'mm', unit_name: 'Millimeter', unit_type: 'length', abbreviation: 'mm', display_order: 24 },
  { unit_code: 'km', unit_name: 'Kilometer', unit_type: 'length', abbreviation: 'km', display_order: 25 },
  { unit_code: 'inch', unit_name: 'Inch', unit_type: 'length', abbreviation: 'in', display_order: 26 },
  { unit_code: 'foot', unit_name: 'Foot', unit_type: 'length', abbreviation: 'ft', display_order: 27 },
  { unit_code: 'yard', unit_name: 'Yard', unit_type: 'length', abbreviation: 'yd', display_order: 28 },
  
  // Area-based
  { unit_code: 'm2', unit_name: 'Square Meter', unit_type: 'area', abbreviation: 'm²', display_order: 29 },
  { unit_code: 'sqft', unit_name: 'Square Foot', unit_type: 'area', abbreviation: 'sq ft', display_order: 30 },
  
  // Special units
  { unit_code: 'roll', unit_name: 'Roll', unit_type: 'special', abbreviation: 'roll', display_order: 31 },
  { unit_code: 'bag', unit_name: 'Bag', unit_type: 'special', abbreviation: 'bag', display_order: 32 },
  { unit_code: 'bottle', unit_name: 'Bottle', unit_type: 'special', abbreviation: 'btl', display_order: 33 },
  { unit_code: 'can', unit_name: 'Can', unit_type: 'special', abbreviation: 'can', display_order: 34 },
  { unit_code: 'sheet', unit_name: 'Sheet', unit_type: 'special', abbreviation: 'sht', display_order: 35 },
];

async function seedReferenceTables() {
  console.log('🌱 Starting reference tables seeding...\n');

  try {
    // Seed Currencies
    console.log('💰 Seeding currencies...');
    for (const currency of currencies) {
      await prisma.currencies.upsert({
        where: { currency_code: currency.currency_code },
        update: {},
        create: currency,
      });
      console.log(`  ✓ ${currency.currency_code} - ${currency.currency_name}`);
    }
    console.log(`✅ Successfully seeded ${currencies.length} currencies\n`);

    // Seed Price Units
    console.log('📏 Seeding price units...');
    for (const unit of priceUnits) {
      await prisma.price_units.upsert({
        where: { unit_code: unit.unit_code },
        update: {},
        create: unit,
      });
      console.log(`  ✓ ${unit.unit_code} - ${unit.unit_name} (${unit.unit_type})`);
    }
    console.log(`✅ Successfully seeded ${priceUnits.length} price units\n`);

    console.log('🎉 All reference tables seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding reference tables:', error);
    throw error;
  }
}

seedReferenceTables()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
