# Database Seeding Guide

This guide explains how to seed your database with mock data for development and testing.

## Quick Start

Run all database setup in one command:

```bash
npm run db:setup
```

This runs:
1. `npm run db:push` - Apply schema changes
2. `npm run seed:js` - Load mock data

---

## Available Seeding Commands

### 🎯 Recommended (Node.js - Works everywhere)
```bash
npm run seed:js
```
- ✅ Works on Windows, Mac, Linux
- ✅ No additional tools needed
- ✅ Fastest execution
- ✅ **Recommended for beginners**

### 🔧 Alternative (TypeScript)
```bash
npm run seed
```
- Requires `ts-node` to be installed
- More flexible for development
- Slower than JavaScript version

### 📚 Using Prisma
```bash
npm run db:seed
```
- Uses Prisma's built-in seed command
- Requires proper seed configuration
- Configured in `package.json` under `"prisma"`

### 🗑️ Reset Database (Destructive)
```bash
npm run db:reset
```
- ⚠️ **WARNING: Deletes all data**
- Useful for fresh start
- Then run `npm run seed:js` to re-populate

---

## What Gets Seeded

When you run the seeding script, it creates:

### Users Table (150 records)
```
├─ Random names
├─ Random emails
├─ Mixed user types (free, pro, enterprise)
├─ Random countries
└─ Activity status (active/inactive)
```

### Transactions Table (2,500 records)
```
├─ Amounts: $0 - $10,000
├─ Status: pending, completed, failed
├─ Types: transfer, settlement, payment
├─ Cross-border routing data
└─ Distributed over 30 days
```

### Analytics Events Table (5,000 records)
```
├─ Event types: page_view, click, submit, etc.
├─ User tracking
├─ IP addresses and user agents
└─ Timestamps over 30 days
```

### System Health Table (30 records)
```
├─ Uptime: 99.5% - 100%
├─ Response times: 50-350ms
├─ Database status
├─ Email service status
└─ One record per day for 30 days
```

---

## Seeding in Different Scenarios

### 📋 First Time Setup
```bash
# 1. Create database schema
npm run db:push

# 2. Generate Prisma client
npm run db:generate

# 3. Load mock data
npm run seed:js

# 4. Start development
npm run dev
```

Or use the all-in-one command:
```bash
npm run db:setup && npm run dev
```

### 🔄 Resetting Development Environment
```bash
# Clear and re-seed everything
npm run db:reset
npm run seed:js
```

### 🏗️ Production Setup (Do NOT seed production!)
```bash
# Only apply schema, never seed mock data
npm run db:push
# Then import real data from your sources
```

### 🧪 Testing
```bash
# Fresh data for each test run
npm run seed:js

# Run tests
npm test

# Reset after tests
npm run db:reset
```

---

## Manual Data Management

### View Data in GUI
```bash
npm run db:studio
```
Opens Prisma Studio in your browser - full GUI to view and edit data.

### Query Data with psql (PostgreSQL)
```bash
psql -U postgres -d Velsaim

-- View all tables
\dt

-- View users
SELECT * FROM "User" LIMIT 10;

-- View transactions
SELECT * FROM "Transaction" LIMIT 10;

-- Count records
SELECT COUNT(*) FROM "User";
SELECT COUNT(*) FROM "Transaction";
```

### Clear Specific Tables
```sql
-- Clear all data but keep schema
DELETE FROM "AnalyticsEvent";
DELETE FROM "Transaction";
DELETE FROM "User";
DELETE FROM "SystemHealth";
DELETE FROM "ContactSubmission";
```

---

## Environment Variables

Make sure these are set before seeding:

```env
# Required
DATABASE_URL=postgresql://user:password@localhost:5432/Velsaim

# Optional (for features)
ADMIN_API_KEY=your-secret-key
RESEND_API_KEY=your-resend-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## Troubleshooting

### ❌ "DATABASE_URL not set"
```bash
# Add to .env
DATABASE_URL=postgresql://user:password@localhost:5432/Velsaim
```

### ❌ "Connection refused"
PostgreSQL service might not be running:
```bash
# Windows
net start postgresql-x64-15

# Mac
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### ❌ "Error: connect ENOENT /var/run/postgresql/.s.PGSQL.5432"
Try connecting to a TCP socket instead:
```env
DATABASE_URL=postgresql://user:password@127.0.0.1:5432/Velsaim
```

### ❌ "Seed script not found"
Make sure you're in the project root:
```bash
cd ~/Projects/Tamil
npm run seed:js
```

### ❌ "Permission denied"
Make scripts executable:
```bash
chmod +x scripts/seed.js
chmod +x scripts/seed.ts
```

---

## Seed Script Files

| File | Purpose |
|------|---------|
| `scripts/seed.js` | JavaScript seed script (recommended) |
| `scripts/seed.ts` | TypeScript seed script |
| `src/lib/db/seed.ts` | Core seeding logic |
| `package.json` | NPM scripts configuration |

---

## Seeding with Custom Data

To seed with your own data instead of mock data, modify `src/lib/db/seed.ts`:

```typescript
export async function seedMockData() {
  // Replace mock data generation with:
  
  // 1. Import real users
  const users = await importUsersFromAPI();
  
  // 2. Import real transactions
  const transactions = await importTransactionsFromAPI();
  
  // 3. Import real analytics
  const events = await importAnalyticsFromAPI();
  
  // Then run:
  npm run seed:js
}
```

---

## Performance Notes

- **2,500 transactions** take ~5-10 seconds to seed
- **5,000 analytics events** take ~8-15 seconds
- Total seed time: **15-30 seconds** depending on database performance
- Safe to run multiple times (clears existing data first)

---

## Next Steps

After seeding:

1. ✅ Start development: `npm run dev`
2. ✅ Check homepage: `http://localhost:3000` (see real stats)
3. ✅ View admin: `http://localhost:3000/admin` (login required)
4. ✅ Open Prisma Studio: `npm run db:studio`
5. ✅ View database directly: `psql -U postgres -d Velsaim`

---

## Questions?

See these files for more info:
- [QUICK_START.md](./QUICK_START.md) - 5-minute setup
- [REAL_TIME_DATA_SETUP.md](./REAL_TIME_DATA_SETUP.md) - Technical details
- [README.md](./README.md) - Project overview
