import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertBigIntToString } from '../utils/main';

const prisma = new PrismaClient();

// Create Order
export async function createOrder(req: Request, res: Response) {
  try {
    const { 
      order_id,
      buyer_business_id,
      seller_business_id,
      order_number,
      status,
      tax_amount,
      discount_amount,
      shipping_amount,
      final_amount,
      currency,
      delivery_address,
      delivery_city,
      delivery_state,
      delivery_pincode,
      delivery_country,
      expected_delivery_date,
      payment_status,
      buyer_notes
    } = req.body;

    if (!buyer_business_id || !seller_business_id) {
      return res.status(400).json({ error: "Buyer and seller business IDs are required" });
    }

    const newOrder = await prisma.orders.create({
      data: {
        order_id,
        buyer_business_id: BigInt(buyer_business_id),
        seller_business_id: BigInt(seller_business_id),
        order_number,
        status: status || 'pending',
        tax_amount,
        discount_amount,
        shipping_amount,
        final_amount,
        currency: currency || 'USD',
        delivery_address,
        delivery_city,
        delivery_state,
        delivery_pincode,
        delivery_country,
        expected_delivery_date,
        payment_status: payment_status || 'pending',
        buyer_notes,
      },
    });

    const safeOrder = convertBigIntToString(newOrder);
    return res.status(201).json({
      message: "Order created successfully",
      order: safeOrder,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to create order" });
  }
}

// Get All Orders
export async function getAllOrders(req: Request, res: Response) {
  try {
    const { buyer_business_id, seller_business_id, status } = req.query;
    
    const where: any = {};
    if (buyer_business_id) where.buyer_business_id = BigInt(buyer_business_id as string);
    if (seller_business_id) where.seller_business_id = BigInt(seller_business_id as string);
    if (status) where.status = status;

    const orders = await prisma.orders.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      }
    });
    const safeOrders = convertBigIntToString(orders);
    res.json({ message: "Fetched all orders successfully", orders: safeOrders });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch orders" });
  }
}

// Get Order by ID
export async function getOrderById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const order = await prisma.orders.findUnique({
      where: { order_id: BigInt(id) },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const safeOrder = convertBigIntToString(order);
    res.json({ message: "Order fetched successfully", order: safeOrder });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch order" });
  }
}

// Update Order
export async function updateOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.buyer_business_id) {
      updateData.buyer_business_id = BigInt(updateData.buyer_business_id);
    }
    if (updateData.seller_business_id) {
      updateData.seller_business_id = BigInt(updateData.seller_business_id);
    }

    const updatedOrder = await prisma.orders.update({
      where: { order_id: BigInt(id) },
      data: updateData,
    });

    const safeOrder = convertBigIntToString(updatedOrder);
    res.json({ message: "Order updated successfully", order: safeOrder });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update order" });
  }
}

// Update Order Status
export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedOrder = await prisma.orders.update({
      where: { order_id: BigInt(id) },
      data: { status },
    });

    const safeOrder = convertBigIntToString(updatedOrder);
    res.json({ message: "Order status updated successfully", order: safeOrder });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update order status" });
  }
}

// Delete Order
export async function deleteOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.orders.delete({
      where: { order_id: BigInt(id) },
    });

    res.json({ message: "Order deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete order" });
  }
}
