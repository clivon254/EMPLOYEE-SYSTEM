
import { useState,useEffect } from "react"
import { DialogTitle } from "@headlessui/react"
import ModalWrapper from "../ModalWrapper"
import { Button, Label, Select, TextInput } from "flowbite-react"
import UserList from "./UserList"
import axios from "axios"
import { toast } from "sonner"
import { useParams } from "react-router-dom"



const LISTS = ["TODO","IN PROGRESS","COMPLETED"]

const PRIORITY = ["HIGH","MEDIUM","NORMAL","LOW"]

export default function UpdateTask()
{
    const {id} = useParams()

    const [team,setTeam] = useState([])

    const [task,setTask] = useState({})

    const [job,setJob] = useState()

    console.log(job)

    // handleChange
    const handleChange = (e) => {

        setTask({...task,[e.target.name]:e.target.value})

    }

    //  handleSubmit
    const handleSubmit = async (e) => {     

        try
        {
            // dispatch(updateStart())

            const res = await fetch(`/api/task/update-task/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(task)
            })

            const data = await res.json()

            if(res.ok)
            {
                toast.success("Task updated successfully")
            }
            

        }
        catch(error)
        {
           console.log(error.message)
        }

    }

    useEffect(() => {

        const fetchTask = async () => {

            try
            {
                const res = await axios.get(`/api/task/getTask/${id}`)

                if(res.data.success)
                {
                    setJob(res.data.task)
                }
            }
            catch(error)
            {
                console.log(error.message)
            }
        }

        fetchTask()
    },[])


    return(

        <>

           
<div className="px-4">

<div className="contain">

    <h2 className="title">Add Task</h2>

    <div className="w-full flex items-center justify-center">

        <form onSubmit={handleSubmit} className="w-full space-y-5 max-w-lg">

            {/* title */}
            <div className="">

                <Label value="Title"/>

                <TextInput
                    type="text"
                    defaultValue={job.title}
                    onChange={handleChange}
                    name="title"
                    placeholder="title"
                />

            </div>
                
            <UserList 
                // team={team} 
                // setTeam={setTeam}
            />

            {/* stage */}
            <div className="flex flex-col">

                <Label htmlFor="stage" value="Stage"/>

                <Select 
                    id="stage" 
                    onChange={handleChange}
                    defaultValue={job.stage}
                    name="stage"
                >

                    <option value="todo" className="">todo</option>

                    <option value="compeleted" className="">compeleted</option>

                    <option value="onprogress" className="">low</option>

                </Select>

            </div>
            
            {/* priority */}
            <div className="flex flex-col">

                <Label htmlFor="priority" value="Priority"/>

                <Select 
                    id="priority"
                    name="priority"
                    defaultValu={job.priority}
                    onChange={handleChange}
                >

                    <option value="high" className="">high</option>

                    <option value="normal" className="">normal</option>

                    <option value="low" className="">low</option>

                </Select>

            </div>

            {/* date */}
            <div className="">

                <Label value="Date"/>

                <TextInput
                    type="date"
                    name="date"
                    placeholder="date"
                    value={job.date}
                    onChange={handleChange}
                />

            </div>
            
            <div className="flex gap-4 justify-center">

                <Button 
                    type="submit"
                    gradientMonochrome="success"
                >
                    Submit
                </Button>

            </div>

        </form>

    </div>
    
</div>

</div>

        </>
    )
}