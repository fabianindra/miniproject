import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { compare, genSalt, hash } from "bcrypt" 
import { sign } from 'jsonwebtoken'
import generateReferralCode from "@/referralCode"

type User = {
    email: string;
    username: string;
    password: string;
    name: string;
    role: string;
    code: string;
    refererCode: string;
}

type UserModel = {
    id: number;
    email: string;
    username: string;
    password: string;
    name: string;
    code: string;
    refererCode: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
    try {

        const body: User = req.body
        const refCode = generateReferralCode();

        const salt = await genSalt(10)
        const hashedPassword = await hash(body.password, salt)

        const existingUser = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if (existingUser) {
            return res.status(400).send({
                message: "email already exists",
            })
        }
        
        const register = await prisma.user.create({
            data: {
                username: body.username,
                name: body.name,
                email: body.email,
                password: hashedPassword,
                code: refCode,
                refererCode: body.refererCode,
            }
        })

        return res.send({
            message: "success",
            data: register
        })
    }
    catch (err) {
        return res.send({
            message: JSON.stringify(err)
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const body: User = req.body
        const user: (UserModel | null) = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        })

        if (!user) {
            return res.status(404).send({
                message: "invalid email or password 1",
            })
        }

        const isValidPassword = await compare(body.password, user.password)

        if (!isValidPassword) {
            return res.status(400).send({
                message: JSON.stringify("invalid email or password 2"),
            })
        }

        const jwtPayload = { email: user.email, name: user.name, username: user.username, role: user.role}
        const token = sign(jwtPayload, String(process.env.JWT_TOKEN), { expiresIn: "1h"})

        return res.send({
            message: "success",
            data: user,
            token: token
        })
    }
    catch (err) {
        return res.send({
            message: JSON.stringify(err),
        })
    }
}
