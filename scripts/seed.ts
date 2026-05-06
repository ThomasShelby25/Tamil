#!/usr/bin/env node

/**
 * Database Seeding Script
 * 
 * Usage:
 *   npm run seed:js
 *   npm run seed
 *   node scripts/seed.js
 *   npx ts-node scripts/seed.ts
 * 
 * This script populates the database with mock data for development/testing
 */

import { seedMockData } from '../src/lib/db/seed';

async function main() {
  console.log('🌱 Starting database seeding...\n');

  try {
    const result = await seedMockData();

    console.log('\n📊 Seeding Summary:');
    console.log(`   Users created: ${result.users}`);
    console.log(`   Transactions created: ${result.transactions}`);
    console.log(`   Events created: ${result.events}`);
    console.log(`   Health records created: ${result.healthRecords}`);

    console.log('\n✨ Database seeding completed successfully!\n');
    console.log('📝 Next steps:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Visit: http://localhost:3000');
    console.log('   3. Admin: http://localhost:3000/admin\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
