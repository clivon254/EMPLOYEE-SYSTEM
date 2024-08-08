
import Employee from "../models/employeeModel.js";
import Leave from "../models/leaveModel.js";
import { errorHandler } from "../utils/error.js"



export const applyLeave = async (req,res,next) => {

    if(!req.user.id)
    {
        return next(errorHandler(403,'you are not allowed to apply for leave'))
    }

    try
    {
        const {username, email, empid, reason, fromDate, toDate} = req.body ;

        const leave = await Leave.create({
            username,
            email,
            empid,
            reason,
            fromdate:fromDate,
            todate:toDate
        })

        res.status(200).json({success:true, leave})
    }
    catch(error)
    {
        next(error)
    }

}


export const leaveEmp = async (req,res,next) => {

    try
    {
        const id = req.params.leaveId

         const leave = await Leave.find({empid:id})

         if(!leave)
         {
            return next(errorHandler(404, 'Leave not found'))
         }

        res.status(200).json({success:true , leave})
    }
    catch(error)
    {
        next(error)
    }

}


export const leaveWithdrawEmp= async (req,res,next) => {

    const id = req.params.leaveId 

    try
    {
        const leave = await Leave.deleteOne({_id:id})

        if(leave.deletedCount === 1)
        {
            res.json({success:true, Message:"Leave request withdrawn successfully"})
        }
        else
        {
            res.json({success:false, Message:"Leave request not found"})
        }

    }
    catch(error)
    {
        next(error)
    }

}


export const leaveupdates = async (req,res,next) => {

    try
    {
        const leaves = await Leave.find({})

        leaves.forEach(async (leave) => {

            const today = new Date();

            const fromdate = new Date(leave.fromdate)

            const todate = new Date(leave.todate)

            if(leave.status === 'accepted' && fromdate <= today && today <= todate)
            {
                 await Leave.findByIdAndUpdate(leave._id,{$set:{status:"onleave"}},{new:true})

                 await Employee.findByIdAndUpdate(leave.empid,{$set:{status:false}},{new:true})

                 leave.save()
            }
            else if(leave.status === 'onleave' && todate < today)
            {
                await Leave.findByIdAndUpdate(leave._id,{$set:{status:"terminated"}},{new:true})

                 await Employee.findByIdAndUpdate(leave.empid,{$set:{status:true}},{new:true})

                 leave.save()
            }

        })

        res.status(200).json({success:true ,leaves ,message:'Leaves updated successfully'})

    }
    catch(error)
    {
        next(error)
    }

}


export const alleaveReq = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(403,"You are not allowed to see all leave requests")
    }

    try
    {
        const leave = await Leave.find({})

        res.status(200).json({success:true, leave})

    }
    catch(error)
    {
        next(error)
    }

}


export const leaveStatus = async (req,res,next) => {

    try
    {
        const id = req.params.leaveId ;

        const {status} = req.body 

        const leave = await Leave.updateOne(
                            {_id:id},
                            {status:status}
                        )

        res.status(200).json({success:true, leave}) 
    }
    catch(error)
    {
        next(error)
    }

}


export const onLeave = async (req, res, next) => {

    try 
    {

      const today = new Date();

      const leave = await Leave.find({
        status: 'accepted',
        fromdate: { $lte: today },
        todate: { $gte: today },
      }).exec();
  
      res.status(200).json({ success: true, leave });

    } 
    catch (error) 
    {
      next(error);
    }

  };