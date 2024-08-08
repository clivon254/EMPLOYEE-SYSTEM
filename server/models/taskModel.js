

import mongoose , {Schema} from "mongoose"

const taskSchema = new mongoose.Schema({

    title:{type:String, required:true},

    date:{type:Date, default:new Date()},

    priority:{
         type:String,
         default:"normal",
         enum:['high','medium',"normal","low"]
        },

    stage:{
        type:String, 
        default:"normal",
        enum:["todo","inprogress","completed","normal"]
    },

    activities:[
        {
            type:{
                type:String,
                default:"assigned",
                enum:["assigned","started","in progress","bug","completed"]
            }, 
            activity:String,
            date:{type:Date, default:new Date()},
            by:{type:Schema.Types.ObjectId, ref:"Employee"}
        }
    ],

    subTasks:[{title:String, date:Date , tag:String}],

    team:[{type:Schema.Types.ObjectId ,ref:"Employee"}],

    isTrashed:{type:Boolean, default:false}
})


const Task = mongoose.model("Task", taskSchema)

export default Task ;