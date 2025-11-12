# Database Seeding Guide

## Overview

This guide explains how to seed your AladinNow database with comprehensive test data including users, businesses, products, orders, reviews, and more.

---

## Prerequisites

1. **Database Setup:** Ensure your PostgreSQL database is running and connected
2. **Environment Variables:** Your `.env` file should have `DATABASE_URL` configured
3. **Prisma Client:** Run `npm run db:generate` to generate Prisma Client
4. **Dependencies:** Run `npm install` to install all dependencies including `ts-node`

---

## Seeding Scripts

### 1. Seed Reference Tables Only

Seeds essential lookup tables (currencies, price units):

```bash
npm run db:seed:reference
```

**What it seeds:**
- 20 currencies (USD, EUR, INR, GBP, etc.)
- 35 price units (piece, kg, liter, meter, etc.)

### 2. Seed Complete Database

Seeds everything including test users, businesses, products, orders, and more:

```bash
npm run db:seed:data
```

**What it seeds:**
- Business types (Manufacturing, Trading, Wholesale, etc.)
- Product categories (Sports, Textiles, Electronics, etc.)
- 6 test users with their businesses
- 15+ products across different categories
- 4 orders with order items
- Reviews for delivered orders
- Inquiries and quotations
- Business connections

### 3. Seed Everything

Run both reference tables and complete database seeding:

```bash
npm run db:seed:all
```

This is the recommended approach for a fresh database.

---

## Test Users Created

All test users have the same password: **`Pass123!`**

### 1. Manoj Kumar (Seller - Cricket Equipment)
- **Email:** `manoj@manojtraders.com`
- **Business:** Manoj Cricket Manufacturing
- **Can Sell:** ✅ Yes
- **Can Buy:** ❌ No
- **Products:** Cricket bats, balls, gloves
- **Location:** Mumbai, Maharashtra

### 2. Priya Reddy (Both - Textiles)
- **Email:** `priya@reddytextiles.com`
- **Business:** Reddy Textiles Pvt Ltd
- **Can Sell:** ✅ Yes
- **Can Buy:** ✅ Yes
- **Products:** Cotton fabrics, organic fabrics
- **Location:** Hyderabad, Telangana

### 3. Amit Patel (Buyer - Procurement)
- **Email:** `amit@patelprocurement.com`
- **Business:** Patel Procurement Services
- **Can Sell:** ❌ No
- **Can Buy:** ✅ Yes
- **Products:** None (buyer only)
- **Location:** Ahmedabad, Gujarat

### 4. Rajesh Sharma (Both - Electronics)
- **Email:** `rajesh@sharmaelectronics.com`
- **Business:** Sharma Electronics Components
- **Can Sell:** ✅ Yes
- **Can Buy:** ✅ Yes
- **Products:** Microcontrollers, LEDs
- **Location:** New Delhi

### 5. Kavita Singh (Seller - Steel)
- **Email:** `kavita@singhasteel.com`
- **Business:** Singha Steel Industries
- **Can Sell:** ✅ Yes
- **Can Buy:** ❌ No
- **Products:** Steel sheets, stainless steel coils
- **Location:** Jamshedpur, Jharkhand

### 6. Sunita Mehta (Both - Chemicals)
- **Email:** `sunita@mehtachemicals.com`
- **Business:** Mehta Chemicals Ltd
- **Can Sell:** ✅ Yes
- **Can Buy:** ✅ Yes
- **Products:** Industrial chemicals (caustic soda, sulfuric acid)
- **Location:** Mumbai, Maharashtra

---

## Sample Data Created

### Products (15+)

**Sports Equipment:**
- Professional Cricket Bat - English Willow (₹8,500)
- Cricket Ball - Leather Red (₹650)
- Cricket Batting Gloves Premium (₹1,200)

**Textiles:**
- Premium Cotton Fabric - White (₹180/meter)
- Cotton Twill Fabric - Navy Blue (₹220/meter)
- Organic Cotton Fabric - Natural (₹320/meter)

**Electronics:**
- Microcontroller ATmega328P (₹85)
- LED 5mm White (₹2.50)

**Steel Products:**
- Cold Rolled Steel Sheet (₹58/kg)
- Stainless Steel Coil 304 Grade (₹185/kg)

**Chemicals:**
- Sodium Hydroxide Flakes (₹42/kg)
- Sulfuric Acid Industrial Grade (₹35/liter)

### Orders (4)

1. **Amit → Manoj:** Cricket equipment (₹4,55,000) - Delivered
2. **Priya → Sunita:** Chemicals (₹42,000) - Delivered
3. **Amit → Priya:** Cotton fabrics (₹6,80,000) - Shipped
4. **Rajesh → Kavita:** Steel sheets (₹5,80,000) - Processing

### Reviews

- 2 reviews for delivered orders
- Average rating: 4.5 stars
- All approved and visible

### Inquiries

- 2 active inquiries with quotations
- Realistic B2B communication examples

---

