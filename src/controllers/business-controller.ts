import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertBigIntToString } from '../utils/main';

const prisma = new PrismaClient();

// Create Business
export async function createBusiness(req: Request, res: Response) {
  try {
    const { 
      business_name, 
      business_type_id, 
      description, 
      license_number, 
      tax_number,
      website_url,
      employee_count,
      year_established,
      is_verified
    } = req.body;

    const newBusiness = await prisma.business.create({
      data: {
        business_name,
        business_type_id,
        description,
        license_number,
        tax_number,
        website_url,
        employee_count,
        year_established,
        is_verified: is_verified || false,
      },
    });

    const safeBusiness = convertBigIntToString(newBusiness);
    return res.status(201).json({
      message: "Business created successfully",
      business: safeBusiness,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to create business" });
  }
}

// Get All Businesses
export async function getAllBusinesses(req: Request, res: Response) {
  try {
    const businesses = await prisma.business.findMany({
      include: {
        business_type: true,
      }
    });
    const safeBusinesses = convertBigIntToString(businesses);
    res.json({ message: "Fetched all businesses successfully", businesses: safeBusinesses });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch businesses" });
  }
}

// Get Business by ID
export async function getBusinessById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const business = await prisma.business.findUnique({
      where: { business_id: BigInt(id) },
      include: {
        business_type: true,
      }
    });

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const safeBusiness = convertBigIntToString(business);
    res.json({ message: "Business fetched successfully", business: safeBusiness });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch business" });
  }
}

// Update Business
export async function updateBusiness(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBusiness = await prisma.business.update({
      where: { business_id: BigInt(id) },
      data: updateData,
    });

    const safeBusiness = convertBigIntToString(updatedBusiness);
    res.json({ message: "Business updated successfully", business: safeBusiness });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update business" });
  }
}

// Delete Business
export async function deleteBusiness(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.business.delete({
      where: { business_id: BigInt(id) },
    });

    res.json({ message: "Business deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete business" });
  }
}
