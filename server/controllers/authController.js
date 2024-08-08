import Employee from "../models/employeeModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"


export const signup = async (req,res,next) => {

    const {username,email,password, category} = req.body ;

    if(!username || !password || !category || !email || username === "" || password === "" || email === "" || category === "")
    {
        return next(errorHandler(400, "All fields are required"))
    }

    const user = await Employee.findOne({email:email})

    if(user)
    {
       return  next(errorHandler(400, "Email already exists"))
    }

    if(password < 6)
    {
        return next(errorHandler(400, "password is too short"))
    }

    const hashedPassword =  bcryptjs.hashSync(password, 10)

    const newEmployee = new Employee({
        username,
        email,
        password:hashedPassword,
        category
    })

    try
    {
        await newEmployee.save()

        res.status(200).json({success:true, message:"Employee created successfully"})
    }
    catch(error)
    {
        next(error)
    }

}

export const sigin = async (req,res,next) => {

    const {email,password} = req.body 

    if(!email || !password || email === '' || password === "")
    {
        return next(errorHandler(400,"All feild are required"))
    }

    try
    {
        const user = await Employee.findOne({email})

        if(!user)
        {
            next(errorHandler(400, "user not found"))
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch)
        {
            next(errorHandler(400, 'Your password is incorrect'))
        }

        const token = jwt.sign(
            {id:user._id ,isAdmin:user.isAdmin},
            process.env.JWT_SECRETE,
        )

        const {password:pass, ...rest} = user._doc ;

        res.status(200)
            .cookie('access_token',token ,{httpOnly:true})
            .json({success:true , rest})
        
    }
    catch(error)
    {
        next(error)
    }

}

export const signout = async (req,res,next) => {

    try
    {
        res.clearCookie("access-token")
            .status(200)
            .json({success:true , message:'You have successfully sign out'})
    }
    catch(error)
    {
        next(error)
    }

}

export const forgotpassword = async (req,res,next) => {

    const {email} = req.body ;

    try
    {
        const user = await Employee.findOne({email})

        if(!user)
        {
            return next(errorHandler(404,'user not found'))
        }
        const secrete = process.env.JWT_SECRETE + user.password;

        const token = jwt.sign(
                     {email:user.email, id:user._id},
                     secrete,
                    )
                
        const link = `http://localhost:2500/api/auth/reset-password/${user._id}/${token}`
        
        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"clivon84@gmail.com",
                pass:"fopidwyigxqtsooy"
            } 
        });

        

        var mailOptions = {
            from:"clivon84@gmail.com",
            to:user.email,
            subject:"Forgot password",
            text:link
        }

        transporter.sendMail(mailOptions, (error,info) => {
            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }
        })

        
    }   
    catch(error)
    {
        next(error)
    }

}
 
export const resetpassword = async (req,res,next) => {

    try
    {
        const {passId,token} = req.params


        const user = await Employee.findOne({_id:passId})

        if(!user)
        {
            return next(errorHandler(404,'user not found'))
        }

        const secrete = process.env.JWT_SECRETE + user.password 

        const verify = jwt.verify(token ,secrete)

        res.render("index", {email:verify.email, status:"Not verified"})

    }
    catch(error)
    {
        next(error)
    }

}

export const setnewPassword = async (req,res,next) => {

    try
    {
        const {passId,token} = req.params

        const {password} = req.body

        const user = await Employee.findOne({_id:passId})

        if(!user)
        {
            return next(errorHandler(404,'user not found'))
        }

        const secrete = process.env.JWT_SECRETE + user.password 

        const verify = jwt.verify(token, secrete)

        const encryptedPassword = bcryptjs.hashSync(password, 10)

        await Employee.updateOne(
                                {_id:passId},
                                {$set:{password:encryptedPassword}},
                                {new:true}
                            )

        res.render("index", { email: verify.email, status: "verified" });

    }
    catch(error)
    {
        next(error)
    }

}