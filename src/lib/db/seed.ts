import { prisma } from "./prisma";

const countries = ["USA", "UK", "India", "Singapore", "Japan", "Germany", "Canada", "Australia", "UAE", "Brazil"];
const currencies = ["USD", "EUR", "GBP", "INR", "SGD", "JPY"];

export async function seedMockData() {
  console.log("🌱 Seeding mock data...");

  // Clear existing data
  await prisma.analyticsEvent.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.systemHealth.deleteMany({});

  // Create mock users
  const users = await Promise.all(
    Array.from({ length: 150 }).map((_, i) =>
      prisma.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          name: `User ${i + 1}`,
          country: countries[Math.floor(Math.random() * countries.length)],
          userType: ["free", "pro", "enterprise"][Math.floor(Math.random() * 3)],
          isActive: Math.random() > 0.2,
          totalTransactions: Math.floor(Math.random() * 500),
          totalVolume: Math.floor(Math.random() * 5000000) / 100,
        },
      })
    )
  );

  console.log(`✅ Created ${users.length} mock users`);

  // Create mock transactions
  const transactions = await Promise.all(
    Array.from({ length: 2500 }).map(() => {
      const user = users[Math.floor(Math.random() * users.length)];
      const statuses = ["completed", "pending", "failed"];
      const amount = Math.floor(Math.random() * 1000000) / 100;

      return prisma.transaction.create({
        data: {
          userId: user.id,
          amount,
          currency: currencies[Math.floor(Math.random() * currencies.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          transactionType: ["transfer", "settlement", "payment"][Math.floor(Math.random() * 3)],
          fromCountry: countries[Math.floor(Math.random() * countries.length)],
          toCountry: countries[Math.floor(Math.random() * countries.length)],
          processingTime: Math.floor(Math.random() * 5000) + 100,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        },
      });
    })
  );

  console.log(`✅ Created ${transactions.length} mock transactions`);

  // Create mock analytics events
  const events = await Promise.all(
    Array.from({ length: 5000 }).map(() => {
      const user = Math.random() > 0.2 ? users[Math.floor(Math.random() * users.length)] : null;
      const eventTypes = ["page_view", "button_click", "form_submit", "transaction_initiated", "signup", "login"];

      return prisma.analyticsEvent.create({
        data: {
          userId: user?.id,
          eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          eventName: `Event ${Math.floor(Math.random() * 100)}`,
          sourceUrl: `/page-${Math.floor(Math.random() * 10)}`,
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        },
      });
    })
  );

  console.log(`✅ Created ${events.length} mock analytics events`);

  // Create system health records
  const healthRecords = await Promise.all(
    Array.from({ length: 30 }).map((_, i) =>
      prisma.systemHealth.create({
        data: {
          status: Math.random() > 0.95 ? "degraded" : "healthy",
          uptime: 99.5 + Math.random() * 0.5,
          responseTime: Math.floor(Math.random() * 300) + 50,
          errorCount: Math.floor(Math.random() * 50),
          requestCount: Math.floor(Math.random() * 10000) + 1000,
          database: Math.random() > 0.98 ? "degraded" : "healthy",
          emailService: Math.random() > 0.97 ? "degraded" : "healthy",
          createdAt: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000),
        },
      })
    )
  );

  console.log(`✅ Created ${healthRecords.length} system health records`);

  console.log("✨ Mock data seeding completed!");
  return {
    users: users.length,
    transactions: transactions.length,
    events: events.length,
    healthRecords: healthRecords.length,
  };
}

// Run this if called directly
if (require.main === module) {
  seedMockData()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
