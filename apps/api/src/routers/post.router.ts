import { Router } from "express"
import * as postController from "./../controllers/post.controller"
import { adminGuard, verifyToken } from "../middleware/auth.middleware"

const postRouter = Router()

postRouter.get("/", postController.getAllPosts)
postRouter.get("/:id", verifyToken, postController.getDetailPost)
postRouter.post("/", verifyToken, adminGuard, postController.createPost)

export default postRouter