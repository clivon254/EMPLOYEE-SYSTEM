

import express from "express"
import { verifyToken } from "../utils/verifyToken.js";
import { alleaveReq, applyLeave, leaveEmp, leaveStatus, leaveupdates, leaveWithdrawEmp, onLeave } from "../controllers/leaveController.js";

const leaveRouter = express.Router()




leaveRouter.post("/apply-leave", verifyToken, applyLeave)

leaveRouter.get("/get-leave/:leaveId", leaveEmp)

leaveRouter.delete("/leave-withdraw/:leaveId", leaveWithdrawEmp)

leaveRouter.put("/leave-updates", leaveupdates)

leaveRouter.get('/onLeave', onLeave)

leaveRouter.get('/all-leaves',verifyToken , alleaveReq)

leaveRouter.post("/status/:leaveId",verifyToken, leaveStatus)


export default leaveRouter ;