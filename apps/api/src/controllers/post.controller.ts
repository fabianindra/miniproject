import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getAllPosts(req: Request, res: Response) {
    try {

        const posts = await prisma.post.findMany()

        return res.send({
            message: "success",
            data: posts
        })

    } catch (err) {
        return res.send({
            message: JSON.stringify(err)
        })
    }
}

export async function getDetailPost(req: Request, res: Response) {
    try {

        const { id } = req.params

        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (post) {
            return res.send({
                message: "success",
                data: post
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

export async function createPost(req: Request, res: Response) {
    try {

        const { user_id, title, content } = req.body

        const postData = await prisma.post.create({
            data: {
                userId: user_id,
                title: title,
                content: content
            }
        })

        return res.send({
            message: "success",
            data: postData
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