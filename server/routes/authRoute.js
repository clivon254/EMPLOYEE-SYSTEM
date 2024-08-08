

import express from "express"
import { forgotpassword, resetpassword, setnewPassword, sigin, signout, signup } from "../controllers/authController.js";


const authRouter = express.Router()


authRouter.post("/sign-in", sigin)

authRouter.post("/sign-up", signup)

authRouter.post("/sign-out", signout)

authRouter.post("/forgot-password", forgotpassword)

authRouter.get('/reset-password/:passId/:token', resetpassword)

authRouter.post('/reset-password/:passId/:token', setnewPassword)



export default authRouter ;