

import express from "express"
import { verifyToken } from "../utils/verifyToken.js";
import { createEvent, deleteEvent, getEvent } from "../controllers/eventController.js";

const eventRouter = express.Router()



eventRouter.post('/create-event', verifyToken, createEvent)


eventRouter.get('/get-events', getEvent)


eventRouter.delete("/delete-event/:eventId", verifyToken, deleteEvent)




export default eventRouter ;