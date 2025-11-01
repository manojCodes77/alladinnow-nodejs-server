# Controllers Updated - Schema Changes Summary

## Date: November 1, 2025

All controllers have been updated to work with the new schema changes where `currency` and `price_unit` string fields have been replaced with reference table foreign keys (`currency_id` and `price_unit_id`).

---

## 📝 Updated Controllers

### 1. **Product Controller** (`src/controllers/product-controller.ts`)

**Changes:**
- ✅ `createProduct()` - Now accepts `currency_id` (Int) and `price_unit_id` (Int) instead of strings
- ✅ `getAllProducts()` - Added filtering by `currency_id` and `business_id`
- ✅ `getProductById()` - Includes related `currency`, `price_unit`, `business`, and `images`
- ✅ `updateProduct()` - Properly handles Int conversion for `currency_id` and `price_unit_id`
- ✅ `searchProducts()` - Includes all related data in search results

**New Fields:**
- `currency_id` (Int, default: 1) - References `currencies` table
- `price_unit_id` (Int, nullable) - References `price_units` table
- `business_id` (BigInt, nullable) - References `business` table

**Includes:**
```typescript
include: {
  category: true,
  currency: true,
  price_unit: true,
  business: true,
  images: true,
}
```

---

### 2. **Order Controller** (`src/controllers/order-controller.ts`)

**Changes:**
- ✅ `createOrder()` - Now accepts `currency_id` (Int) instead of `currency` string
- ✅ `getAllOrders()` - Added filtering by `currency_id`, includes order_items and related data
- ✅ `getOrderById()` - Comprehensive includes with currency, businesses, items, and reviews
- ✅ `updateOrder()` - Properly handles Int conversion for `currency_id`

**New Fields:**
- `currency_id` (Int, default: 1) - References `currencies` table

**Includes:**
```typescript
include: {
  buyer_business: true,
  seller_business: true,
  currency: true,
  order_items: {
    include: {
      product: {
        include: {
          currency: true,
          price_unit: true,
        }
      }
    }
  },
  reviews: true,
}
```

---

## 🆕 New Controllers Created

### 3. **Currency Controller** (`src/controllers/currency-controller.ts`)

**Endpoints:**
- `getAllCurrencies()` - Get all currencies with optional `is_active` filter
- `getCurrencyById(id)` - Get currency by ID
- `getCurrencyByCode(code)` - Get currency by ISO code (e.g., "USD")
- `createCurrency()` - Create new currency (Admin only)
- `updateCurrency(id)` - Update currency (Admin only)
- `deleteCurrency(id)` - Delete currency with validation check (Admin only)

**Features:**
- ✅ Prevents deletion if currency is in use by products
- ✅ Auto-converts currency codes to uppercase
- ✅ Ordered by `display_order`

---

### 4. **Price Unit Controller** (`src/controllers/price-unit-controller.ts`)

**Endpoints:**
- `getAllPriceUnits()` - Get all price units with filters
- `getPriceUnitsByType(type)` - Get units by type (weight, volume, quantity, etc.)
- `getPriceUnitById(id)` - Get price unit by ID
- `getPriceUnitByCode(code)` - Get price unit by code (e.g., "kg")
- `createPriceUnit()` - Create new price unit (Admin only)
- `updatePriceUnit(id)` - Update price unit (Admin only)
- `deletePriceUnit(id)` - Delete price unit with validation check (Admin only)

**Features:**
- ✅ Prevents deletion if price unit is in use by products
- ✅ Auto-converts unit codes to lowercase
- ✅ Filter by `unit_type` (weight, volume, length, quantity, area, special)
- ✅ Ordered by `display_order`

---

## 🛣️ New Routes Created

### Currency Routes (`src/routes/currency-routes.ts`)

**Public Routes:**
```
GET    /api/v1/currencies              - Get all currencies
GET    /api/v1/currencies/:id          - Get currency by ID
GET    /api/v1/currencies/code/:code   - Get currency by code
```

**Admin Routes (requires authentication):**
```
POST   /api/v1/currencies              - Create currency
PUT    /api/v1/currencies/:id          - Update currency
DELETE /api/v1/currencies/:id          - Delete currency
```

---

### Price Unit Routes (`src/routes/price-unit-routes.ts`)

**Public Routes:**
```
GET    /api/v1/price-units             - Get all price units
GET    /api/v1/price-units/type/:type  - Get by type (weight, volume, etc.)
GET    /api/v1/price-units/:id         - Get price unit by ID
GET    /api/v1/price-units/code/:code  - Get price unit by code
```

**Admin Routes (requires authentication):**
```
POST   /api/v1/price-units             - Create price unit
PUT    /api/v1/price-units/:id         - Update price unit
DELETE /api/v1/price-units/:id         - Delete price unit
```

---

## 📦 Main Server Update

**File:** `src/index.ts`

Added new route imports and middleware:
```typescript
import CurrencyRoutes from './routes/currency-routes';
import PriceUnitRoutes from './routes/price-unit-routes';

app.use("/api/v1/currencies", CurrencyRoutes);
app.use("/api/v1/price-units", PriceUnitRoutes);
```

---

## 🔒 Authentication & Authorization

Both new controllers use the authentication middleware:
- `authenticateToken` - Verifies JWT token
- `isAdmin` - Ensures only admins can create/update/delete reference data

**Middleware Location:** `src/middlewares/auth-middleware.ts`

---

## ✅ Benefits of These Changes

1. **Data Integrity** - Only valid currencies and units can be used
2. **Referential Integrity** - Foreign key constraints prevent orphaned data
3. **Better Performance** - Indexed foreign keys improve query speed
4. **Centralized Management** - Easy to add/update currencies and units
5. **Type Safety** - Int IDs are more performant than strings
6. **Validation** - Prevents deletion of reference data in use
7. **Extensibility** - Easy to add new currencies/units as business grows

---

## 🚀 Next Steps

1. **Seed the reference tables:**
   ```bash
   npx tsx prisma/seed-reference-tables.ts
   ```

2. **Test the endpoints:**
   - Create products with `currency_id` and `price_unit_id`
   - Fetch currencies and price units
   - Test admin CRUD operations

3. **Update frontend:**
   - Use dropdowns to select from available currencies/units
   - Display currency symbols and unit abbreviations

---

## 📊 Database Schema Summary

### Reference Tables (Int IDs)
- `currencies` - ISO currency codes with symbols
- `price_units` - Measurement units categorized by type

### Main Tables (BigInt IDs, Int foreign keys for reference tables)
- `products` - Uses `currency_id` and `price_unit_id`
- `orders` - Uses `currency_id`

---

## 🔍 Example API Calls

### Create Product
```json
POST /api/v1/products
{
  "product_name": "Industrial Pump",
  "category_id": "1",
  "currency_id": 1,        // USD
  "price_unit_id": 1,      // piece
  "base_price": 1250.00,
  "min_order_quantity": 10
}
```

### Get All Currencies
```
GET /api/v1/currencies
```

### Get Price Units by Type
```
GET /api/v1/price-units/type/weight
```

---

**All controllers are now aligned with the updated schema! 🎉**
