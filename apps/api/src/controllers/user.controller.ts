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

export async function getUserName(req: Request, res: Response) {
    try {
        const userId = parseInt(req.query.userId as string);

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                username: true
            }
        });

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        return res.send({
            message: "get username",
            data: user.username
        });
    }

    catch (err:any) {
        return res.status(500).send({
            message: err.message // Sending error message
        });
    }
}


export const getRefCode = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const ref = await prisma.user.findFirst({
            where: {
                id: id,
            }
        });
        if (ref) {
            return res.send({
                data: {
                    refCode: ref.code,
                    discount: ref.discount
                }
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
