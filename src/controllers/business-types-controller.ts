import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertBigIntToString } from '../utils/main';

const prisma = new PrismaClient();

export async function getAllBusinessTypes(req: Request, res: Response) {
    try {
        
       const businessTypes=await prisma.business_types.findMany();
       const safeBusinessTypes = convertBigIntToString(businessTypes);
       res.status(200).json({ message: "Fetched all business types successfully", businessTypes: safeBusinessTypes });
    } catch (err: any) {
        console.error('Error fetching business types:', err);
        res.status(500).json({ error: err.message || "Failed to fetch business types" });
    }
}