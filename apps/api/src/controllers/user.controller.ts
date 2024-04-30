import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getAllUsers(req: Request, res: Response) {

    try {

        const users = await prisma.user.findMany()
        return res.send({
            message: "get all users",
            data: users
        })
    }

    catch (err) {
        return res.send({
            message: JSON.stringify(err)
        })
    }
}