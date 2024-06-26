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
        const eventId = parseInt(ticketBought.eventId)
        
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

        let totalRupiahBeforeDiscount = ticketBought.price - totalAmount;
        let totalRupiahAfterDiscount = totalRupiahBeforeDiscount - (totalRupiahBeforeDiscount * (totalDiscount / 100));

        if (totalRupiahAfterDiscount < 0) {
            throw new Error('Insufficient rupiah');
        }

        const newTransaction: Transaction = {
            userId: userId,
            eventId: parseInt(ticketBought.eventId),
            checkOut: parseInt(ticketBought.price)
        };

        if (totalAmount >= 0) {
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

            await prisma.user.update({
                where: { id: userId },
                data: { discount: 0 }
            });

            await prisma.event.update({
                where: { id: eventId },
                data: { seat: {decrement: 1}  }
            });
        }
    } catch (error) {
        console.error('Error input transaction')
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}