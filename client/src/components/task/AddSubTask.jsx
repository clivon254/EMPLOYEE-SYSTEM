import { DialogTitle } from "@headlessui/react";
import ModalWrapper from "../ModalWrapper";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import {toast} from "sonner"




export default function AddSubTask({open,setOpen,id})
{

    const [task, setTask] = useState({})
    

    // handleChange
    const handleChange = (e) => {

        setTask({...task, [e.target.name]:e.target.value})

    }

    //  handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            const response = await axios.post(`/api/task/create-subtask/${id}`,task)

            if(response.data.status)
            {
                toast.success("subtask added successfully")

                setTask({})

                setOpen(false)
            }
            else
            {
                console.log('error at the api')
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    return(

       <>

        <ModalWrapper open={open} setOpen={setOpen}>

                <form onSubmit={handleSubmit} className="">

                    <DialogTitle
                        as="h2"
                        className="text-base font-bold leading-6 text-gray-900 mb-4"
                    >
                        ADD SUB-TASK
                    </DialogTitle>


                    <div className="mt-2 flex flex-col gap-6">

                        
                        <div className="">

                            <Label value="Sub-Task title"/>

                            <TextInput
                                type="text"
                                name="title"
                                value={task.title}
                                onChange={handleChange}
                            />
                            
                        </div>

                    
                        <div className="">

                            <Label value="Task Date"/>

                            <TextInput
                                type="Date"
                                name="date"
                                value={task.date}
                                onChange={handleChange}
                            />
                            
                        </div>


                        <div className="">

                            <Label value="Tag"/>

                            <TextInput
                                type="text"
                                name="tag"
                                value={task.tag}
                                onChange={handleChange}
                            />
                            
                        </div>

                    </div>

                    <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">

                        <Button
                            type="submit"
                            gradientMonochrome="cyan"
                        >
                            Add Task
                        </Button>

                        
                        <Button
                            type="button"
                            gradientMonochrome="failure"
                            onClick={() => setOpen(false)}
                        >
                        cancel
                        </Button>

                    </div>

                </form>

        </ModalWrapper>
      
      </>

    )
}