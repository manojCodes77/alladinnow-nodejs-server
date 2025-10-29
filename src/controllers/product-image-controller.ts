import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertBigIntToString } from '../utils/main';

const prisma = new PrismaClient();

// Create Product Image
export async function createProductImage(req: Request, res: Response) {
  try {
    const { 
      product_id,
      image_url,
      display_order,
      is_primary
    } = req.body;

    if (!product_id || !image_url) {
      return res.status(400).json({ error: "Product ID and image URL are required" });
    }

    const newProductImage = await prisma.product_images.create({
      data: {
        product_id: BigInt(product_id),
        image_url,
        display_order,
        is_primary: is_primary || false,
      },
    });

    const safeProductImage = convertBigIntToString(newProductImage);
    return res.status(201).json({
      message: "Product image created successfully",
      productImage: safeProductImage,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to create product image" });
  }
}

// Get All Product Images
export async function getAllProductImages(req: Request, res: Response) {
  try {
    const { product_id } = req.query;
    
    const where: any = {};
    if (product_id) where.product_id = BigInt(product_id as string);

    const productImages = await prisma.product_images.findMany({
      where,
      orderBy: {
        display_order: 'asc',
      }
    });
    const safeProductImages = convertBigIntToString(productImages);
    res.json({ message: "Fetched all product images successfully", productImages: safeProductImages });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch product images" });
  }
}

// Get Product Image by ID
export async function getProductImageById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const productImage = await prisma.product_images.findUnique({
      where: { image_id: BigInt(id) },
    });

    if (!productImage) {
      return res.status(404).json({ error: "Product image not found" });
    }

    const safeProductImage = convertBigIntToString(productImage);
    res.json({ message: "Product image fetched successfully", productImage: safeProductImage });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch product image" });
  }
}

// Update Product Image
export async function updateProductImage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.product_id) {
      updateData.product_id = BigInt(updateData.product_id);
    }

    const updatedProductImage = await prisma.product_images.update({
      where: { image_id: BigInt(id) },
      data: updateData,
    });

    const safeProductImage = convertBigIntToString(updatedProductImage);
    res.json({ message: "Product image updated successfully", productImage: safeProductImage });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update product image" });
  }
}

// Delete Product Image
export async function deleteProductImage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.product_images.delete({
      where: { image_id: BigInt(id) },
    });

    res.json({ message: "Product image deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete product image" });
  }
}

// Set Primary Image
export async function setPrimaryImage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // First, set all images for this product to non-primary
    await prisma.product_images.updateMany({
      where: { product_id: BigInt(product_id) },
      data: { is_primary: false },
    });

    // Then set the specified image as primary
    const updatedProductImage = await prisma.product_images.update({
      where: { image_id: BigInt(id) },
      data: { is_primary: true },
    });

    const safeProductImage = convertBigIntToString(updatedProductImage);
    res.json({ message: "Primary image set successfully", productImage: safeProductImage });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to set primary image" });
  }
}
