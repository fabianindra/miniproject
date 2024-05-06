import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


type User = {
    email: string;
    username: string;
    name: string;
    role: string;
}

export const verifyToken = async (req: Request | any, res: Response, next: NextFunction) => {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            return res.status(401).send("Unauthorized1")
        }

        try {
            const verifiedUser = verify(token, String(process.env.JWT_SECRET));
            req.user = verifiedUser;
            next();

    } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
}

export const adminGuard = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(401).send("Unauthorized2")
        }
        next()
    }
    catch (err) {
        return res.send({
            message: JSON.stringify(err),
        })
    }
}