## Running the Seed Scripts

### Step-by-Step Process

1. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

2. **Generate Prisma Client:**
   ```bash
   npm run db:generate
   ```

3. **Run migrations (if needed):**
   ```bash
   npx prisma migrate dev
   ```

4. **Seed the database:**
   ```bash
   npm run db:seed:all
   ```

### Expected Output

```
🌱 Starting comprehensive database seeding...

🏢 Seeding business types...
  ✓ Manufacturing
  ✓ Trading
  ✓ Wholesale
  ...
✅ Seeded 6 business types

📂 Seeding categories...
  ✓ Sports Equipment
  ✓ Cricket Equipment (under Sports Equipment)
  ...
✅ Seeded 10 categories

👤 Seeding users and businesses...
  ✓ User: Manoj Kumar (manoj@manojtraders.com)
    ✓ Business: Manoj Cricket Manufacturing (can_buy: false, can_sell: true)
  ...
✅ Seeded 6 users with businesses

📦 Seeding products...
  ✓ Professional Cricket Bat - English Willow (₹8500)
  ...
✅ Seeded products for seller businesses

🛒 Seeding orders...
  ✓ Order ORD-2025-00001: amit@patelprocurement.com → manoj@manojtraders.com (₹455000.00)
  ...
✅ Seeded 4 orders

⭐ Seeding reviews...
  ✓ Review for order ORD-2025-00001
  ...
✅ Seeded reviews for delivered orders

💬 Seeding inquiries...
  ✓ Bulk Order Inquiry - SS304 Coils
    ✓ Quotation sent for inquiry
  ...
✅ Seeded inquiries and quotations

🤝 Seeding business connections...
  ✓ amit@patelprocurement.com → manoj@manojtraders.com
  ...
✅ Seeded business connections

🎉 Database seeding completed successfully!

📊 Summary:
   - 6 business types
   - 10 categories
   - 6 users with businesses
   - 15 products
   - 4 orders
   - 2 reviews
   - 2 inquiries
   - 4 business connections

✅ All test users have password: Pass123!
```

---

## Testing the Seeded Data

### 1. Test Login

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

### 3. Get Products

```bash
GET http://localhost:3000/api/products
```

### 4. View in Prisma Studio

```bash
npm run db:studio
```

Then open http://localhost:5555 in your browser to explore the seeded data.

---

## Customizing the Seed Data

### Adding More Users

Edit `src/config/seed-database.ts` and add to the `users` array:

```typescript
{
  email: 'your@email.com',
  password: 'YourPassword123!',
  full_name: 'Your Name',
  phone: '+91 9876543210',
  role: 'business_owner',
  business: {
    business_name: 'Your Business Name',
    business_type: 'Manufacturing', // or Trading, Wholesale, etc.
    can_buy: true,
    can_sell: true,
    // ... other fields
  }
}
```

### Adding More Products

Add to the `productsData` array:

```typescript
{
  businessEmail: 'seller@email.com', // Must be an existing seller
  products: [
    {
      product_name: 'Your Product Name',
      slug: 'your-product-slug',
      category: 'Category Name', // Must exist in categories
      description: 'Product description',
      base_price: 1000.00,
      currency: 'INR',
      price_unit: 'piece',
      // ... other fields
    }
  ]
}
```

---

## Resetting the Database

If you want to clear and re-seed the database:

```bash
# WARNING: This will delete all data!
npx prisma migrate reset

# Then seed again
npm run db:seed:all
```

---

## Troubleshooting

### Error: "Cannot find module 'ts-node'"

**Solution:**
```bash
npm install --save-dev ts-node
```

### Error: "Prisma Client not generated"

**Solution:**
```bash
npm run db:generate
```

### Error: "Currency not found"

**Solution:** Run reference tables seeding first:
```bash
npm run db:seed:reference
npm run db:seed:data
```

### Error: "User already exists"

The seed script is idempotent - it won't create duplicates. If you want fresh data, reset the database first:
```bash
npx prisma migrate reset
npm run db:seed:all
```

---

## Production Considerations

⚠️ **WARNING:** These seed scripts are for **DEVELOPMENT AND TESTING ONLY**

**Never run these scripts in production!**

For production:
1. Use secure, unique passwords
2. Verify business documents manually
3. Use real data import scripts
4. Implement proper data validation
5. Set up proper backup procedures

---

## Related Files

- **Seed Script:** `src/config/seed-database.ts`
- **Reference Tables:** `src/config/seed-reference-tables.ts`
- **Schema:** `prisma/schema.prisma`
- **API Examples:** `API_TESTING_EXAMPLES.md`
- **Auth Guide:** `AUTHENTICATION_GUIDE.md`

---

## Need Help?

- Check `API_TESTING_EXAMPLES.md` for testing the seeded data
- Check `AUTHENTICATION_GUIDE.md` for understanding the user/business model
- Open Prisma Studio (`npm run db:studio`) to visually explore the data

---

**Happy Testing!** 🚀

