import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

type Transaction = {
    userId: number,
    eventId: number,
    checkOut: number,
}

type Point = {
    userId: number,
    amount: number,
    rupiah: number,
    changeType: string
}

const prisma = new PrismaClient();

export const buyTicket = async (req: Request, res: Response) => {
    try {
        const ticketBought = req.body;
        const userId = parseInt(ticketBought.id);
        
        const pointData = await prisma.point.findMany({
            where: { userId: userId }
        });

        const rupiahData = await prisma.user.findMany({
            where: { id: userId }
        });

        let totalAmount = 0;
        pointData.forEach(point => {
            totalAmount += point.amount;
        });

        let totalDiscount = 0;
        rupiahData.forEach(user => {
            totalDiscount += user.discount ?? 0
        })

        // Calculate totalRupiah before applying discount
        let totalRupiahBeforeDiscount = ticketBought.price - totalAmount;

        // Calculate totalRupiah after applying discount as a percentage
        let totalRupiahAfterDiscount = totalRupiahBeforeDiscount - (totalRupiahBeforeDiscount * (totalDiscount / 100));

        if (totalRupiahAfterDiscount < 0) {
            return res.status(400).json({ error: 'Insufficient rupiah' });
        }

        const newTransaction: Transaction = {
            userId: userId,
            eventId: parseInt(ticketBought.eventId),
            checkOut: parseInt(ticketBought.price)
        };

        await prisma.transaction.create({
            data: newTransaction
        });

        await prisma.point.create({
            data: {
                userId: parseInt(ticketBought.id),
                amount: -totalAmount,
                rupiah: -totalRupiahAfterDiscount,
                changeType: 'out'
            }
        });
    } catch (error) {
        console.error('Error input transaction')
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}