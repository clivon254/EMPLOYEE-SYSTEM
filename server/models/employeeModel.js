
import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({

    username:{type:String, required:true},

    email:{type:String , required:true},

    password:{type:String, required:true},

    category:{type:String, required:true},

    profilePicture:{type:String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"},

    isAdmin:{type:Boolean, default:false},

    status:{type:Boolean, default:true},

    shift:{type:String, default:"normal"}
},
{timestamps:true}
)

const Employee = mongoose.model("Employee", employeeSchema)

export default Employee ;