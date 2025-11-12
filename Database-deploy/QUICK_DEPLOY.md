# Quick Start - Deploy to Neon.tech

## 🎯 Your Database Has 15 Main Tables

### Core Tables (5)
- `users` - User accounts and authentication
- `business_types` - Types of businesses
- `business` - Business profiles
- `business_documents` - Business verification documents
- `business_connections` - Buyer-seller relationships

### Product & Catalog Tables (6)
- `categories` - Product categories (hierarchical structure)
- `currencies` - Currency reference (USD, INR, EUR, etc.)
- `price_units` - Units of measurement (kg, piece, liter, ton, etc.)
- `products` - Product catalog with pricing
- `product_images` - Product photos

### Transaction Tables (4)
- `orders` - Purchase orders
- `order_items` - Individual items in orders
- `reviews` - Business reviews and ratings
- `inquiries` - Buyer inquiries
- `quotations` - Seller quotations/quotes

---

## 🚀 Fastest Way to Deploy (3 Steps)

### Step 1: Get Neon Connection String
1. Go to https://neon.tech
2. Create new project (free tier available)
3. Copy connection string (looks like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Run Deployment Script
```bash
npm run deploy:full
```

This will:
- ✅ Export your local database
- ✅ Create all 15 tables on Neon
- ✅ Import all your data

### Step 3: Verify
```bash
npm run db:studio
```

---

## 📋 Alternative Methods

### Method A: Manual Step-by-Step

#### 1. Export Local Data
```bash
npm run deploy:export
```

#### 2. Update .env with Neon URL
```env
DATABASE_URL="postgresql://your-neon-url"
```

#### 3. Deploy Schema to Neon
```bash
npm run deploy:schema
```

#### 4. Import Data
```bash
npm run deploy:import
```

### Method B: Fresh Start (No Data Import)

#### 1. Update .env with Neon URL
```env
DATABASE_URL="postgresql://your-neon-url"
```

#### 2. Deploy Schema
```bash
npm run db:migrate
```

#### 3. Seed Reference Data
```bash
npm run db:seed
```

---

## 🛠️ Available Commands

```bash
# Database Management
npm run db:generate     # Generate Prisma Client
npm run db:migrate      # Deploy migrations to production
npm run db:studio       # Open Prisma Studio (database browser)
npm run db:seed         # Seed reference tables

# Deployment Scripts
npm run deploy:export   # Export local database
npm run deploy:schema   # Deploy schema to Neon
npm run deploy:import   # Import data to Neon
npm run deploy:full     # Complete deployment process (recommended)
```

---

## ⚠️ Important Notes

### Before Deploying
- ✅ Ensure PostgreSQL is running locally
- ✅ Have your Neon connection string ready
- ✅ Backup your local database
- ✅ Test connection to Neon

### After Deploying
- ✅ Verify all tables exist: `npm run db:studio`
- ✅ Check data imported correctly
- ✅ Update environment variables in production
- ✅ Test your API endpoints

### Reference Data (Auto-seeded if empty)
- Currencies (INR, USD, EUR, GBP, etc.)
- Price Units (kg, piece, liter, ton, etc.)
- Business Types
- Categories (can be customized)

---

## 🔍 Troubleshooting

### "pg_dump not found"
Install PostgreSQL client tools:
https://www.postgresql.org/download/windows/

### "Connection refused" to Neon
- Check internet connection
- Verify Neon URL is correct
- Ensure SSL is enabled: `?sslmode=require`

### Migration errors
```bash
npx prisma migrate status    # Check migration state
npx prisma migrate resolve   # Resolve failed migrations
```

### Data import fails
1. Ensure schema deployed first: `npm run db:migrate`
2. Check foreign key constraints
3. Import in correct order (parent tables first)

---

## 📞 Need Help?

Run the interactive deployment wizard:
```bash
npm run deploy:full
```

Or check detailed guide:
```
DEPLOYMENT_GUIDE.md
```

---

## 🎉 Success Checklist

- [ ] Neon account created
- [ ] Connection string obtained
- [ ] Local database exported
- [ ] Schema deployed to Neon
- [ ] Data imported successfully
- [ ] Verified with Prisma Studio
- [ ] Environment variables updated
- [ ] API tested with Neon database

---

## 🔒 Security Reminder

**Never commit these files:**
- `.env` (contains database credentials)
- `*.sql` (may contain sensitive data)
- `*.dump` (database backups)

Add to `.gitignore`:
```
.env
.env.*
*.sql
*.dump
*.backup
```
