# Database Seeding - Quick Start

## 🚀 Quick Commands

### Option 1: Run Everything at Once (Recommended)
```bash
npm run db:seed:all
```

### Option 2: Run in Stages
```bash
# First seed reference tables (currencies, units)
npm run db:seed:reference

# Then seed main data (users, products, orders)
npm run db:seed:data
```

### Option 3: Use Batch Scripts (Windows)
```bash
# Windows
scripts\seed-all.bat
```

### Option 4: Use Shell Script (Mac/Linux)
```bash
# Mac/Linux
chmod +x scripts/seed-all.sh
./scripts/seed-all.sh
```

---

## 📊 What Gets Created

### Users & Businesses (6)
| Email | Business Name | Role | Location |
|-------|--------------|------|----------|
| `manoj@manojtraders.com` | Manoj Cricket Manufacturing | 🏪 Seller Only | Mumbai |
| `priya@reddytextiles.com` | Reddy Textiles Pvt Ltd | 🔄 Buyer & Seller | Hyderabad |
| `amit@patelprocurement.com` | Patel Procurement Services | 🛒 Buyer Only | Ahmedabad |
| `rajesh@sharmaelectronics.com` | Sharma Electronics | 🔄 Buyer & Seller | New Delhi |
| `kavita@singhasteel.com` | Singha Steel Industries | 🏪 Seller Only | Jamshedpur |
| `sunita@mehtachemicals.com` | Mehta Chemicals Ltd | 🔄 Buyer & Seller | Mumbai |

**All users have password:** `Pass123!`

### Products (15+)
- **Cricket Equipment**: Bats (₹8,500), Balls (₹650), Gloves (₹1,200)
- **Textiles**: Cotton fabrics (₹180-320/meter)
- **Electronics**: Microcontrollers (₹85), LEDs (₹2.50)
- **Steel**: Cold rolled sheets (₹58/kg), SS304 coils (₹185/kg)
- **Chemicals**: Caustic soda (₹42/kg), Sulfuric acid (₹35/liter)

### Orders (4)
1. Amit → Manoj: Cricket equipment (₹4,55,000) - **Delivered**
2. Priya → Sunita: Chemicals (₹42,000) - **Delivered**
3. Amit → Priya: Cotton fabrics (₹6,80,000) - **Shipped**
4. Rajesh → Kavita: Steel sheets (₹5,80,000) - **Processing**

### Other Data
- ✅ 2 Reviews (for delivered orders)
- ✅ 2 Inquiries with quotations
- ✅ 4 Business connections
- ✅ 10 Categories (Sports, Textiles, Electronics, etc.)
- ✅ 6 Business types (Manufacturing, Trading, etc.)
- ✅ 20 Currencies (USD, INR, EUR, etc.)
- ✅ 35 Price units (piece, kg, meter, etc.)

---

## 🧪 Test the Data

### 1. Login API Test
```bash
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "manoj@manojtraders.com",
  "password": "Pass123!"
}
```

### 2. Get All Sellers
```bash
GET http://localhost:3000/api/business/sellers
```

### 3. Get All Products
```bash
GET http://localhost:3000/api/products
```

### 4. View in Prisma Studio
```bash
npm run db:studio
```
Then open: http://localhost:5555

---

## 🔄 Reset & Re-seed

If you want to start fresh:

```bash
# ⚠️ WARNING: This deletes ALL data!
npx prisma migrate reset

# Then seed again
npm run db:seed:all
```

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `src/config/seed-database.ts` | Main seeding script with all test data |
| `src/config/seed-reference-tables.ts` | Reference tables (currencies, units) |
| `scripts/seed-all.bat` | Windows batch script for easy seeding |
| `scripts/seed-all.sh` | Unix/Mac shell script for easy seeding |
| `DATABASE_SEEDING_GUIDE.md` | Complete documentation |
| `SEEDING_QUICK_START.md` | This quick reference (you are here) |

---

## ❓ Troubleshooting

### Error: "Unique constraint failed on business_type_id"
This happens when auto-increment sequences are out of sync. Fix it with:
```bash
npm run db:reset-sequences
npm run db:seed:data
```

### Error: "ts-node not found"
```bash
npm install
```

### Error: "Prisma Client not generated"
```bash
npm run db:generate
```

### Error: "User already exists"
The seed script handles duplicates. To start fresh:
```bash
npx prisma migrate reset
npm run db:seed:all
```

### More Help?
See **`SEEDING_TROUBLESHOOTING.md`** for detailed solutions to all common errors.

---

## 🎯 Next Steps

1. ✅ Run seeding: `npm run db:seed:all`
2. ✅ View data: `npm run db:studio`
3. ✅ Test API: Use examples from `API_TESTING_EXAMPLES.md`
4. ✅ Start server: `npm run dev`
5. ✅ Build frontend: Test with seeded data

---

## 📚 More Documentation

- **Complete Guide**: `DATABASE_SEEDING_GUIDE.md`
- **API Testing**: `API_TESTING_EXAMPLES.md`
- **Authentication**: `AUTHENTICATION_GUIDE.md`
- **Schema**: `prisma/schema.prisma`

---

**Happy Testing!** 🚀

