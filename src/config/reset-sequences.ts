import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Reset PostgreSQL sequences to match the current max ID in tables
 * This fixes issues where auto-increment sequences are out of sync
 */
async function resetSequences() {
  console.log('🔄 Resetting database sequences...\n');

  try {
    // Reset business_types sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('business_types', 'business_type_id'),
        COALESCE((SELECT MAX(business_type_id) FROM business_types), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset business_types sequence');

    // Reset categories sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('categories', 'category_id'),
        COALESCE((SELECT MAX(category_id) FROM categories), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset categories sequence');

    // Reset users sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('users', 'user_id'),
        COALESCE((SELECT MAX(user_id) FROM users), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset users sequence');

    // Reset business sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('business', 'business_id'),
        COALESCE((SELECT MAX(business_id) FROM business), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset business sequence');

    // Reset products sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('products', 'product_id'),
        COALESCE((SELECT MAX(product_id) FROM products), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset products sequence');

    // Reset orders sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('orders', 'order_id'),
        COALESCE((SELECT MAX(order_id) FROM orders), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset orders sequence');

    // Reset order_items sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('order_items', 'order_item_id'),
        COALESCE((SELECT MAX(order_item_id) FROM order_items), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset order_items sequence');

    // Reset inquiries sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('inquiries', 'inquiry_id'),
        COALESCE((SELECT MAX(inquiry_id) FROM inquiries), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset inquiries sequence');

    // Reset quotations sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('quotations', 'quotation_id'),
        COALESCE((SELECT MAX(quotation_id) FROM quotations), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset quotations sequence');

    // Reset reviews sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('reviews', 'review_id'),
        COALESCE((SELECT MAX(review_id) FROM reviews), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset reviews sequence');

    // Reset business_connections sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('business_connections', 'connection_id'),
        COALESCE((SELECT MAX(connection_id) FROM business_connections), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset business_connections sequence');

    // Reset business_documents sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('business_documents', 'document_id'),
        COALESCE((SELECT MAX(document_id) FROM business_documents), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset business_documents sequence');

    // Reset product_images sequence
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('product_images', 'image_id'),
        COALESCE((SELECT MAX(image_id) FROM product_images), 0) + 1,
        false
      );
    `);
    console.log('✓ Reset product_images sequence');

    console.log('\n✅ All sequences have been reset successfully!');
    console.log('You can now run: npm run db:seed:data\n');

  } catch (error) {
    console.error('❌ Error resetting sequences:', error);
    throw error;
  }
}

resetSequences()
  .catch((e) => {
    console.error('❌ Reset failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

