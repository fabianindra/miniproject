import { Router } from "express";
import * as commentController from "../controllers/comment.controller"

const commentRouter = Router()

commentRouter.get("/", commentController.getAllComments)
commentRouter.post("/submit", commentController.createComment)

export default commentRouter