import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

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

export async function getDetailEvents(req: Request, res: Response) {
    try {

        const { id } = req.params

        const event = await prisma.event.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (event) {
            return res.send({
                message: "success",
                data: event
            })
        }

        return res.status(404).send({
            message: "Not Found",
            data: {}
        })

    } catch (err) {
        return res.send({
            message: JSON.stringify(err)
        })
    }
}

export async function createEvents(req: Request, res: Response) {
    try {

        const { user_id, title, content } = req.body

        const eventData = await prisma.event.create({
            data: {
                userId: user_id,
                title: title,
                content: content
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

export async function test(req: Request, res: Response) {
    return res.send({
        message: "test"
    })
}

export async function test2(req: Request, res: Response) {
    return res.send({
        message: "test2"
    })
}