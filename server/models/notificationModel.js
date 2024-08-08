
import mongoose,{Schema} from "mongoose"


const noticeSchema = new mongoose.Schema({

    team:[{type:Schema.Types.ObjectId , ref:"Employee"}],

    text:{type:String},

    task:{type:Schema.Types.ObjectId , ref:"Task"},

    isRead:{type:Schema.Types.ObjectId, ref:"Employee"},

    notiType:{type:String , default:"alert", enum:["alert","message"]}
})

const Notice = mongoose.model("Notice", noticeSchema)

export default Notice