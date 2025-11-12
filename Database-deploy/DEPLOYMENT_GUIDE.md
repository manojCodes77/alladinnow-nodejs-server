# Database Deployment Guide - Neon.tech

## Your Current Database Tables (17 tables)

### Core Tables
1. **users** - User accounts and authentication
2. **business_types** - Types of businesses  
3. **business** - Business profiles
4. **business_documents** - Business verification documents
5. **business_connections** - Buyer-seller relationships

### Product & Category Tables
6. **categories** - Product categories (hierarchical)
7. **currencies** - Currency reference data
8. **price_units** - Units of measurement
9. **products** - Product catalog
10. **product_images** - Product photos

### Transaction Tables
11. **orders** - Purchase orders
12. **order_items** - Individual items in orders
13. **reviews** - Business reviews and ratings
14. **inquiries** - Buyer inquiries
15. **quotations** - Seller quotations

### Prisma Meta Table
16. **_prisma_migrations** - Prisma migration history (auto-created)

---

## Step-by-Step Deployment Process

### Step 1: Set up Neon.tech Database

1. Go to https://neon.tech and sign in
2. Create a new project
3. Copy your connection string (it will look like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Update Your Environment Variables

1. Create/Update `.env` file in your server root:
   ```bash
   # For Production (Neon.tech)
   DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   
   # Keep your local for development
   # DATABASE_URL=postgresql://postgres:jaishreeram@localhost:5432/alladinnow
   
   PORT=8080
   ```

### Step 3: Deploy Schema to Neon.tech

Run this command to create all tables in Neon:
```bash
npx prisma migrate deploy
```

Or if you want to reset and create fresh:
```bash
npx prisma migrate reset
npx prisma migrate deploy
```

### Step 4: Export Data from Local Database

**Option A: Export All Data (Recommended)**
```bash
# Export all data from local PostgreSQL
pg_dump -h localhost -p 5432 -U postgres -d alladinnow -F c -b -v -f alladinnow_backup.dump
```

**Option B: Export Only Data (no schema)**
```bash
pg_dump -h localhost -p 5432 -U postgres -d alladinnow --data-only -F c -b -v -f alladinnow_data.dump
```

**Option C: Export as SQL file**
```bash
pg_dump -h localhost -p 5432 -U postgres -d alladinnow > alladinnow_backup.sql
```

### Step 5: Import Data to Neon.tech

**For .dump files:**
```bash
# First, parse Neon connection string
# From: postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
# Extract: host, port, username, database

pg_restore -h ep-xxx.region.aws.neon.tech -p 5432 -U username -d neondb --data-only -v alladinnow_data.dump
```

**For .sql files:**
```bash
psql "postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require" < alladinnow_backup.sql
```

### Step 6: Seed Reference Data (If needed)

If you need to populate reference tables:
```bash
npx ts-node src/config/seed-currencies.ts
npx ts-node src/config/seed-price-units.ts
npx ts-node src/config/seed-categories.ts
```

### Step 7: Verify Deployment

```bash
# Check database connection
npx prisma db pull

# Verify data
npx prisma studio
```

---

## Alternative: Using Prisma Migrate for Clean Deploy

If you want to start fresh on Neon (recommended for production):

```bash
# 1. Point DATABASE_URL to Neon
# 2. Run migrations
npx prisma migrate deploy

# 3. Seed reference data
npx ts-node src/config/seed-reference-tables.ts

# 4. Generate Prisma Client
npx prisma generate
```

---

## Important Notes

### 🔒 Security
- Never commit `.env` file with production credentials
- Use environment variables in your deployment platform
- Enable SSL connections (Neon requires it)

### 📊 Data Considerations
- **Reference Tables**: currencies, price_units, business_types, categories
  - These should be seeded using scripts
  
- **User Data**: users, business, products, orders
  - Export from local and import to production
  - Or start fresh and let users create new data

### 🔄 Migration Strategy
- Keep local and production databases in sync using Prisma migrations
- Always test migrations locally first
- Use `prisma migrate deploy` for production (never `migrate dev`)

---

## Quick Commands Reference

```bash
# Check current schema
npx prisma db pull

# Apply migrations to production
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Check migration status
npx prisma migrate status

# Create new migration
npx prisma migrate dev --name description_of_changes
```

---

## Troubleshooting

### Connection Issues
- Ensure SSL is enabled in connection string
- Check firewall/security groups in Neon dashboard
- Verify connection string format

### Migration Issues
- Run `npx prisma migrate status` to check state
- Use `npx prisma migrate resolve` for failed migrations
- Check Neon logs in dashboard

### Data Import Issues
- Ensure schema exists before importing data
- Disable foreign key checks if needed
- Import in correct order (parent tables first)

---

## Need Help?

Run the automated deployment script:
```bash
npm run deploy:setup
```
