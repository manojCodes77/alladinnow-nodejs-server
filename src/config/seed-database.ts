import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Business Types
const businessTypes = [
  { type_name: 'Manufacturing', description: 'Companies that manufacture products' },
  { type_name: 'Trading', description: 'Companies that trade products' },
  { type_name: 'Wholesale', description: 'Wholesale distributors' },
  { type_name: 'Retail', description: 'Retail businesses' },
  { type_name: 'Service Provider', description: 'Service-based businesses' },
  { type_name: 'Import/Export', description: 'Import and export businesses' },
];

// Categories
const categories = [
  { category_name: 'Sports Equipment', slug: 'sports-equipment', description: 'Sports and fitness equipment', display_order: 1 },
  { category_name: 'Cricket Equipment', slug: 'cricket-equipment', description: 'Cricket bats, balls, and accessories', display_order: 2, parent_name: 'Sports Equipment' },
  { category_name: 'Textiles & Fabrics', slug: 'textiles-fabrics', description: 'Fabrics, textiles, and raw materials', display_order: 3 },
  { category_name: 'Cotton Fabrics', slug: 'cotton-fabrics', description: 'Cotton-based fabrics', display_order: 4, parent_name: 'Textiles & Fabrics' },
  { category_name: 'Electronics & Components', slug: 'electronics-components', description: 'Electronic components and devices', display_order: 5 },
  { category_name: 'Semiconductors', slug: 'semiconductors', description: 'Semiconductor chips and components', display_order: 6, parent_name: 'Electronics & Components' },
  { category_name: 'Industrial Materials', slug: 'industrial-materials', description: 'Raw materials for industry', display_order: 7 },
  { category_name: 'Steel Products', slug: 'steel-products', description: 'Steel and iron products', display_order: 8, parent_name: 'Industrial Materials' },
  { category_name: 'Chemicals', slug: 'chemicals', description: 'Industrial chemicals', display_order: 9 },
  { category_name: 'Packaging Materials', slug: 'packaging-materials', description: 'Packaging and shipping materials', display_order: 10 },
];

// Users with their first business
const users = [
  {
    email: 'manoj@manojtraders.com',
    password: 'Pass123!',
    full_name: 'Manoj Kumar',
    phone: '+91 9876543210',
    role: 'business_owner',
    business: {
      business_name: 'Manoj Cricket Manufacturing',
      business_type: 'Manufacturing',
      can_buy: false,
      can_sell: true,
      gst_number: '29ABCDE1234F1Z5',
      pan_number: 'ABCDE1234F',
      msme_number: 'UDYAM-MH-00-0000001',
      description: 'Leading manufacturer of premium cricket equipment in Mumbai',
      address_line1: '123 Industrial Area, Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400069',
      is_verified: true,
      year_established: 2015,
      employee_count: 50,
    }
  },
  {
    email: 'priya@reddytextiles.com',
    password: 'Pass123!',
    full_name: 'Priya Reddy',
    phone: '+91 9988776655',
    role: 'business_owner',
    business: {
      business_name: 'Reddy Textiles Pvt Ltd',
      business_type: 'Manufacturing',
      can_buy: true,
      can_sell: true,
      gst_number: '36FGHIJ5678K2L9',
      pan_number: 'FGHIJ5678K',
      msme_number: 'UDYAM-TG-00-0000002',
      description: 'Premium cotton fabric manufacturer and exporter',
      address_line1: '45 Textile Park, Secunderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      pincode: '500003',
      is_verified: true,
      year_established: 2010,
      employee_count: 120,
    }
  },
  {
    email: 'amit@patelprocurement.com',
    password: 'Pass123!',
    full_name: 'Amit Patel',
    phone: '+91 9123456789',
    role: 'business_owner',
    business: {
      business_name: 'Patel Procurement Services',
      business_type: 'Trading',
      can_buy: true,
      can_sell: false,
      gst_number: '24KLMNO9012P3Q6',
      pan_number: 'KLMNO9012P',
      description: 'B2B procurement specialists for manufacturing industries',
      address_line1: '78 Commerce Hub, Satellite',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India',
      pincode: '380015',
      is_verified: true,
      year_established: 2018,
      employee_count: 15,
    }
  },
  {
    email: 'rajesh@sharmaelectronics.com',
    password: 'Pass123!',
    full_name: 'Rajesh Sharma',
    phone: '+91 9876512345',
    role: 'business_owner',
    business: {
      business_name: 'Sharma Electronics Components',
      business_type: 'Wholesale',
      can_buy: true,
      can_sell: true,
      gst_number: '07RSTUV3456W7X8',
      pan_number: 'RSTUV3456W',
      description: 'Electronic components wholesaler and distributor',
      address_line1: '234 Electronic Market, Nehru Place',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      pincode: '110019',
      is_verified: true,
      year_established: 2012,
      employee_count: 35,
    }
  },
  {
    email: 'kavita@singhasteel.com',
    password: 'Pass123!',
    full_name: 'Kavita Singh',
    phone: '+91 9765432109',
    role: 'business_owner',
    business: {
      business_name: 'Singha Steel Industries',
      business_type: 'Manufacturing',
      can_buy: false,
      can_sell: true,
      gst_number: '20YZABC7890D1E2',
      pan_number: 'YZABC7890D',
      msme_number: 'UDYAM-JH-00-0000003',
      description: 'Steel manufacturing and processing facility',
      address_line1: '567 Industrial Zone, Adityapur',
      city: 'Jamshedpur',
      state: 'Jharkhand',
      country: 'India',
      pincode: '831013',
      is_verified: true,
      year_established: 2008,
      employee_count: 200,
    }
  },
  {
    email: 'sunita@mehtachemicals.com',
    password: 'Pass123!',
    full_name: 'Sunita Mehta',
    phone: '+91 9654321098',
    role: 'business_owner',
    business: {
      business_name: 'Mehta Chemicals Ltd',
      business_type: 'Manufacturing',
      can_buy: true,
      can_sell: true,
      gst_number: '27FGHPQ4567R8S9',
      pan_number: 'FGHPQ4567R',
      description: 'Industrial chemicals manufacturer and supplier',
      address_line1: '890 Chemical Complex, Vashi',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400703',
      is_verified: true,
      year_established: 2005,
      employee_count: 80,
    }
  },
];

