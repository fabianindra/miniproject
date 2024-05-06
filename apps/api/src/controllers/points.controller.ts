import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const fetchRowByIdAndCount = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; // Assuming ID is passed as a route parameter
        const rows = await prisma.points.findMany({
            where: {
                id: parseInt(id), // Assuming ID is of type number
            }
        });
        const columnCount = rows.length;
        return { rows, columnCount };
    } catch (error) {
        console.error('Error fetching rows by ID and count', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}
