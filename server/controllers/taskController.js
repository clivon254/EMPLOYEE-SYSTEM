import Notice from "../models/notificationModel.js";
import Task from "../models/taskModel.js";
import { errorHandler } from "../utils/error.js";


export const createTask = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to create Task"))
    }

    try
    {
        const {id} = req.user ;

        const {title,team,stage,date,priority} = req.body ;

        let text = "New task has been assigned to you"

        if(team?.length > 1)
        {
            text = text + `and ${team?.length - 1} others`
        }

        text = text + `The task is set a ${priority},so check and act accordingly.The task date is ${new Date(date).toDateString()}.Thank you!!!`

        const activity = {
            type:"assigned",
            activity:text,
            by:id
        }

        const task = await Task.create({
            title,
            team,
            stage,
            priority,
            activities:activity
        })

        await Notice.create({
            team,
            text,
            task:task._id
        })
 
        res.status(200).json({success:true, task, message:"Task created successfully"})
    }
    catch(error)
    {
        next(error)
    }
}
 

export const duplicateTask = async (req,res,next) => {

    try
    {
        const {taskId} = req.params

        const task = await Task.findById(taskId)

        const newTask = await Task.create({
            ...task,
            title:task.title + "-Duplicate"
        })

        newTask.team = task.team 
        newTask.subTasks = task.subTasks 
        newTask.priority = task.priority 
        newTask.stage = task.stage 

        await newTask.save()

        let text = "New task has been assigned to you"

        if(task.team.length > 1)
        {
            text = text + ` and ${task.team.length - 1} others`
        }

        text = text + `The task is set a ${task.priority},so check and act accordingly.The task date is ${new Date(task.date).toDateString()}.Thank you!!!`

        await Notice.create({
            team:task.team,
            text,
            task:newTask._id
        })

        res.status(200).json({status:true, message:"Task duplicated successfully"})
        
    }
    catch(error)
    {
        next(error)
    }

}


export const postTaskActivity = async (req,res,next) => {

    try{
        const {taskId} = req.params ;

        const {id} = req.user ;

        const {type, activity} = req.body ;

        const task = await Task.findById(taskId)

        const data = {
            type,
            activity,
            by:id
        }

        task.activities.push(data)

        await task.save()

        res.status(200).json({success:true, message:"Activity has been posted successfully "})

   }
   catch(error)
   {
     next(error)
   }

}


export const getTask = async (req,res,next) => {

    try
    {
        const {taskId} = req.params ;

        const task = await Task.findById(taskId)
                     .populate({
                        path:"team",
                        select:"username title category email"
                     })
                     .populate({
                        path:"activities.by",
                        select:"username"
                     })
        
        res.status(200).json({success:true, task})
    }
    catch(error)
    {
        next(error)
    }

}


export const getTasks = async (req,res,next) => { 

    try
    {
        const {stage, isTrashed} = req.query ;

        let query = {isTrashed :isTrashed ? true : false}

        if(stage)
        {
            query.stage = stage 
        }

        let queryResult = await Task.find(query)
                            .populate({
                                path:"team",
                                select:"username category email"
                            })
                            .sort({_id:-1})

        const tasks =  queryResult ;

        res.status(200).json({success:true, tasks})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateTask = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to create Task"))
    }

    try
    {
        const {taskId} = req.params ;

        const updatedTask = await Task.findByIdAndUpdate(taskId,
                                     {
                                        $set:{
                                            title:req.body.title,
                                            date:req.body.date,
                                            stage:req.body.stage,
                                            priority:req.body.priority,
                                            team:req.body.team,
                                        }
                                     } ,
                                     {new:true}
                                )
        
        res.status(200).json({success:true, updatedTask, message:"Task updated successfully"})
        
    }
    catch(error)
    {
        next(error)
    }

}


export const createSubTask = async (req,res,next) => {

    try
    {
        const {title,tag,date} = req.body

        const {taskId} = req.params;

        const newSubTask = {
            title,
            date,
            tag
        }

        const task = await Task.findById(taskId)

        task.subTasks.push(newSubTask)

        await task.save()

        res.status(200).json({ status:true, message:"SubTask added successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const trashTask = async (req,res,next) => {

    try
    {
        const {taskId} = req.params ;

        const task = await Task.findById(taskId)

        task.isTrashed = true 

        await task.save()

        res.status(200).json({success:true, message:`Task trashed successfully`})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteRestoreTask = async (req,res,next) => {

    try
    {
        const {taskId} = req.params ;

        const {actionType} = req.query 

        if(actionType === "delete")
        {
            await Task.findByIdAndDelete(taskId)
        }
        else if(actionType === "deleteAll")
        {
            await Task.deleteMany({isTrashed:true})
        }
        else if(actionType === "restore")
        {
            const resp = await Task.findById(id)

            resp.isTrashed = false ;

            resp.save()
        }
        else if(actionType === "restoreAll")
        {
            await Task.updateMany(
                {isTrashed:true},
                {$set:{isTrashed:false}}
            )
        }

        res.status(200).json({success:true, messega:"Operation performed successfully"})

    }
    catch(error)
    {
        next(error)
    }

}