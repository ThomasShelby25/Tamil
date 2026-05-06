# PowerShell Setup Guide

## ✅ Status Check

Your environment is ready! Here's what's configured:

✅ `.env.local` - DATABASE_URL already set  
✅ Prisma schema - Ready  
✅ NPM scripts - Updated for PowerShell  
❌ Dev server - Still running on port 3000 (need to kill)  

---

## 🛠️ Step-by-Step PowerShell Commands

### Step 1: Kill Existing Dev Server
```powershell
taskkill /PID 28644 /F
```
Expected output: `SUCCESS: The process with PID 28644 has been terminated.`

### Step 2: Generate Prisma Client
```powershell
npx prisma generate
```

### Step 3: Apply Database Schema
```powershell
npx prisma db push
```
When prompted, type `y` and press Enter to confirm.

### Step 4: Seed Mock Data
```powershell
npm run seed:js
```
Wait 30-60 seconds for completion. You'll see:
```
🌱 Starting database seeding...
✅ Created 150 mock users
✅ Created 2500 mock transactions
✅ Created 5000 mock analytics events
✅ Created 30 system health records
✨ Mock data seeding completed!
```

### Step 5: Start Dev Server
```powershell
npm run dev
```
You'll see:
```
▲ Next.js 16.2.4
  - Local: http://localhost:3000
  - Ready in XXXms
```

### Step 6: View Your App
Open browser to: http://localhost:3000

---

## ⚡ Quick One-Liners (PowerShell)

### Option 1: Full Setup (Step-by-Step)
```powershell
taskkill /PID 28644 /F ; npx prisma generate ; npx prisma db push ; npm run seed:js ; npm run dev
```

### Option 2: Just Reset Data (Keep Running Server)
```powershell
npm run db:reset ; npm run seed:js
```

### Option 3: View Database GUI
```powershell
npx prisma studio
```

---

## 🔑 Important: PowerShell Syntax

In PowerShell, use **semicolon (`;`)** instead of `&&`:
- ❌ `npm run seed:js && npm run dev`
- ✅ `npm run seed:js ; npm run dev`

---

## 📋 Summary of Changes

Updated `package.json` scripts:
- `seed:js` → Now uses `npx ts-node` (works with TypeScript)
- `seed` → Now uses `npx ts-node` (same as seed:js)
- `db:setup` → Uses `;` instead of `&&` (PowerShell compatible)

---

## ✅ Next Steps

1. Copy-paste this command in PowerShell:
```powershell
taskkill /PID 28644 /F ; npx prisma db push ; npm run seed:js ; npm run dev
```

2. Wait for "Ready in XXXms" message

3. Open browser: http://localhost:3000

4. See real stats on homepage! 🎉

---

## 🐛 If Something Still Fails

### "DATABASE_URL not found"
- ✅ Already set in `.env.local`
- Make sure you're in `E:\Projects\Tamil` directory

### "Module not found"
- Run: `npm install`
- Then try again

### "Cannot connect to database"
- Make sure PostgreSQL is running
- Check DATABASE_URL in `.env.local` is correct

### Still getting errors?
Run each command separately:
```powershell
npx prisma generate
npx prisma db push  
npm run seed:js
npm run dev
```

---

## 📝 Useful Commands

| Command | What it does |
|---------|-------------|
| `npx prisma studio` | Open database GUI |
| `npx prisma generate` | Regenerate Prisma client |
| `npm run db:reset` | Delete all data (start fresh) |
| `taskkill /PID XXXX /F` | Kill process (replace XXXX with PID) |
| `Get-Process node` | List all Node.js processes |

---

**You're all set! Run this now:**
```powershell
taskkill /PID 28644 /F ; npx prisma db push ; npm run seed:js ; npm run dev
```
