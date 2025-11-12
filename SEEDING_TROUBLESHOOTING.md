# Database Seeding Troubleshooting Guide

## Common Errors & Solutions

---

## ❌ Error: "Unique constraint failed on `business_type_id`"

### Full Error Message:
```
PrismaClientKnownRequestError: 
Invalid `prisma.business_types.create()` invocation
Unique constraint failed on the fields: (`business_type_id`)
```

### Cause:
This error occurs when the PostgreSQL auto-increment sequence is out of sync with the actual data in the table. This typically happens when:
- Data was manually inserted without using the sequence
- The database was restored from a backup
- Previous seeding attempts were interrupted
- The sequence was manually reset incorrectly

### Solutions:

#### Solution 1: Reset the Sequences (Recommended)
Run this command to automatically fix all sequence issues:

```bash
npm run db:reset-sequences
```

Then run the seeding again:
```bash
npm run db:seed:data
```

#### Solution 2: Complete Database Reset
If you want to start completely fresh (⚠️ **WARNING: Deletes all data!**):

```bash
# Reset everything
npx prisma migrate reset

# Seed from scratch
npm run db:seed:all
```

#### Solution 3: Manual Sequence Reset (Advanced)
If you want to manually fix a specific table:

```sql
-- Connect to your database and run:
SELECT setval(
  pg_get_serial_sequence('business_types', 'business_type_id'),
  COALESCE((SELECT MAX(business_type_id) FROM business_types), 0) + 1,
  false
);
```

---

## ❌ Error: "User already exists"

### Error Message:
```
Unique constraint failed on the fields: (`email`)
```

### Cause:
A user with the same email already exists in the database.

### Solution:
The seed script is designed to handle this gracefully. If you see this as a warning (⚠️), it's normal - the script will skip creating duplicates. If it's an error, try:

```bash
# Option 1: Reset sequences and try again
npm run db:reset-sequences
npm run db:seed:data

# Option 2: Complete reset (deletes all data)
npx prisma migrate reset
npm run db:seed:all
```

---

## ❌ Error: "Currency not found" or "Price unit not found"

### Cause:
Reference tables (currencies, price_units) haven't been seeded yet.

### Solution:
Run reference table seeding first:

```bash
npm run db:seed:reference
npm run db:seed:data
```

Or use the combined command:
```bash
npm run db:seed:all
```

---

## ❌ Error: "Prisma Client not generated"

### Error Message:
```
Cannot find module '@prisma/client'
```

### Solution:
Generate the Prisma Client:

```bash
npm run db:generate
```

Then try seeding again:
```bash
npm run db:seed:all
```

---

## ❌ Error: "ts-node not found"

### Error Message:
```
'ts-node' is not recognized as an internal or external command
```

### Solution:
Install dependencies:

```bash
npm install
```

The `ts-node` package should be installed automatically. If the issue persists, install it explicitly:

```bash
npm install --save-dev ts-node
```

---

## ❌ Error: Database Connection Failed

### Error Message:
```
Can't reach database server at `localhost:5432`
```

### Solution:

1. **Check PostgreSQL is running:**
   ```bash
   # Windows (if using pg)
   pg_ctl status
   
   # Check if port 5432 is in use
   netstat -an | findstr "5432"
   ```

2. **Check your DATABASE_URL in `.env` file:**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   ```

3. **Test the connection:**
   ```bash
   npm run db:studio
   ```
   If Prisma Studio opens successfully, your connection is fine.

---

## ❌ Error: Foreign Key Constraint Failed

### Error Message:
```
Foreign key constraint failed on the field: `category_id`
```

### Cause:
Referenced data (like categories or business types) doesn't exist.

### Solution:
Always seed reference tables first:

```bash
npm run db:seed:reference  # Seeds currencies, units
npm run db:seed:data       # Seeds main data (depends on reference tables)
```

Or use:
```bash
npm run db:seed:all  # Does both in order
```

---

## ⚠️ Warning: Duplicate Data

### Message:
```
⚠ User already exists: manoj@manojtraders.com
⚠ Business already exists: Manoj Cricket Manufacturing
```

### Is This Normal?
**Yes!** These warnings are expected when:
- You run the seed script multiple times
- Some data already exists in your database

The script is **idempotent** - it won't create duplicates. It will:
- Skip existing users
- Skip existing businesses
- Skip existing products (by slug)
- Continue with the rest of the seeding process

### When to Worry:
Only worry if you see **errors** (❌), not warnings (⚠️).

---

## 🔍 Debugging Tips

### 1. Check What's in Your Database

View your data in Prisma Studio:
```bash
npm run db:studio
```
Open: http://localhost:5555

### 2. Check Specific Tables

```bash
# Open Prisma Studio and look at:
# - business_types (should have 6 entries)
# - categories (should have 10 entries)
# - users (should have your test users)
# - business (should have businesses linked to users)
```

### 3. Clear Specific Table Data

If you want to clear just one table and re-seed:

```sql
-- Example: Clear business_types only
TRUNCATE business_types CASCADE;

-- Reset the sequence
SELECT setval(pg_get_serial_sequence('business_types', 'business_type_id'), 1, false);
```

**⚠️ WARNING:** `CASCADE` will delete related data!

### 4. Check Logs

The seed script provides detailed output:
```
🌱 Starting comprehensive database seeding...
🏢 Seeding business types...
  ✓ Manufacturing
  ✓ Trading
  ⚠ Wholesale (already exists)  <- This is OK
✅ Seeded 6 business types
```

- ✓ = Successfully created
- ⚠️ = Already exists (skipped, this is OK)
- ❌ = Error (needs fixing)

---

## 🆘 Still Having Issues?

### Complete Clean Start

If nothing else works, here's the nuclear option:

```bash
# 1. Drop and recreate the database
npx prisma migrate reset

# 2. Generate Prisma Client
npm run db:generate

# 3. Seed everything fresh
npm run db:seed:all
```

This will:
- ✅ Drop all tables
- ✅ Recreate the schema
- ✅ Reset all sequences
- ✅ Seed fresh data

---

## 📞 Quick Reference Commands

```bash
# Reset sequences (fixes auto-increment issues)
npm run db:reset-sequences

# Seed only reference tables
npm run db:seed:reference

# Seed main data (users, products, orders, etc.)
npm run db:seed:data

# Seed everything
npm run db:seed:all

# View data
npm run db:studio

# Complete reset (⚠️ deletes all data)
npx prisma migrate reset && npm run db:seed:all

# Generate Prisma Client
npm run db:generate
```

---

## 🎯 Best Practices

1. **Always seed reference tables first:**
   ```bash
   npm run db:seed:reference  # First
   npm run db:seed:data       # Second
   ```

2. **Use `npm run db:seed:all` for convenience:**
   - It runs both commands in the correct order

3. **Reset sequences if you see auto-increment errors:**
   ```bash
   npm run db:reset-sequences
   ```

4. **Check Prisma Studio when in doubt:**
   ```bash
   npm run db:studio
   ```

5. **Complete reset for a fresh start:**
   ```bash
   npx prisma migrate reset
   npm run db:seed:all
   ```

---

## 📚 Related Documentation

- **Quick Start:** `SEEDING_QUICK_START.md`
- **Complete Guide:** `DATABASE_SEEDING_GUIDE.md`
- **API Testing:** `API_TESTING_EXAMPLES.md`
- **Authentication:** `AUTHENTICATION_GUIDE.md`

---

**Need more help?** Check the main documentation files or run `npm run db:studio` to inspect your database directly.

