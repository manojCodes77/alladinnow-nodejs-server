import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertBigIntToString } from '../utils/main';

const prisma = new PrismaClient();

// Create Quotation
export async function createQuotation(req: Request, res: Response) {
  try {
    const { 
      quotation_id,
      inquiry_id,
      seller_business_id,
      validity_days,
      delivery_time_days,
      payment_terms,
      other_terms,
      status,
      setup
    } = req.body;

    if (!inquiry_id || !seller_business_id) {
      return res.status(400).json({ error: "Inquiry ID and seller business ID are required" });
    }

    const newQuotation = await prisma.quotations.create({
      data: {
        quotation_id,
        inquiry_id: BigInt(inquiry_id),
        seller_business_id: BigInt(seller_business_id),
        validity_days,
        delivery_time_days,
        payment_terms,
        other_terms,
        status: status || 'draft',
        setup,
      },
    });

    const safeQuotation = convertBigIntToString(newQuotation);
    return res.status(201).json({
      message: "Quotation created successfully",
      quotation: safeQuotation,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to create quotation" });
  }
}

// Get All Quotations
export async function getAllQuotations(req: Request, res: Response) {
  try {
    const { inquiry_id, seller_business_id, status } = req.query;
    
    const where: any = {};
    if (inquiry_id) where.inquiry_id = BigInt(inquiry_id as string);
    if (seller_business_id) where.seller_business_id = BigInt(seller_business_id as string);
    if (status) where.status = status;

    const quotations = await prisma.quotations.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      }
    });
    const safeQuotations = convertBigIntToString(quotations);
    res.json({ message: "Fetched all quotations successfully", quotations: safeQuotations });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch quotations" });
  }
}

// Get Quotation by ID
export async function getQuotationById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const quotation = await prisma.quotations.findUnique({
      where: { quotation_id: BigInt(id) },
    });

    if (!quotation) {
      return res.status(404).json({ error: "Quotation not found" });
    }

    const safeQuotation = convertBigIntToString(quotation);
    res.json({ message: "Quotation fetched successfully", quotation: safeQuotation });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch quotation" });
  }
}

// Update Quotation
export async function updateQuotation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.inquiry_id) {
      updateData.inquiry_id = BigInt(updateData.inquiry_id);
    }
    if (updateData.seller_business_id) {
      updateData.seller_business_id = BigInt(updateData.seller_business_id);
    }

    const updatedQuotation = await prisma.quotations.update({
      where: { quotation_id: BigInt(id) },
      data: updateData,
    });

    const safeQuotation = convertBigIntToString(updatedQuotation);
    res.json({ message: "Quotation updated successfully", quotation: safeQuotation });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update quotation" });
  }
}

// Update Quotation Status
export async function updateQuotationStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedQuotation = await prisma.quotations.update({
      where: { quotation_id: BigInt(id) },
      data: { status },
    });

    const safeQuotation = convertBigIntToString(updatedQuotation);
    res.json({ message: "Quotation status updated successfully", quotation: safeQuotation });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update quotation status" });
  }
}

// Delete Quotation
export async function deleteQuotation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.quotations.delete({
      where: { quotation_id: BigInt(id) },
    });

    res.json({ message: "Quotation deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete quotation" });
  }
}
