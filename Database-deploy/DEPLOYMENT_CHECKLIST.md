# 🚀 Neon Deployment Checklist

## Pre-Deployment

- [ ] **Local database is running and accessible**
  ```bash
  # Test connection
  psql -h localhost -U postgres -d alladinnow
  ```

- [ ] **All local data is up to date**
  - Check users table has data
  - Check products/business tables
  - Verify data integrity

- [ ] **PostgreSQL client tools installed**
  - pg_dump available
  - psql available
  - Run: `pg_dump --version`

- [ ] **Node.js and npm working**
  ```bash
  node --version
  npm --version
  ```

---

## Neon Setup

- [ ] **Created Neon account** at https://neon.tech

- [ ] **Created new project** on Neon dashboard

- [ ] **Copied connection string**
  ```
  Format: postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
  ```
  
- [ ] **Connection string saved securely** (don't commit to git!)

---

## Deployment Steps

### Option 1: Automated (Recommended) ⭐

- [ ] **Run deployment script**
  ```bash
  npm run deploy:full
  ```

- [ ] **Follow interactive prompts**
  - Select option A (Full Migration)
  - Enter Neon connection string when asked
  - Wait for completion

### Option 2: Manual Steps

- [ ] **Step 1: Export local database**
  ```bash
  npm run deploy:export
  ```
  - Verify `.sql` file created
  - File location: `alladinnow_backup_YYYYMMDD.sql`

- [ ] **Step 2: Update .env file**
  ```bash
  # Backup existing .env
  copy .env .env.backup
  
  # Edit .env with Neon URL
  DATABASE_URL="your-neon-connection-string"
  ```

- [ ] **Step 3: Deploy schema to Neon**
  ```bash
  npm run deploy:schema
  ```
  - Verify no errors
  - All 15 tables should be created

- [ ] **Step 4: Import data to Neon**
  ```bash
  npm run deploy:import
  ```
  - Provide Neon URL when prompted
  - Wait for import to complete

---

## Post-Deployment Verification

- [ ] **Open Prisma Studio**
  ```bash
  npm run db:studio
  ```

- [ ] **Verify all tables exist**
  - users ✓
  - business ✓
  - business_types ✓
  - business_documents ✓
  - business_connections ✓
  - categories ✓
  - currencies ✓
  - price_units ✓
  - products ✓
  - product_images ✓
  - orders ✓
  - order_items ✓
  - reviews ✓
  - inquiries ✓
  - quotations ✓

- [ ] **Check data imported correctly**
  - Open each table in Prisma Studio
  - Verify row counts match local
  - Check sample records

- [ ] **Test database connection**
  ```bash
  npx prisma db pull
  ```
  Should complete without errors

---

## Application Configuration

- [ ] **Update production .env**
  ```env
  DATABASE_URL="your-neon-connection-string"
  PORT=8080
  JWT_SECRET="your-secret-key"
  NODE_ENV="production"
  ```

- [ ] **Generate Prisma Client**
  ```bash
  npm run db:generate
  ```

- [ ] **Build application**
  ```bash
  npm run build
  ```

- [ ] **Test API endpoints**
  - GET /api/users
  - GET /api/products
  - GET /api/business
  - Verify responses

---

## Production Deployment

- [ ] **Deploy to hosting platform**
  - Vercel / Railway / Render / Heroku
  - Set environment variables
  - Deploy latest build

- [ ] **Set environment variables on platform**
  ```
  DATABASE_URL = your-neon-connection-string
  PORT = 8080
  NODE_ENV = production
  JWT_SECRET = your-secret-key
  ```

- [ ] **Test production API**
  - Health check endpoint
  - Sample GET requests
  - Authentication flow

- [ ] **Monitor logs**
  - Check for database connection errors
  - Verify query performance
  - Monitor Neon dashboard

---

## Backup & Maintenance

- [ ] **Setup automated backups**
  - Neon provides point-in-time recovery
  - Configure retention period
  - Test restore process

- [ ] **Create backup schedule**
  - Weekly full backups
  - Daily incremental (if needed)
  - Store locally: `npm run deploy:export`

- [ ] **Document connection details**
  - Save connection string securely
  - Document database name
  - Note region/endpoint

- [ ] **Monitor database usage**
  - Check Neon dashboard
  - Monitor storage usage
  - Track query performance

---

## Troubleshooting Checklist

### If export fails:
- [ ] PostgreSQL service running
- [ ] Correct credentials in script
- [ ] Database name correct
- [ ] pg_dump in PATH

### If schema deploy fails:
- [ ] DATABASE_URL correct in .env
- [ ] Internet connection working
- [ ] Neon database accessible
- [ ] SSL enabled in connection string

### If import fails:
- [ ] Schema deployed first
- [ ] Connection string correct
- [ ] psql command available
- [ ] Network allows connections

### If connection errors:
- [ ] Check DATABASE_URL format
- [ ] Verify SSL mode: `?sslmode=require`
- [ ] Test connection: `npx prisma db pull`
- [ ] Check Neon dashboard status

---

## 📞 Support Resources

- **Neon Documentation**: https://neon.tech/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Project Guides**: 
  - `QUICK_DEPLOY.md` - Quick start guide
  - `DEPLOYMENT_GUIDE.md` - Detailed instructions
  - `DATABASE_TABLES.md` - Table reference

---

## ✅ Success Criteria

### All checkboxes completed above, AND:

- [ ] Can access Prisma Studio with Neon database
- [ ] All 15 tables visible and populated
- [ ] API endpoints return correct data
- [ ] No connection errors in logs
- [ ] Production application working
- [ ] Backup strategy in place

---

## 🎉 Deployment Complete!

**Date Deployed**: _______________
**Neon Project**: _______________
**Database Region**: _______________
**Tables Deployed**: 15/15 ✓
**Data Migrated**: Yes ✓

**Next Steps**:
1. Monitor application performance
2. Setup monitoring/alerts
3. Document any custom configurations
4. Train team on Neon dashboard
5. Schedule regular backups

---

## 📝 Notes

Use this space for any deployment-specific notes:

```
_____________________________________________________
_____________________________________________________
_____________________________________________________
_____________________________________________________
_____________________________________________________
```
