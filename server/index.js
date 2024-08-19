

import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import authRouter from "./routes/authRoute.js"
import employeeRouter from "./routes/employeeRoute.js"
import eventRouter from "./routes/eventRoute.js"
import leaveRouter from "./routes/leaveRoute.js"
import taskRouter from "./routes/taskRoute.js"
import path from "path"
import nodemailer from "nodemailer"
import Employee from "./models/employeeModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { errorHandler } from "./utils/error.js"

const app = express()

const PORT = 2500



// middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");



// DB CONNECTION
mongoose.connect(process.env.MONGO)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))




// ROUTES
app.use("/api/auth", authRouter)

app.use("/api/employee", employeeRouter)

app.use("/api/event", eventRouter)

app.use("/api/leave", leaveRouter)

app.use("/api/task", taskRouter)





// API
app.get("/", (req,res) => {

    res.send("HELLO EMPLOYEES")

})



// LISTENING
app.listen(PORT,() => {

    console.log(`server listening on port ${PORT}`)

})



app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500 ;

    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})