// Products (will be created for seller businesses)
const productsData = [
  // Manoj Cricket Manufacturing products
  {
    businessEmail: 'manoj@manojtraders.com',
    products: [
      {
        product_name: 'Professional Cricket Bat - English Willow',
        slug: 'professional-cricket-bat-english-willow',
        category: 'Cricket Equipment',
        description: 'Premium English willow cricket bat, handcrafted for professional players',
        specifications: 'Weight: 1150-1250g, Size: Short Handle, Grain: 6-8, Grade: Grade 1',
        base_price: 8500.00,
        currency: 'INR',
        price_unit: 'piece',
        min_order_quantity: 10,
        max_order_quantity: 500,
        available_quantity: 150,
        brand: 'Manoj Sports',
        manufacturer: 'Manoj Cricket Manufacturing',
        country_of_origin: 'India',
        status: 'active',
        is_featured: true,
      },
      {
        product_name: 'Cricket Ball - Leather (Red)',
        slug: 'cricket-ball-leather-red',
        category: 'Cricket Equipment',
        description: 'Premium quality leather cricket ball for professional matches',
        specifications: 'Weight: 155-163g, Circumference: 22.4-22.9cm, Material: Alum-tanned leather',
        base_price: 650.00,
        currency: 'INR',
        price_unit: 'piece',
        min_order_quantity: 50,
        max_order_quantity: 2000,
        available_quantity: 500,
        brand: 'Manoj Sports',
        manufacturer: 'Manoj Cricket Manufacturing',
        country_of_origin: 'India',
        status: 'active',
        is_featured: true,
      },
      {
        product_name: 'Cricket Batting Gloves - Premium',
        slug: 'cricket-batting-gloves-premium',
        category: 'Cricket Equipment',
        description: 'Professional batting gloves with superior protection',
        specifications: 'Material: Sheep leather palm, High-density foam protection, Size: Men',
        base_price: 1200.00,
        currency: 'INR',
        price_unit: 'pair',
        min_order_quantity: 20,
        max_order_quantity: 1000,
        available_quantity: 300,
        brand: 'Manoj Sports',
        manufacturer: 'Manoj Cricket Manufacturing',
        country_of_origin: 'India',
        status: 'active',
        is_featured: false,
      },
    ]
  },
  // Reddy Textiles products
  {
    businessEmail: 'priya@reddytextiles.com',
    products: [
      {
        product_name: 'Premium Cotton Fabric - White',
        slug: 'premium-cotton-fabric-white',
        category: 'Cotton Fabrics',
        description: '100% pure cotton fabric, high thread count, perfect for garments',
        specifications: 'Thread Count: 200, Width: 60 inches, Weight: 120 GSM, Finish: Mercerized',
        base_price: 180.00,
        currency: 'INR',
        price_unit: 'meter',
        min_order_quantity: 500,
        max_order_quantity: 50000,
        available_quantity: 10000,
        brand: 'Reddy Premium',
        manufacturer: 'Reddy Textiles Pvt Ltd',
        country_of_origin: 'India',
        status: 'active',
        is_featured: true,
      },
      {
        product_name: 'Cotton Twill Fabric - Navy Blue',
        slug: 'cotton-twill-fabric-navy-blue',
        category: 'Cotton Fabrics',
        description: 'Durable cotton twill fabric for workwear and uniforms',
        specifications: 'Composition: 100% Cotton, Width: 58 inches, Weight: 240 GSM',
        base_price: 220.00,
        currency: 'INR',
        price_unit: 'meter',
        min_order_quantity: 1000,
        max_order_quantity: 100000,
        available_quantity: 25000,
        brand: 'Reddy Premium',
        manufacturer: 'Reddy Textiles Pvt Ltd',
        country_of_origin: 'India',
        status: 'active',
        is_featured: false,
      },
      {
        product_name: 'Organic Cotton Fabric - Natural',
        slug: 'organic-cotton-fabric-natural',
        category: 'Cotton Fabrics',
        description: 'GOTS certified organic cotton fabric',
        specifications: 'Certification: GOTS, Width: 60 inches, Weight: 150 GSM',
        base_price: 320.00,
        currency: 'INR',
        price_unit: 'meter',
        min_order_quantity: 500,
        max_order_quantity: 20000,
        available_quantity: 5000,
        brand: 'Reddy Organic',
        manufacturer: 'Reddy Textiles Pvt Ltd',
        country_of_origin: 'India',
        status: 'active',
        is_featured: true,
      },
    ]
  },
  // Sharma Electronics products
  {
    businessEmail: 'rajesh@sharmaelectronics.com',
    products: [
      {
        product_name: 'Microcontroller ATmega328P',
        slug: 'microcontroller-atmega328p',
        category: 'Semiconductors',
        description: '8-bit AVR microcontroller with 32KB flash memory',
        specifications: 'Memory: 32KB Flash, 2KB SRAM, Speed: 20 MHz, Package: DIP-28',
        base_price: 85.00,
        currency: 'INR',
        price_unit: 'piece',
        min_order_quantity: 100,
        max_order_quantity: 10000,
        available_quantity: 5000,
        brand: 'Microchip',
        manufacturer: 'Microchip Technology',
        country_of_origin: 'USA',
        status: 'active',
        is_featured: false,
      },
      {
        product_name: 'LED Light Emitting Diode - 5mm White',
        slug: 'led-5mm-white',
        category: 'Electronics & Components',
        description: 'High brightness 5mm white LED',
        specifications: 'Color: White, Forward Voltage: 3.0-3.4V, Current: 20mA, Brightness: 15000mcd',
        base_price: 2.50,
        currency: 'INR',
        price_unit: 'piece',
        min_order_quantity: 1000,
        max_order_quantity: 100000,
        available_quantity: 50000,
        brand: 'Sharma Electronics',
        country_of_origin: 'China',
        status: 'active',
        is_featured: false,
      },
    ]
  },
  // Singha Steel products
  {
    businessEmail: 'kavita@singhasteel.com',
    products: [
      {
        product_name: 'Cold Rolled Steel Sheet',
        slug: 'cold-rolled-steel-sheet',
        category: 'Steel Products',
        description: 'High-quality cold rolled steel sheets for manufacturing',
        specifications: 'Thickness: 1mm-3mm, Width: 1000mm-1500mm, Grade: CR1, Finish: 2B',
        base_price: 58.00,
        currency: 'INR',
        price_unit: 'kg',
        min_order_quantity: 5000,
        max_order_quantity: 500000,
        available_quantity: 100000,
        brand: 'Singha Steel',
        manufacturer: 'Singha Steel Industries',
        country_of_origin: 'India',
        status: 'active',
        is_featured: true,
      },
      {
        product_name: 'Stainless Steel Coil - 304 Grade',
        slug: 'stainless-steel-coil-304',
        category: 'Steel Products',
        description: '304 grade stainless steel coils',
        specifications: 'Grade: SS304, Thickness: 0.5mm-2mm, Width: 1000mm-1500mm, Finish: 2B/BA',
        base_price: 185.00,
        currency: 'INR',
        price_unit: 'kg',
        min_order_quantity: 2000,
        max_order_quantity: 200000,
        available_quantity: 50000,
        brand: 'Singha Steel',
        manufacturer: 'Singha Steel Industries',
        country_of_origin: 'India',
        status: 'active',
        is_featured: false,
      },
    ]
  },
  // Mehta Chemicals products
  {
    businessEmail: 'sunita@mehtachemicals.com',
    products: [
      {
        product_name: 'Sodium Hydroxide (Caustic Soda) - Flakes',
        slug: 'sodium-hydroxide-flakes',
        category: 'Chemicals',
        description: 'Industrial grade caustic soda flakes, 99% purity',
        specifications: 'Purity: 99%, Form: Flakes, CAS No: 1310-73-2',
        base_price: 42.00,
        currency: 'INR',
        price_unit: 'kg',
        min_order_quantity: 500,
        max_order_quantity: 50000,
        available_quantity: 20000,
        brand: 'Mehta Chemicals',
        manufacturer: 'Mehta Chemicals Ltd',
        country_of_origin: 'India',
        status: 'active',
        is_featured: false,
      },
      {
        product_name: 'Sulfuric Acid - Industrial Grade',
        slug: 'sulfuric-acid-industrial',
        category: 'Chemicals',
        description: 'Concentrated sulfuric acid for industrial use',
        specifications: 'Concentration: 98%, Purity: Technical Grade, CAS No: 7664-93-9',
        base_price: 35.00,
        currency: 'INR',
        price_unit: 'liter',
        min_order_quantity: 1000,
        max_order_quantity: 100000,
        available_quantity: 30000,
        brand: 'Mehta Chemicals',
        manufacturer: 'Mehta Chemicals Ltd',
        country_of_origin: 'India',
        status: 'active',
        is_featured: true,
      },
    ]
  },
];

