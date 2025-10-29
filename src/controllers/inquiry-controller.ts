import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertBigIntToString } from '../utils/main';

const prisma = new PrismaClient();

// Create Inquiry
export async function createInquiry(req: Request, res: Response) {
  try {
    const { 
      inquiry_id,
      buyer_business_id,
      product_id,
      inquiry_title,
      description,
      required_quantity,
      budget_range,
      expected_delivery,
      status
    } = req.body;

    if (!buyer_business_id || !inquiry_title) {
      return res.status(400).json({ error: "Buyer business ID and inquiry title are required" });
    }

    const newInquiry = await prisma.inquiries.create({
      data: {
        inquiry_id,
        buyer_business_id: BigInt(buyer_business_id),
        product_id: product_id ? BigInt(product_id) : null,
        inquiry_title,
        description,
        required_quantity,
        budget_range,
        expected_delivery,
        status: status || 'open',
      },
    });

    const safeInquiry = convertBigIntToString(newInquiry);
    return res.status(201).json({
      message: "Inquiry created successfully",
      inquiry: safeInquiry,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to create inquiry" });
  }
}

// Get All Inquiries
export async function getAllInquiries(req: Request, res: Response) {
  try {
    const { buyer_business_id, status } = req.query;
    
    const where: any = {};
    if (buyer_business_id) where.buyer_business_id = BigInt(buyer_business_id as string);
    if (status) where.status = status;

    const inquiries = await prisma.inquiries.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      }
    });
    const safeInquiries = convertBigIntToString(inquiries);
    res.json({ message: "Fetched all inquiries successfully", inquiries: safeInquiries });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch inquiries" });
  }
}

// Get Inquiry by ID
export async function getInquiryById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const inquiry = await prisma.inquiries.findUnique({
      where: { inquiry_id: BigInt(id) },
    });

    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    const safeInquiry = convertBigIntToString(inquiry);
    res.json({ message: "Inquiry fetched successfully", inquiry: safeInquiry });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch inquiry" });
  }
}

// Update Inquiry
export async function updateInquiry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.buyer_business_id) {
      updateData.buyer_business_id = BigInt(updateData.buyer_business_id);
    }
    if (updateData.product_id) {
      updateData.product_id = BigInt(updateData.product_id);
    }

    const updatedInquiry = await prisma.inquiries.update({
      where: { inquiry_id: BigInt(id) },
      data: updateData,
    });

    const safeInquiry = convertBigIntToString(updatedInquiry);
    res.json({ message: "Inquiry updated successfully", inquiry: safeInquiry });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update inquiry" });
  }
}

// Update Inquiry Status
export async function updateInquiryStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedInquiry = await prisma.inquiries.update({
      where: { inquiry_id: BigInt(id) },
      data: { status },
    });

    const safeInquiry = convertBigIntToString(updatedInquiry);
    res.json({ message: "Inquiry status updated successfully", inquiry: safeInquiry });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update inquiry status" });
  }
}

// Delete Inquiry
export async function deleteInquiry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.inquiries.delete({
      where: { inquiry_id: BigInt(id) },
    });

    res.json({ message: "Inquiry deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete inquiry" });
  }
}
