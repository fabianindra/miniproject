import express, { Application, Response, Request } from "express";
import bodyParser from "express"
import cors from "cors"
import dotenv from "dotenv"
import { verifyToken, adminGuard } from "./middleware/auth.middleware";
import cookieParser from 'cookie-parser';


import authRouter from "./routers/auth.router"
import userRouter from "./routers/auth.router"
import eventRouter from "./routers/event.router";

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/events", eventRouter)

// For routes that require authentication
app.use('/api/authenticated-route', verifyToken);

// For routes that require admin access
app.use('/api/admin-route', verifyToken, adminGuard);


const PORT = 6570

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "REST API running"
  })
})

app.listen(PORT, () => {
  console.log("application run on port : ", PORT)
})