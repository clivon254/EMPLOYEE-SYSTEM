
import Event from "../models/eventModel.js"
import { errorHandler } from "../utils/error.js"



export const createEvent = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to create event"))
    }

    try
    {
        const {title, date, additional} = req.body

        const event = await Event.create({
            title,
            date,
            additional
        })

        res.status(200).json({success:true , event})
    }
    catch(error)
    {
        next(error)
    }

}


export const getEvent = async (req,res,next) => {

    try
    {
        const events = await Event.find({})

        res.status(200).json({success:true, events})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteEvent = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to delete this post"))
    }

    try
    {
        const id = req.params.eventId ;

        const date = await Event.deleteOne({_id:id})

        if(date.deletedCount === 0)
        {
            res.json({status:false , message:"Event not found"})
        }

        res.status(200).json({success:true ,message:"Event delete successfully"})
    }
    catch(error)
    {
        next(error)
    }

}