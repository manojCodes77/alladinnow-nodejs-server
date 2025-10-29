import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertBigIntToString } from '../utils/main';

const prisma = new PrismaClient();

// Create Order Item
export async function createOrderItem(req: Request, res: Response) {
  try {
    const { 
      order_item_id,
      order_id,
      product_id,
      product_name,
      quantity_unit,
      unit_price,
      discount_rate,
      total_price,
      tax_rate,
      hs_code
    } = req.body;

    if (!order_id || !product_id) {
      return res.status(400).json({ error: "Order ID and Product ID are required" });
    }

    const newOrderItem = await prisma.order_items.create({
      data: {
        order_item_id,
        order_id: BigInt(order_id),
        product_id: BigInt(product_id),
        product_name,
        quantity_unit,
        unit_price,
        discount_rate,
        total_price,
        tax_rate,
        hs_code,
      },
    });

    const safeOrderItem = convertBigIntToString(newOrderItem);
    return res.status(201).json({
      message: "Order item created successfully",
      orderItem: safeOrderItem,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to create order item" });
  }
}

// Get All Order Items
export async function getAllOrderItems(req: Request, res: Response) {
  try {
    const { order_id } = req.query;
    
    const where: any = {};
    if (order_id) where.order_id = BigInt(order_id as string);

    const orderItems = await prisma.order_items.findMany({
      where,
    });
    const safeOrderItems = convertBigIntToString(orderItems);
    res.json({ message: "Fetched all order items successfully", orderItems: safeOrderItems });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch order items" });
  }
}

// Get Order Item by ID
export async function getOrderItemById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const orderItem = await prisma.order_items.findUnique({
      where: { order_item_id: BigInt(id) },
    });

    if (!orderItem) {
      return res.status(404).json({ error: "Order item not found" });
    }

    const safeOrderItem = convertBigIntToString(orderItem);
    res.json({ message: "Order item fetched successfully", orderItem: safeOrderItem });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch order item" });
  }
}

// Update Order Item
export async function updateOrderItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.order_id) {
      updateData.order_id = BigInt(updateData.order_id);
    }
    if (updateData.product_id) {
      updateData.product_id = BigInt(updateData.product_id);
    }

    const updatedOrderItem = await prisma.order_items.update({
      where: { order_item_id: BigInt(id) },
      data: updateData,
    });

    const safeOrderItem = convertBigIntToString(updatedOrderItem);
    res.json({ message: "Order item updated successfully", orderItem: safeOrderItem });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update order item" });
  }
}

// Delete Order Item
export async function deleteOrderItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.order_items.delete({
      where: { order_item_id: BigInt(id) },
    });

    res.json({ message: "Order item deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete order item" });
  }
}
