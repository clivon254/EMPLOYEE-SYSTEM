

import express from "express"
import { verifyToken } from "../utils/verifyToken.js"
import { createSubTask, createTask, deleteRestoreTask, duplicateTask, getTask, getTasks, postTaskActivity, trashTask, updateTask } from "../controllers/taskController.js"


const taskRouter = express.Router()




taskRouter.post("/create-task", verifyToken, createTask)

taskRouter.put("/update-task/:taskId",verifyToken, updateTask)

taskRouter.post("/post-activity/:taskId",verifyToken, postTaskActivity)

taskRouter.get("/getTasks",getTasks)

taskRouter.get("/getTask/:taskId", getTask)

taskRouter.post("/duplicateTask/:taskId", duplicateTask)

taskRouter.post('/create-subtask/:taskId', createSubTask)

taskRouter.put('/trash-task/:taskId', trashTask)

taskRouter.delete('/delete-task/:taskId', deleteRestoreTask)





export default taskRouter 