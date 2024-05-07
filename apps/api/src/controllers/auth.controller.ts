import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { JwtPayload, sign } from 'jsonwebtoken';
import generateReferralCode from "@/referralCode";

type User = {
    id: number;
    email: string;
    username: string;
    password: string;
    name: string;
    role: string;
    code: string;
    refererCode: string | null;
    discount?: number;
}

type UserModel = {
    id: number;
    email: string;
    username: string;
    password: string;
    name: string;
    code: string;
    refererCode: string | null;
    discount?: number | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

type Point = {
    userId: number;
    amount: number;
    changeType: string;
}

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    try {
        const body: User = req.body;
        let refCode = generateReferralCode()
        const salt = await genSalt(10);
        const hashedPassword = await hash(body.password, salt);

        try {
            if (body.refererCode) {
                const referralUser = await prisma.user.findFirst({
                    where: { code: body.refererCode },
                });
                if (!referralUser) {
                    return res.status(400).json({ error: 'Invalid referral code' });
                } else {
                    await prisma.point.create({
                        data: {
                            userId: referralUser.id,
                            amount: 10000,
                            changeType: 'in'
                        }
                    });
                }
            }
        } catch (err) {
            return res.send({
                message: JSON.stringify(err)
            });
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        });

        if (existingUser) {
            return res.status(400).send({
                message: "email already exists",
            });
        }

        let discountAmount = 0;
        if (body.refererCode) {
            discountAmount = 10;
        }

        const role = body.role === 'admin' ? 'admin' : 'user';

        const register = await prisma.user.create({
            data: {
                username: body.username,
                name: body.name,
                email: body.email,
                password: hashedPassword,
                code: refCode,
                refererCode: body.refererCode || "",
                discount: discountAmount,
                role: role
            }
        });


        return res.send({
            message: "success",
            data: register
        });
    } catch (err) {
        return res.send({
            message: JSON.stringify(err)
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const body: User = req.body;
        const user: (UserModel | null) = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        });

        if (!user) {
            return res.status(404).send({
                message: "invalid email or password 1",
            });
        }

        const isValidPassword = await compare(body.password, user.password);

        if (!isValidPassword) {
            return res.status(400).send({
                message: JSON.stringify("invalid email or password 2"),
            });
        }

        const jwtPayload = { email: user.email, name: user.name, username: user.username, role: user.role };
        const token = sign(jwtPayload, String(process.env.JWT_SECRET), { expiresIn: "1h" });

        return res.send({
            message: "success",
            data: user,
            token: token,
            role: user.role,
            id: user.id
        });
    } catch (err) {
        return res.send({
            message: JSON.stringify(err),
        });
    }
}
