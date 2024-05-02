import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

type Event = {
    userId : number,
    title : string,
    date : Date
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

export async function createEvents(req: Request, res: Response) {
    try {

        const {userId, title, date} : Event = req.body

        const eventData = await prisma.event.create({
            data: {
                userId: userId,
                title: title,
                date: date
            }
        })

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