import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertBigIntToString } from '../utils/main';

const prisma = new PrismaClient();

// Get All Price Units
export async function getAllPriceUnits(req: Request, res: Response) {
  try {
    const { is_active, unit_type } = req.query;
    
    const where: any = {};
    if (is_active !== undefined) where.is_active = is_active === 'true';
    if (unit_type) where.unit_type = unit_type;

    const priceUnits = await prisma.price_units.findMany({
      where,
      orderBy: {
        display_order: 'asc',
      }
    });
    
    res.json({ 
      message: "Fetched all price units successfully", 
      priceUnits 
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch price units" });
  }
}

// Get Price Units by Type
export async function getPriceUnitsByType(req: Request, res: Response) {
  try {
    const { type } = req.params;
    
    const priceUnits = await prisma.price_units.findMany({
      where: { 
        unit_type: type,
        is_active: true,
      },
      orderBy: {
        display_order: 'asc',
      }
    });
    
    res.json({ 
      message: `Fetched ${type} price units successfully`, 
      priceUnits 
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch price units" });
  }
}

// Get Price Unit by ID
export async function getPriceUnitById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const priceUnit = await prisma.price_units.findUnique({
      where: { unit_id: parseInt(id) },
    });

    if (!priceUnit) {
      return res.status(404).json({ error: "Price unit not found" });
    }

    res.json({ message: "Price unit fetched successfully", priceUnit });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch price unit" });
  }
}

// Get Price Unit by Code
export async function getPriceUnitByCode(req: Request, res: Response) {
  try {
    const { code } = req.params;
    const priceUnit = await prisma.price_units.findUnique({
      where: { unit_code: code.toLowerCase() },
    });

    if (!priceUnit) {
      return res.status(404).json({ error: "Price unit not found" });
    }

    res.json({ message: "Price unit fetched successfully", priceUnit });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch price unit" });
  }
}

// Create Price Unit (Admin only)
export async function createPriceUnit(req: Request, res: Response) {
  try {
    const { 
      unit_code, 
      unit_name, 
      unit_type,
      abbreviation,
      is_active, 
      display_order 
    } = req.body;

    if (!unit_code || !unit_name || !unit_type) {
      return res.status(400).json({ 
        error: "Unit code, name, and type are required" 
      });
    }

    const newPriceUnit = await prisma.price_units.create({
      data: {
        unit_code: unit_code.toLowerCase(),
        unit_name,
        unit_type,
        abbreviation,
        is_active: is_active !== undefined ? is_active : true,
        display_order,
      },
    });

    res.status(201).json({
      message: "Price unit created successfully",
      priceUnit: newPriceUnit,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to create price unit" });
  }
}

// Update Price Unit (Admin only)
export async function updatePriceUnit(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.unit_code) {
      updateData.unit_code = updateData.unit_code.toLowerCase();
    }

    const updatedPriceUnit = await prisma.price_units.update({
      where: { unit_id: parseInt(id) },
      data: updateData,
    });

    res.json({ 
      message: "Price unit updated successfully", 
      priceUnit: updatedPriceUnit 
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update price unit" });
  }
}

// Delete Price Unit (Admin only)
export async function deletePriceUnit(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    // Check if price unit is in use
    const productsCount = await prisma.products.count({
      where: { price_unit_id: parseInt(id) }
    });

    if (productsCount > 0) {
      return res.status(400).json({ 
        error: `Cannot delete price unit. It is used by ${productsCount} product(s)` 
      });
    }

    await prisma.price_units.delete({
      where: { unit_id: parseInt(id) },
    });

    res.json({ message: "Price unit deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete price unit" });
  }
}
