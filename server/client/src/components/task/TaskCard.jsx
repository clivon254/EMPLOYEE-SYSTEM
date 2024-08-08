
import clsx from "clsx";
import { useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, formatDate, PRIOTITYSTYELS, TASK_TYPE } from "../../utils";
import UserInfo from "../UserInfo";
import AddSubTask from "./AddSubTask";
import TaskDailog from "./TaskDialog";
import {Link} from "react-router-dom"



const ICONS ={
    high:<MdKeyboardDoubleArrowUp/>,
    normal:<MdKeyboardArrowUp/>,
    low:<MdKeyboardArrowDown/>
}



export default function TaskCard({task})
{
    const {open, setOpen} = useState(false)

    const {currentUser} = useSelector(state => state.user)

    return(

        <>

            <div className="containing h-fit ">

                <div className="w-full flex justify-between">

                    <div className="w-full flex justify-center ">

                        <div className={clsx("flex flex-1 items-center text-sm font-medium",PRIOTITYSTYELS[task.priority])}>
                            
                            <span className="text-lg">{ICONS[task.priority]}</span>

                            <span className="uppercase">{task.priority}</span>

                        </div>

                    </div>

                    { currentUser.isAdmin && <TaskDailog task={task} /> }

                </div>

                <>
                    <div className="flex items-center gap-2">

                        <div className={clsx("w-4 h-4 rounded-full",TASK_TYPE[task.stage])}/>

                        <h4 className="line-clamp-1 text-black  dark:text-gray-300">
                            
                            <Link to={`/task/${task._id}`} className="cursor-pointer">

                                {task.title}

                            </Link>

                        </h4>

                    </div>

                    <span className="text-sm text-gray-600 dark:text-gray-50">{formatDate(new Date(task.date))}</span>
                </>

                <div className="w-full border-t border-gray-200 my-2"/>

                {/* activities.length,userinfo,subtask.length */}
                <div className="flex items-center justify-between mb-2 ">

                    <div className="flex items-center justify-between gap-3">

                        <div className="flex gap-1 items-center text-sm text-gray-500  dark:text-gray-50">

                            <BiMessageDetail />

                            <span className="">{task.activities.length}</span>

                        </div>

                        <div className="flex gap-1 items-center text-sm text-gray-600  dark:text-gray-50">

                            <FaList/>

                            <span className="">{task.subTasks.length}</span>

                        </div>

                    </div>

                    <div className="flex flex-row-reverse">
                        {
                            task.team.map((m,index) => (

                                <div key={index} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index % BGS.length])}>

                                    <UserInfo user={m}/>

                                </div>

                            ))
                        }
                    </div>
                    

                </div>

                {/* subtask */}
                {
                    task.subTasks.length > 0 ? 
                    (
                        <>
                            <div className="py-4 border-t border-gray-200 space-y-2">

                                <h5 className="font-bold capitalize line-clamp-1 text-black dark:text-gray-50 text-sm">
                                    {task.subTasks[0].title}
                                </h5>

                                <div className="space-y-8 ">

                                    <p className="bg-blue-600/10  px-3 py-1 rounded-full text-blue-700 font-medium">
                                        {task.subTasks[0].tag}
                                    </p>

                                    <span className="text-xs text-gray-600">
                                        {formatDate(new Date(task.subTasks[0].date))}
                                    </span>
                                    
                                </div>

                            </div>
                        </>
                    ) 
                    : 
                    (
                        <>
                            <div className="py-4 border-t border-gray-200">

                                <span className="text-gray-500">No SubTask</span>

                            </div>
                        </>
                    )
                }
                
                {
                    currentUser.isAdmin && (

                        <div className="w-full pb-2">

                            <button
                                className="w-full flex gap items-center text-sm text-gray-500"
                                onClick={() => setOpen(true)}
                            >

                                <IoMdAdd text="text-lg"/>

                                <span className="">ADD SUBTASK</span>

                            </button>

                            </div>

                    )
                }
                

            </div>

        </>

    )
}