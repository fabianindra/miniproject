import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

type User = {
    email: string;
    username: string;
    password: string;
    name: string;
    role: string;
    code: string;
    refererCode: string;
}

export const verifyToken = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(401).send("Unauthorized")
        }

        const verifiedUser = verify(token, String(process.env.JWT_TOKEN))

        if(!verifiedUser) {
            return res.status(401).send("Unauthorized")
        }

        req.user = verifiedUser as any
        next()
    }
    catch (err) {
        return res.send({
            message: JSON.stringify(err),
        })
    }
}

export const adminGuard = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(401).send("Unauthorized")
        }
        next()
    }
    catch (err) {
        return res.send({
            message: JSON.stringify(err),
        })
    }
}