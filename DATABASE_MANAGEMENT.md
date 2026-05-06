# Database Migrations & Management

## Current Schema

The database is managed with Prisma. The current schema includes:

### ContactSubmission Model
```prisma
model ContactSubmission {
  id                     String   @id @default(cuid())
  name                   String
  email                  String
  message                String
  sourceIp               String?
  confirmationEmailSent  Boolean  @default(false)
  notificationEmailSent  Boolean  @default(false)
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt
}
```

## Creating New Tables

### 1. Add Model to schema.prisma
```prisma
model NewTable {
  id        String   @id @default(cuid())
  field1    String
  field2    Int
  createdAt DateTime @default(now())
}
```

### 2. Apply Schema
```bash
npx prisma db push
```

This will create the table in PostgreSQL.

### 3. Generate Prisma Client
```bash
npx prisma generate
```

## Viewing Data

### Using Prisma Studio (GUI)
```bash
npx prisma studio
```
Opens browser interface to view/edit data.

### Using psql (Command Line)
```bash
psql -U postgres -d Velsaim

# List all tables
\dt

# View table structure
\d "ContactSubmission"

# Query data
SELECT * FROM "ContactSubmission";
```

## Backup Strategy

### Local Development
```bash
# Backup database
pg_dump -U postgres -d Velsaim > backup-$(date +%Y%m%d).sql

# Restore from backup
psql -U postgres -d Velsaim < backup.sql
```

### Production
- Use managed database service (RDS, Azure Database, etc.) with automated backups
- Set retention policy (30+ days recommended)
- Test restore procedures regularly

## Performance Optimization

### Index Strategy
Add indexes for frequently queried fields:
```prisma
model ContactSubmission {
  id                     String   @id @default(cuid())
  name                   String
  email                  String   @db.VarChar(255)
  message                String
  sourceIp               String?
  confirmationEmailSent  Boolean  @default(false)
  notificationEmailSent  Boolean  @default(false)
  createdAt              DateTime @default(now()) @db.Timestamp()
  updatedAt              DateTime @updatedAt

  @@index([email])
  @@index([createdAt])
  @@index([sourceIp])
}
```

Then apply:
```bash
npx prisma db push
```

## Connection Pooling

For production, use PgBouncer or similar:
```
DATABASE_URL=postgresql://user:pass@pgbouncer-host:5432/dbname
```

## Monitoring

### Check Database Size
```bash
SELECT pg_size_pretty(pg_database_size('Velsaim'));
```

### Check Slow Queries
```bash
SELECT query, mean_exec_time, calls 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;
```
