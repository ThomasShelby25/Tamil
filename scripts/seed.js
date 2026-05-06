#!/usr/bin/env node

/**
 * Database Seeding Script (JavaScript)
 * 
 * Usage:
 *   npm run seed:js
 *   node scripts/seed.js
 * 
 * This script populates the database with mock data for development/testing
 */

// Use dynamic import to load the TypeScript seed module
(async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Import the seed function from the TypeScript file
    // The TypeScript file will be compiled by Next.js/Prisma
    const { seedMockData } = await import('../src/lib/db/seed.ts');

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
    console.error('\n📝 Troubleshooting:');
    console.error('   1. Make sure DATABASE_URL is set in .env.local');
    console.error('   2. Make sure PostgreSQL is running');
    console.error('   3. Try: npm run db:push first');
    process.exit(1);
  }
})();
