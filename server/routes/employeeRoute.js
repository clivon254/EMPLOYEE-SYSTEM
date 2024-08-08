

import express from "express"
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUser, getEmployee, getEmployees, updateUser } from "../controllers/employeeController.js";

const employeeRouter = express.Router()


employeeRouter.put('/update/:userId',verifyToken ,updateUser)


employeeRouter.delete("/delete/:userId",verifyToken, deleteUser)


employeeRouter.get("/get-employees",verifyToken, getEmployees)


employeeRouter.get("/get-employee/:userId", getEmployee)



export default employeeRouter ;