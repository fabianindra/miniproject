import { Router } from "express";
import * as userController from "./../controllers/user.controller"

const userRouter = Router()

userRouter.get("/", userController.getAllUsers)
userRouter.get("/:id", userController.getRefCode)
userRouter.get("/username", userController.getUserName)

export default userRouter