async function seedDatabase() {
  console.log('🌱 Starting comprehensive database seeding...\n');

  try {
    // 1. Seed Business Types
    console.log('🏢 Seeding business types...');
    const businessTypeMap = new Map();
    
    // First, get all existing business types
    const existingBusinessTypes = await prisma.business_types.findMany();
    
    for (const type of businessTypes) {
      // Check if business type already exists
      const existing = existingBusinessTypes.find(bt => bt.type_name === type.type_name);
      
      let businessType;
      if (existing) {
        businessType = existing;
        console.log(`  ⚠ Business type already exists: ${type.type_name}`);
      } else {
        try {
          businessType = await prisma.business_types.create({
            data: type,
          });
          console.log(`  ✓ ${type.type_name}`);
        } catch (error: any) {
          // If creation fails, try to find it again (might have been created by another process)
          const found = await prisma.business_types.findFirst({
            where: { type_name: type.type_name },
          });
          if (found) {
            businessType = found;
            console.log(`  ⚠ Business type found after error: ${type.type_name}`);
          } else {
            throw error;
          }
        }
      }
      businessTypeMap.set(type.type_name, businessType.business_type_id);
    }
    console.log(`✅ Seeded ${businessTypes.length} business types\n`);

    // 2. Seed Categories
    console.log('📂 Seeding categories...');
    const categoryMap = new Map();
    
    // First create parent categories
    for (const category of categories.filter(c => !c.parent_name)) {
      const cat = await prisma.categories.upsert({
        where: { slug: category.slug },
        update: {},
        create: {
          category_name: category.category_name,
          slug: category.slug,
          description: category.description,
          display_order: category.display_order,
        },
      });
      categoryMap.set(category.category_name, cat.category_id);
      console.log(`  ✓ ${category.category_name}`);
    }

    // Then create child categories
    for (const category of categories.filter(c => c.parent_name)) {
      const parentId = categoryMap.get(category.parent_name);
      const cat = await prisma.categories.upsert({
        where: { slug: category.slug },
        update: {},
        create: {
          category_name: category.category_name,
          slug: category.slug,
          description: category.description,
          display_order: category.display_order,
          parent_category_id: parentId,
        },
      });
      categoryMap.set(category.category_name, cat.category_id);
      console.log(`  ✓ ${category.category_name} (under ${category.parent_name})`);
    }
    console.log(`✅ Seeded ${categories.length} categories\n`);

    // 3. Seed Users and their Businesses
    console.log('👤 Seeding users and businesses...');
    const userBusinessMap = new Map();
    
    for (const userData of users) {
      // Check if user already exists
      let user = await prisma.users.findUnique({
        where: { email: userData.email },
      });

      if (!user) {
        const hashedPassword = await hashPassword(userData.password);
        user = await prisma.users.create({
          data: {
            email: userData.email,
            password_hash: hashedPassword,
            full_name: userData.full_name,
            phone: userData.phone,
            role: userData.role,
            is_verified: true,
            email_verified: true,
          },
        });
        console.log(`  ✓ User: ${userData.full_name} (${userData.email})`);
      } else {
        console.log(`  ⚠ User already exists: ${userData.email}`);
      }

      // Create business
      const businessTypeId = businessTypeMap.get(userData.business.business_type);
      
      const existingBusiness = await prisma.business.findFirst({
        where: {
          user_id: user.user_id,
          business_name: userData.business.business_name,
        },
      });

      let business;
      if (!existingBusiness) {
        business = await prisma.business.create({
          data: {
            user_id: user.user_id,
            business_type_id: businessTypeId,
            business_name: userData.business.business_name,
            can_buy: userData.business.can_buy,
            can_sell: userData.business.can_sell,
            gst_number: userData.business.gst_number,
            pan_number: userData.business.pan_number,
            msme_number: userData.business.msme_number,
            description: userData.business.description,
            address_line1: userData.business.address_line1,
            city: userData.business.city,
            state: userData.business.state,
            country: userData.business.country,
            pincode: userData.business.pincode,
            primary_contact_email: userData.email,
            primary_contact_phone: userData.phone,
            is_verified: userData.business.is_verified || false,
            year_established: userData.business.year_established,
            employee_count: userData.business.employee_count,
          },
        });
        console.log(`    ✓ Business: ${userData.business.business_name} (can_buy: ${userData.business.can_buy}, can_sell: ${userData.business.can_sell})`);
      } else {
        business = existingBusiness;
        console.log(`    ⚠ Business already exists: ${userData.business.business_name}`);
      }

      userBusinessMap.set(userData.email, {
        user_id: user.user_id,
        business_id: business.business_id,
        can_buy: business.can_buy,
        can_sell: business.can_sell,
      });
    }
    console.log(`✅ Seeded ${users.length} users with businesses\n`);

    // 4. Seed Products
    console.log('📦 Seeding products...');
    const productMap = new Map();
    const currencyINR = await prisma.currencies.findUnique({ where: { currency_code: 'INR' } });
    
    for (const productData of productsData) {
      const businessInfo = userBusinessMap.get(productData.businessEmail);
      
      if (!businessInfo || !businessInfo.can_sell) {
        console.log(`  ⚠ Skipping products for ${productData.businessEmail} - not a seller`);
        continue;
      }

      for (const prod of productData.products) {
        const categoryId = categoryMap.get(prod.category);
        const priceUnit = await prisma.price_units.findUnique({ where: { unit_code: prod.price_unit } });

        const existingProduct = await prisma.products.findUnique({
          where: { slug: prod.slug },
        });

        if (!existingProduct) {
          const product = await prisma.products.create({
            data: {
              business_id: businessInfo.business_id,
              category_id: categoryId!,
              currency_id: currencyINR!.currency_id,
              price_unit_id: priceUnit?.unit_id,
              product_name: prod.product_name,
              slug: prod.slug,
              description: prod.description,
              specifications: prod.specifications,
              base_price: prod.base_price,
              min_order_quantity: prod.min_order_quantity,
              max_order_quantity: prod.max_order_quantity,
              available_quantity: prod.available_quantity,
              brand: prod.brand,
              manufacturer: prod.manufacturer,
              country_of_origin: prod.country_of_origin,
              status: prod.status,
              is_featured: prod.is_featured || false,
            },
          });
          productMap.set(prod.slug, product.product_id);
          console.log(`  ✓ ${prod.product_name} (₹${prod.base_price})`);
        } else {
          productMap.set(prod.slug, existingProduct.product_id);
          console.log(`  ⚠ Product already exists: ${prod.product_name}`);
        }
      }
    }
    console.log(`✅ Seeded products for seller businesses\n`);

    // 5. Seed Orders
    console.log('🛒 Seeding orders...');
    const ordersData = [
      {
        buyerEmail: 'amit@patelprocurement.com',
        sellerEmail: 'manoj@manojtraders.com',
        productSlugs: ['professional-cricket-bat-english-willow', 'cricket-ball-leather-red'],
        quantities: [50, 200],
        status: 'delivered',
        payment_status: 'paid',
      },
      {
        buyerEmail: 'priya@reddytextiles.com',
        sellerEmail: 'sunita@mehtachemicals.com',
        productSlugs: ['sodium-hydroxide-flakes'],
        quantities: [1000],
        status: 'delivered',
        payment_status: 'paid',
      },
      {
        buyerEmail: 'amit@patelprocurement.com',
        sellerEmail: 'priya@reddytextiles.com',
        productSlugs: ['premium-cotton-fabric-white', 'organic-cotton-fabric-natural'],
        quantities: [2000, 1000],
        status: 'shipped',
        payment_status: 'paid',
      },
      {
        buyerEmail: 'rajesh@sharmaelectronics.com',
        sellerEmail: 'kavita@singhasteel.com',
        productSlugs: ['cold-rolled-steel-sheet'],
        quantities: [10000],
        status: 'processing',
        payment_status: 'paid',
      },
    ];

    const createdOrders = [];
    for (let i = 0; i < ordersData.length; i++) {
      const orderData = ordersData[i];
      const buyer = userBusinessMap.get(orderData.buyerEmail);
      const seller = userBusinessMap.get(orderData.sellerEmail);

      if (!buyer || !seller) continue;

      const order = await prisma.orders.create({
        data: {
          buyer_business_id: buyer.business_id,
          seller_business_id: seller.business_id,
          currency_id: currencyINR!.currency_id,
          order_number: `ORD-2025-${String(i + 1).padStart(5, '0')}`,
          status: orderData.status,
          payment_status: orderData.payment_status,
          delivery_address: '123 Delivery Street',
          delivery_city: 'Mumbai',
          delivery_state: 'Maharashtra',
          delivery_pincode: '400001',
          delivery_country: 'India',
        },
      });

      let totalAmount = 0;
      for (let j = 0; j < orderData.productSlugs.length; j++) {
        const productId = productMap.get(orderData.productSlugs[j]);
        const product = await prisma.products.findUnique({ where: { product_id: productId } });
        
        if (product && product.base_price) {
          const quantity = orderData.quantities[j];
          const unitPrice = Number(product.base_price);
          const totalPrice = unitPrice * quantity;
          totalAmount += totalPrice;

          await prisma.order_items.create({
            data: {
              order_id: order.order_id,
              product_id: productId!,
              product_name: product.product_name,
              quantity_unit: quantity,
              unit_price: product.base_price,
              total_price: totalPrice,
              tax_rate: 18.0,
            },
          });
        }
      }

      // Update order with final amount
      await prisma.orders.update({
        where: { order_id: order.order_id },
        data: { final_amount: totalAmount },
      });

      createdOrders.push(order);
      console.log(`  ✓ Order ${order.order_number}: ${orderData.buyerEmail} → ${orderData.sellerEmail} (₹${totalAmount.toFixed(2)})`);
    }
    console.log(`✅ Seeded ${createdOrders.length} orders\n`);

    // 6. Seed Reviews (only for delivered orders)
    console.log('⭐ Seeding reviews...');
    const deliveredOrders = createdOrders.filter(o => o.status === 'delivered');
    
    for (const order of deliveredOrders) {
      const existingReview = await prisma.reviews.findFirst({
        where: { order_id: order.order_id },
      });

      if (!existingReview) {
        await prisma.reviews.create({
          data: {
            order_id: order.order_id,
            reviewer_business_id: order.buyer_business_id,
            reviewed_business_id: order.seller_business_id,
            rating: 4 + Math.floor(Math.random() * 2), // Random rating 4-5
            review_text: 'Excellent quality products and timely delivery. Very satisfied with the service.',
            product_quality_rating: 5,
            delivery_rating: 4,
            communication_rating: 5,
            is_approved: true,
          },
        });
        console.log(`  ✓ Review for order ${order.order_number}`);
      }
    }
    console.log(`✅ Seeded reviews for delivered orders\n`);

    // 7. Seed Inquiries
    console.log('💬 Seeding inquiries...');
    const inquiriesData = [
      {
        buyerEmail: 'amit@patelprocurement.com',
        productSlug: 'stainless-steel-coil-304',
        inquiry_title: 'Bulk Order Inquiry - SS304 Coils',
        description: 'Looking for 50 tons of SS304 coils for manufacturing project. Need best price and delivery timeline.',
        required_quantity: 50000,
        budget_range: '₹85-90 lakh',
      },
      {
        buyerEmail: 'rajesh@sharmaelectronics.com',
        productSlug: 'premium-cotton-fabric-white',
        inquiry_title: 'Cotton Fabric for Electronics Packaging',
        description: 'Need cotton fabric for packaging electronic components. Require flame retardant finish.',
        required_quantity: 5000,
        budget_range: '₹8-10 lakh',
      },
    ];

    for (const inquiry of inquiriesData) {
      const buyer = userBusinessMap.get(inquiry.buyerEmail);
      const productId = productMap.get(inquiry.productSlug);

      if (buyer && productId) {
        const existingInquiry = await prisma.inquiries.findFirst({
          where: {
            buyer_business_id: buyer.business_id,
            product_id: productId,
          },
        });

        if (!existingInquiry) {
          const createdInquiry = await prisma.inquiries.create({
            data: {
              buyer_business_id: buyer.business_id,
              product_id: productId,
              inquiry_title: inquiry.inquiry_title,
              description: inquiry.description,
              required_quantity: inquiry.required_quantity,
              budget_range: inquiry.budget_range,
              status: 'open',
            },
          });
          console.log(`  ✓ ${inquiry.inquiry_title}`);

          // Create a quotation response
          const product = await prisma.products.findUnique({ where: { product_id: productId } });
          if (product) {
            await prisma.quotations.create({
              data: {
                inquiry_id: createdInquiry.inquiry_id,
                seller_business_id: product.business_id!,
                validity_days: 30,
                delivery_time_days: 45,
                payment_terms: '50% advance, 50% on delivery',
                other_terms: 'Transportation charges extra. GST as applicable.',
                status: 'sent',
              },
            });
            console.log(`    ✓ Quotation sent for inquiry`);
          }
        }
      }
    }
    console.log(`✅ Seeded inquiries and quotations\n`);

    // 8. Seed Business Connections
    console.log('🤝 Seeding business connections...');
    const connections = [
      { buyerEmail: 'amit@patelprocurement.com', sellerEmail: 'manoj@manojtraders.com' },
      { buyerEmail: 'amit@patelprocurement.com', sellerEmail: 'priya@reddytextiles.com' },
      { buyerEmail: 'priya@reddytextiles.com', sellerEmail: 'sunita@mehtachemicals.com' },
      { buyerEmail: 'rajesh@sharmaelectronics.com', sellerEmail: 'kavita@singhasteel.com' },
    ];

    for (const conn of connections) {
      const buyer = userBusinessMap.get(conn.buyerEmail);
      const seller = userBusinessMap.get(conn.sellerEmail);

      if (buyer && seller) {
        const existing = await prisma.business_connections.findFirst({
          where: {
            buyer_business_id: buyer.business_id,
            seller_business_id: seller.business_id,
          },
        });

        if (!existing) {
          await prisma.business_connections.create({
            data: {
              buyer_business_id: buyer.business_id,
              seller_business_id: seller.business_id,
              is_following: true,
            },
          });
          console.log(`  ✓ ${conn.buyerEmail} → ${conn.sellerEmail}`);
        }
      }
    }
    console.log(`✅ Seeded business connections\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - ${businessTypes.length} business types`);
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${users.length} users with businesses`);
    console.log(`   - ${productMap.size} products`);
    console.log(`   - ${createdOrders.length} orders`);
    console.log(`   - ${deliveredOrders.length} reviews`);
    console.log(`   - ${inquiriesData.length} inquiries`);
    console.log(`   - ${connections.length} business connections`);
    console.log('\n✅ All test users have password: Pass123!\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seed function
seedDatabase()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

