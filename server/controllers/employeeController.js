import Employee from "../models/employeeModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"



export const updateUser = async (req,res,next) => {

    if(req.user.id !== req.params.userId)
    {
        return next(errorHandler(403,"You are not allowed to update the user"))
    }

    if(req.body.password)
    {
        if(req.body.password < 6)
        {
            return next(errorHandler(400, 'Password must be atleast 6 characters'))
        }

        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    if(req.body.username)
    {
        if(req.body.username < 7 || req.body.username > 20)
        {
            return next(errorHandler(400, `username must be between 7 and 20 Characters`))
        }

        if(req.body.username !== req.body.username.toLowerCase())
        {
            return next(errorHandler(400, 'username must be lowercase'))
        }

        if(req.body.username.includes(' '))
        {
            return next(errorHandler(400, 'username cannot contain spaces'))
        }

        if(!req.body.username.match(/^[a-zA-Z0-9]+$/))
        {
            return next(errorHandler(400, `username can only contain letters and number`))
        }
    }

    try
    {
        const updateUser = await Employee.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                category:req.body.category,
                isAdmin:req.body.isAdmin,
                shift:req.body.shift,
            }
        },{new:true})

        const {password, ...rest} = updateUser._doc ;

        res.status(200).json({success:true, rest})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteUser = async (req,res,next) => {

    if(!req.user.isAdmin || req.user.id !== req.params.userId)
    {
        return next(errorHandler(400, "You are not allowed to delete this user"))
    }

    try
    {
        await Employee.findByIdAndDelete(req.params.userId)

        res.status(200).json({success:true , message:"Employee has been deleted"})
    }
    catch(error)
    {
        next(error)
    }

}


export const getEmployees = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to see all employees"))
    }

    try
    {
        const startIndex = parseInt(req.query.startIndex)

        const limit = parseInt(req.query.limit) || 9 ;

        const sortDirection = req.query.sort === "asc" ? 1 : 1 ;

        const users = await Employee.find()
                     .sort({createdAt:sortDirection})
                     .skip(startIndex)
                     .limit(limit)

        const userswithoutPassword = users.map((user) => {

            const {password, ...rest} = user._doc

            return rest ;
        })

        const totalUsers = await Employee.countDocuments()

        const now = new Date() 

       res.status(200).json({success:true ,userswithoutPassword, totalUsers})
        

    }
    catch(error)
    {
        next(error)
    }

}


export const getEmployee = async (req,res,next) => {

    try
    {
        const user = await Employee.findById(req.params.userId)

        if(!user)
        {
            return next(errorHandler(404,"User not found"))
        }

        const {password, ...rest} = user._doc 

        res.status(200).json({success:true, rest})
    }
    catch(error)
    {
        next(error)
    }

}
