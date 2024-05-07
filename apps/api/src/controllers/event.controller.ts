import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

type Event = {
    id: string,
    userId: number,
    title: string,
    date: string,
    price: string,
    location: string,
    description: string,
    seats: string
}

const prisma = new PrismaClient()

export async function getAllEvents(req: Request, res: Response) {
    try {

        const events = await prisma.event.findMany()

        return res.send({
            message: "success",
            data: events
        })

    } catch (err) {
        return res.send({
            message: JSON.stringify(err)
        })
    }
}

export async function getOrgEvents(req: Request, res: Response) {
    try {

        const requestId = parseInt(req.query.id as string, 10); 

        const events = await prisma.event.findMany({
            where: {
                userId: requestId
            }
        });

        return res.send({
            message: "success",
            data: events
        })

    } catch (err) {
        return res.send({
            message: JSON.stringify(err)
        })
    }
}

export async function createEvents(req: Request, res: Response) {
    try {
        const body : Event = req.body;
          
        const formattedDate = new Date(body.date);

        const eventData = await prisma.event.create({
            data: {
                userId: parseInt(body.id, 10),
                title: body.title,
                date: formattedDate,
                price: parseInt(body.price, 10),
                location: body.location,
                description: body.description,
                seats: parseInt(body.seats, 10)
            },
        });

        return res.send({
            message: "success",
            data: eventData
        })

    } catch (err) {
        return res.send({
            message: JSON.stringify(err)
        })
    }
}