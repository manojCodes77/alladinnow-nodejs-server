import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get All Currencies
export async function getAllCurrencies(req: Request, res: Response) {
  try {
    const { is_active } = req.query;
    
    const where: any = {};
    if (is_active !== undefined) where.is_active = is_active === 'true';

    const currencies = await prisma.currencies.findMany({
      where,
      orderBy: {
        display_order: 'asc',
      }
    });
    
    res.json({ 
      message: "Fetched all currencies successfully", 
      currencies 
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch currencies" });
  }
}

// Get Currency by ID
export async function getCurrencyById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const currency = await prisma.currencies.findUnique({
      where: { currency_id: parseInt(id) },
    });

    if (!currency) {
      return res.status(404).json({ error: "Currency not found" });
    }

    res.json({ message: "Currency fetched successfully", currency });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch currency" });
  }
}

// Get Currency by Code
export async function getCurrencyByCode(req: Request, res: Response) {
  try {
    const { code } = req.params;
    const currency = await prisma.currencies.findUnique({
      where: { currency_code: code.toUpperCase() },
    });

    if (!currency) {
      return res.status(404).json({ error: "Currency not found" });
    }

    res.json({ message: "Currency fetched successfully", currency });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch currency" });
  }
}

// Create Currency (Admin only)
export async function createCurrency(req: Request, res: Response) {
  try {
    const { 
      currency_code, 
      currency_name, 
      symbol, 
      is_active, 
      display_order 
    } = req.body;

    if (!currency_code || !currency_name || !symbol) {
      return res.status(400).json({ 
        error: "Currency code, name, and symbol are required" 
      });
    }

    const newCurrency = await prisma.currencies.create({
      data: {
        currency_code: currency_code.toUpperCase(),
        currency_name,
        symbol,
        is_active: is_active !== undefined ? is_active : true,
        display_order,
      },
    });

    res.status(201).json({
      message: "Currency created successfully",
      currency: newCurrency,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to create currency" });
  }
}

// Update Currency (Admin only)
export async function updateCurrency(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.currency_code) {
      updateData.currency_code = updateData.currency_code.toUpperCase();
    }

    const updatedCurrency = await prisma.currencies.update({
      where: { currency_id: parseInt(id) },
      data: updateData,
    });

    res.json({ 
      message: "Currency updated successfully", 
      currency: updatedCurrency 
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update currency" });
  }
}

// Delete Currency (Admin only)
export async function deleteCurrency(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    // Check if currency is in use
    const productsCount = await prisma.products.count({
      where: { currency_id: parseInt(id) }
    });

    if (productsCount > 0) {
      return res.status(400).json({ 
        error: `Cannot delete currency. It is used by ${productsCount} product(s)` 
      });
    }

    await prisma.currencies.delete({
      where: { currency_id: parseInt(id) },
    });

    res.json({ message: "Currency deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete currency" });
  }
}
