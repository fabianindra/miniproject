import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

type Point = {
    userId: number;
    amount: number;
    rupiah: number;
    changeType: string;
}

export const fetchRowByIdAndCount = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const rows = await prisma.point.findMany({
            where: {
                userId: parseInt(id),
            }
        });

        const now = new Date();
        const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); // 90 days ago

        let totalAmount = 0;
        let totalRupiah = 0;

        rows.forEach(row => {
            totalRupiah += row.rupiah;
            if (new Date(row.createdAt) >= ninetyDaysAgo) {
                totalAmount += row.amount;
            }
        });

        return res.status(200).json({ totalAmount, totalRupiah });
    } catch (error) {
        console.error('Error fetching rows by ID and count', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}

export const inputRupiah = async (req: Request, res: Response) => {
    try {
        const getRupiah = req.body;
        const newPoint: Point = {
            userId: parseInt(getRupiah.id),
            amount: 0,
            rupiah: parseInt(getRupiah.rupiahAdd),
            changeType: 'in'
        };
        
        await prisma.point.create({
            data: newPoint
        });
    } catch (error) {
        console.error('Error input rupiah')
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}