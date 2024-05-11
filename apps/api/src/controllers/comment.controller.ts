import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"


type Comment = {
    id: string,
    userId: string,
    username: string,
    eventId: string,
    comment: string
}

  const prisma = new PrismaClient()

  export async function getAllComments(req: Request, res: Response) {
    try {
        const eventId = parseInt(req.query.eventId as string, 10);

        const comments = await prisma.comment.findMany({
            where: {
                eventId: eventId
            }
        });

        return res.send({
            message: "success",
            data: comments
        })

    } catch (err) {
        return res.send({
            message: JSON.stringify(err)
        })
    }
}

export async function createComment(req: Request, res: Response) {
    try {
        const body : Comment = req.body;

        const userId = parseInt(body.id)

        const username = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        const commentData = await prisma.comment.create({
            data: {
                userId: parseInt(body.id, 10),
                eventId: parseInt(body.eventId, 10),
                comment: body.comment,
                username: username ? username.username : "Anonymous"
                }
            }
        )
        return res.send({
            message: "success",
            data: commentData
        })

    } catch (err) {
        return res.send({
            message: JSON.stringify(err)
        })
    }
}