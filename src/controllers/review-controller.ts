import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertBigIntToString } from '../utils/main';

const prisma = new PrismaClient();

// Create Review
export async function createReview(req: Request, res: Response) {
  try {
    const { 
      review_id,
      order_id,
      reviewer_business_id,
      reviewed_business_id,
      rating,
      review_text,
      product_quality_rating,
      delivery_rating,
      communication_rating,
      is_approved
    } = req.body;

    if (!order_id || !reviewer_business_id || !reviewed_business_id || !rating) {
      return res.status(400).json({ error: "Order ID, reviewer, reviewed business, and rating are required" });
    }

    const newReview = await prisma.reviews.create({
      data: {
        review_id,
        order_id: BigInt(order_id),
        reviewer_business_id: BigInt(reviewer_business_id),
        reviewed_business_id: BigInt(reviewed_business_id),
        rating,
        review_text,
        product_quality_rating,
        delivery_rating,
        communication_rating,
        is_approved: is_approved || false,
      },
    });

    const safeReview = convertBigIntToString(newReview);
    return res.status(201).json({
      message: "Review created successfully",
      review: safeReview,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to create review" });
  }
}

// Get All Reviews
export async function getAllReviews(req: Request, res: Response) {
  try {
    const { reviewed_business_id, is_approved } = req.query;
    
    const where: any = {};
    if (reviewed_business_id) where.reviewed_business_id = BigInt(reviewed_business_id as string);
    if (is_approved !== undefined) where.is_approved = is_approved === 'true';

    const reviews = await prisma.reviews.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      }
    });
    const safeReviews = convertBigIntToString(reviews);
    res.json({ message: "Fetched all reviews successfully", reviews: safeReviews });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch reviews" });
  }
}

// Get Review by ID
export async function getReviewById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const review = await prisma.reviews.findUnique({
      where: { review_id: BigInt(id) },
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    const safeReview = convertBigIntToString(review);
    res.json({ message: "Review fetched successfully", review: safeReview });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch review" });
  }
}

// Update Review
export async function updateReview(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.order_id) {
      updateData.order_id = BigInt(updateData.order_id);
    }
    if (updateData.reviewer_business_id) {
      updateData.reviewer_business_id = BigInt(updateData.reviewer_business_id);
    }
    if (updateData.reviewed_business_id) {
      updateData.reviewed_business_id = BigInt(updateData.reviewed_business_id);
    }

    const updatedReview = await prisma.reviews.update({
      where: { review_id: BigInt(id) },
      data: updateData,
    });

    const safeReview = convertBigIntToString(updatedReview);
    res.json({ message: "Review updated successfully", review: safeReview });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update review" });
  }
}

// Approve Review
export async function approveReview(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updatedReview = await prisma.reviews.update({
      where: { review_id: BigInt(id) },
      data: { is_approved: true },
    });

    const safeReview = convertBigIntToString(updatedReview);
    res.json({ message: "Review approved successfully", review: safeReview });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to approve review" });
  }
}

// Delete Review
export async function deleteReview(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.reviews.delete({
      where: { review_id: BigInt(id) },
    });

    res.json({ message: "Review deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete review" });
  }
}
