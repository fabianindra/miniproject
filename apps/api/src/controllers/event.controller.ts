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
    seat: string
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

export async function getUserEvents(req: Request, res: Response) {
    try {
        const requestId = parseInt(req.query.id as string, 10); 

        const eventTickets = await prisma.transaction.findMany({
            where: {
                userId: requestId
            }
        });

        const eventIds = eventTickets.map(ticket => ticket.eventId).filter(id => id !== null) as number[];

        const events = await prisma.event.findMany({
            where: {
                id: {
                    in: eventIds
                }
            }
        });

        return res.send({
            message: "success",
            data: events
        });

    } catch (err: any) {
        return res.status(500).send({
            message: "Internal server error",
            error: err.toString()
        });
    }
}



export async function getOneEvent(req: Request, res: Response) {
    try {

        const requestId = parseInt(req.query.id as string, 10); 

        const events = await prisma.event.findFirst({
            where: {
                id: requestId
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
                seat: parseInt(body.seat, 10)
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

export async function deleteEvent(req: Request, res: Response) {
    try {
        const eventId = parseInt(req.params.eventId, 10);

        const deletedEvent = await prisma.event.delete({
            where: {
                id: eventId,
            },
        });

        return res.send({
            message: "success",
            data: deletedEvent
        });

    } catch (err:any) {
        return res.status(500).send({
            message: "Error deleting event",
            error: err.message
        });
    }
}