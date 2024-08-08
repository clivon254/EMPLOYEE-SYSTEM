import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import TaskCard from "../components/task/TaskCard"
import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react"


export default function Task()
{

    const {currentUser} = useSelector(state => state.user)

    const [tasks, setTasks] = useState([])

    const [isOpen, setIsOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchTasks = async () => {

            try
            {
                setLoading(true)

                const res = await axios.get(`/api/task/getTasks`)

                if(res.data.success)
                {
                    setTasks(res.data.tasks)

                    setLoading(false)
                }
                else
                {
                    console.log(res.data.message)

                    setLoading(true)
                }

            }
            catch(error)
            {
                console.log(error)

                setLoading(false)
            }

        }

        fetchTasks()

    },[])

    console.log(tasks)

    if(loading)
    {
        return(

            <div className="contain gap-x-3 gap-y-5 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3">

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                <div class="animate-pulse flex space-x-4">

                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>

                </div>

                </div>

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                <div class="animate-pulse flex space-x-4">

                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>

                </div>

                </div>

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                <div class="animate-pulse flex space-x-4">

                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>

                </div>

                </div>

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                <div class="animate-pulse flex space-x-4">

                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>

                </div>

                </div>

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                <div class="animate-pulse flex space-x-4">

                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>

                </div>

                </div>

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                <div class="animate-pulse flex space-x-4">

                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>

                </div>

                </div>

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                <div class="animate-pulse flex space-x-4">

                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>

                </div>

                </div>

            </div>

        )
    }

    return(

        <>

            <div className="px-4">
                
                <div className="contain">

                    <h2 className="title">Tasks</h2>

                    {
                        currentUser.isAdmin && (

                            <div className="mb-5 flex items-center justify-end">

                                <Button
                                    gradientDuoTone="purpleToPink"
                                >
                                   <Link to="/addTask">
                                        Add Task
                                   </Link>
                                </Button>
        
                            </div>

                        )
                    }
                

                    <div className="containing grid grid-col-1 gap-y-5 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">

                        {tasks.map((task) => (

                            <TaskCard key={task._id} task={task}/>

                        ) )}

                    </div>

                </div>

            </div>

        </>
            

    )
}