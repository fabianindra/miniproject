import { Router, Request, Response } from "express";
import { verifyToken } from "@/middleware/auth.middleware";

const verifyRouter = Router();

verifyRouter.post("/", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({ message: "Token is valid" });
});

export default verifyRouter;
