# Database Management Commands

Quick reference for all database and seeding commands available in this project.

## 📋 Command Reference

### Database Management

| Command | Purpose | Environment |
|---------|---------|-------------|
| `npm run db:push` | Apply schema changes to database | dev/prod |
| `npm run db:generate` | Generate Prisma client | dev/prod |
| `npm run db:studio` | Open Prisma Studio GUI | dev only |
| `npm run db:reset` | ⚠️ Delete all data & re-apply schema | dev only |

### Seeding (Loading Mock Data)

| Command | Purpose | Recommended | Speed |
|---------|---------|-------------|-------|
| `npm run db:setup` | Setup DB + seed (all-in-one) | ✅ YES | - |
| `npm run seed:js` | Load mock data (Node.js) | ✅ YES | Fast |
| `npm run seed` | Load mock data (TypeScript) | - | Slow |
| `npm run db:seed` | Load via Prisma seed | - | Medium |

### Combined Commands

| Command | What it does |
|---------|-------------|
| `npm run db:setup` | `db:push` + `seed:js` |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |

### Direct Database Access

| Command | Purpose |
|---------|---------|
| `npm run db:studio` | GUI interface to database |
| `psql -U postgres -d Velsaim` | PostgreSQL CLI |

---

## 🚀 Quick Start Workflow

### First Time Setup
```bash
npm run db:setup && npm run dev
```
Done! Visit http://localhost:3000

### Fresh Start (Reset everything)
```bash
npm run db:reset
npm run seed:js
npm run dev
```

### Just Reseed (Keep schema)
```bash
npm run db:reset
npm run seed:js
```

### View Data GUI
```bash
npm run db:studio
```

---

## 📊 What Each Script Does

### `npm run db:push`
- Applies Prisma schema to PostgreSQL database
- Creates/updates tables
- Safe to run multiple times

### `npm run seed:js`
- Clears existing data
- Creates 150 mock users
- Creates 2,500 mock transactions
- Creates 5,000 mock analytics events
- Creates 30 system health records
- Displays summary

### `npm run db:reset`
- **WARNING: Deletes all data!**
- Resets database to schema-only state
- Use before `npm run seed:js` for fresh start

### `npm run dev`
- Starts Next.js dev server
- Hot reload enabled
- Runs on http://localhost:3000

---

## 🎯 Common Workflows

### Scenario 1: First Time Developer
```bash
# Step 1: Apply database schema
npm run db:push

# Step 2: Generate Prisma client
npm run db:generate

# Step 3: Load mock data
npm run seed:js

# Step 4: Start developing
npm run dev

# Result: http://localhost:3000 with real stats
```

Or in one command:
```bash
npm run db:setup && npm run dev
```

### Scenario 2: Resetting After Breaking Things
```bash
npm run db:reset
npm run seed:js
npm run dev
```

### Scenario 3: Checking Data
```bash
npm run db:studio
# Opens http://localhost:5555 with full GUI
```

### Scenario 4: Production Deployment
```bash
# Only apply schema - NEVER seed production!
npm run db:push

# Then import real data from your sources
# DO NOT run: npm run seed:js
```

---

## ✅ Verification After Setup

After running `npm run db:setup`, verify:

```bash
# Check if dev server starts
npm run dev

# In browser:
# Homepage should show real stats:
#   - Global Users: 150
#   - Transactions: ~$125K+
#   - Uptime: 99.99%

# Admin should work:
#   - http://localhost:3000/admin
#   - No API key needed with mock data
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| DATABASE_URL not set | Add to `.env`: `DATABASE_URL=postgresql://...` |
| Connection refused | Start PostgreSQL service |
| Schema mismatch | Run `npm run db:push` |
| No data on homepage | Run `npm run seed:js` |
| Prisma client missing | Run `npm run db:generate` |

---

## 📁 Script Files Location

```
scripts/
├── seed.js          ← Seed script (JavaScript - recommended)
└── seed.ts          ← Seed script (TypeScript)

src/lib/db/
└── seed.ts          ← Core seeding logic
```

---

## 📖 More Information

- **Setup Guide**: See [QUICK_START.md](./QUICK_START.md)
- **Detailed Guide**: See [SEEDING.md](./SEEDING.md)
- **Technical Details**: See [REAL_TIME_DATA_SETUP.md](./REAL_TIME_DATA_SETUP.md)

---

## 🎉 You're Ready!

All commands are ready to use. Start with:
```bash
npm run db:setup && npm run dev
```

Then visit http://localhost:3000 🚀
