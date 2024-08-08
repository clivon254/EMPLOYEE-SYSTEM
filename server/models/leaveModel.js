

import mongoose from "mongoose"

const leaveSchema = new mongoose.Schema({

    empid:{type:String, required:true},

    email:{type:String, required:true},

    username:{type:String, required:true},

    todate:{type:String, required:true},

    fromdate:{type:String, required:true},

    reason:{type:String, required:true},

    status:{type:String, default:"pending", enum:["pending","accepted","rejected","onleave","terminated"]},
})

const Leave = mongoose.model("Leave",leaveSchema)

export default Leave ;