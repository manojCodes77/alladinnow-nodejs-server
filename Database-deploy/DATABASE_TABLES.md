# DATABASE TABLES SUMMARY

## Total Tables: 15 Main Tables + 1 Meta Table (_prisma_migrations)

---

## 📊 TABLE BREAKDOWN

### 1️⃣ USER & AUTHENTICATION (1 table)
```
users (user_id, email, password_hash, full_name, phone, role, status)
├─ Used for: User login, authentication, account management
└─ Role types: business_owner, admin
```

### 2️⃣ BUSINESS MANAGEMENT (4 tables)
```
business_types (business_type_id, type_name, description)
├─ Manufacturer, Wholesaler, Distributor, Retailer, etc.

business (business_id, business_name, gst_number, pan_number, can_buy, can_sell)
├─ Main business profiles
├─ Indian identifiers: GST, PAN, MSME
└─ Can be buyer, seller, or both

business_documents (document_id, document_type, document_url, is_verified)
├─ License, Tax certificates, Incorporation docs

business_connections (connection_id, buyer_business_id, seller_business_id)
└─ Buyer-Seller relationships (following system)
```

### 3️⃣ PRODUCT CATALOG (6 tables)
```
categories (category_id, category_name, parent_category_id)
├─ Hierarchical structure (parent-child)
└─ Example: Electronics > Mobile > Accessories

currencies (currency_id, currency_code, symbol)
├─ INR, USD, EUR, GBP, JPY, etc.
└─ ISO 4217 codes

price_units (unit_id, unit_code, unit_name, unit_type)
├─ weight: kg, ton, gram
├─ volume: liter, ml
├─ length: meter, foot
└─ quantity: piece, dozen, box

products (product_id, product_name, base_price, min_order_quantity)
├─ Product catalog with pricing
├─ Linked to: business, category, currency, price_unit
└─ Status: draft, active, inactive, discontinued

product_images (image_id, product_id, image_url, is_primary)
└─ Multiple images per product
```

### 4️⃣ ORDER MANAGEMENT (2 tables)
```
orders (order_id, buyer_business_id, seller_business_id, status)
├─ Purchase orders between businesses
├─ Status: pending, confirmed, processing, shipped, delivered
└─ Payment: pending, paid, partial, failed

order_items (order_item_id, order_id, product_id, quantity, price)
└─ Line items in each order
```

### 5️⃣ INQUIRY & QUOTATION (2 tables)
```
inquiries (inquiry_id, buyer_business_id, product_id, description)
├─ Buyer requests for quotes (RFQ)
└─ Status: open, quoted, closed, expired

quotations (quotation_id, inquiry_id, seller_business_id)
├─ Seller responses to inquiries
└─ Status: draft, sent, accepted, rejected, expired
```

### 6️⃣ REVIEWS & RATINGS (1 table)
```
reviews (review_id, order_id, rating, review_text)
├─ Business-to-business reviews
└─ Ratings: overall, product_quality, delivery, communication
```

---

## 🔗 KEY RELATIONSHIPS

```
users (1) ──→ (many) business
  │
  └─→ business (1) ──→ (many) products
                │
                ├──→ (many) orders (as buyer)
                ├──→ (many) orders (as seller)
                ├──→ (many) inquiries (as buyer)
                ├──→ (many) quotations (as seller)
                └──→ (many) reviews (as reviewer/reviewed)

products (1) ──→ (many) product_images
         ├──→ (many) order_items
         └──→ (many) inquiries

orders (1) ──→ (many) order_items
       └──→ (many) reviews

inquiries (1) ──→ (many) quotations
```

---

## 📈 DATA VOLUME ESTIMATES

### Reference Tables (Pre-seeded)
- currencies: ~10-20 rows (INR, USD, EUR, etc.)
- price_units: ~20-30 rows (kg, ton, piece, etc.)
- business_types: ~10-15 rows (Manufacturer, Wholesaler, etc.)
- categories: ~50-200 rows (depends on product catalog)

### Dynamic Tables (User-generated)
- users: Grows with registrations
- business: 1-5 per user on average
- products: Unlimited (depends on sellers)
- orders: Grows with transactions
- reviews: Grows with completed orders

---

## 💾 STORAGE CONSIDERATIONS

### Small Tables (<1000 rows typically)
- users
- business_types
- currencies
- price_units
- business_connections

### Medium Tables (1000-100k rows)
- business
- categories
- reviews
- inquiries
- quotations

### Large Tables (100k+ potential)
- products
- product_images
- orders
- order_items

---

## 🎯 DEPLOYMENT PRIORITY

### Priority 1: Core Tables (Deploy First)
1. users
2. business_types
3. business
4. categories
5. currencies
6. price_units

### Priority 2: Product Tables
7. products
8. product_images

### Priority 3: Transaction Tables
9. orders
10. order_items
11. inquiries
12. quotations
13. reviews

### Priority 4: Relationship Tables
14. business_documents
15. business_connections

---

## ⚡ QUICK FACTS

- **Total Tables**: 15 main + 1 meta (_prisma_migrations)
- **Foreign Keys**: 25+ relationships
- **Indexes**: 30+ for performance
- **Primary Keys**: All use BigInt (8 bytes) for scalability
- **Timestamps**: created_at, updated_at on most tables
- **Cascade Deletes**: Enabled for dependent records
- **Database Engine**: PostgreSQL (Neon.tech compatible)
- **ORM**: Prisma v6.16.2

---

## 🔍 SEARCH & FILTER INDEXES

Indexed columns for fast queries:
- user_id (in business, orders, etc.)
- business_id (in products, orders, etc.)
- category_id (in products)
- product_id (in order_items, images)
- order_id (in order_items, reviews)
- status (in orders, products, inquiries)
- email (in users - unique)
- slug (in categories, products - unique)

---

## 📱 API ENDPOINTS COVERAGE

Each table has corresponding API endpoints:
- GET /api/{table} - List all
- GET /api/{table}/:id - Get by ID
- POST /api/{table} - Create new
- PUT /api/{table}/:id - Update
- DELETE /api/{table}/:id - Delete

Total: 75+ API endpoints across all tables
