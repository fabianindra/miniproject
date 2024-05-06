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

export const getRefCode = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id); // Assuming ID is passed as a route parameter
        const ref = await prisma.user.findFirst({
            where: {
                id: id, // Assuming ID is of type number
            }
        });
        if (ref) {
            return res.send({
                data: ref.code
            })
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error referral code', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}
